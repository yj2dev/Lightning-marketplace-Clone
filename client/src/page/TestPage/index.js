import { Container } from "./styled";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MessageSection from "./MessageSection";
const socket = io.connect(`${process.env.REACT_APP_BASE_URL}/nsp-root`);

export const TestPage = () => {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);

  useEffect(() => {
    socket.on("socketReturn", (data) => {
      console.log("socketReturn data >> ", data);
      const _msgList = msgList;
      _msgList.push(data);
      setMsgList(_msgList);
    });
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    console.log("send msg >> ", msg);

    const _msgList = msgList;
    _msgList.push({ msg });
    setMsgList(_msgList);

    console.log("submit _msgList >> ", _msgList);

    socket.emit("socketTest", { msg }, (data) => {
      console.log("socketTest data >> ", data);
    });

    setMsg("");
  }

  return (
    <Container>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">전송</button>
      </form>
      <MessageSection msgList={msgList} />
    </Container>
  );
};

export default TestPage;
