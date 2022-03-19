import { useEffect, useState } from "react";
// import io from "socket.io-client";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

// 실제 배포시 도메인 지정
// const socket = io.connect(`https://localhost:8000/${namspace}`);
// const socket = io.connect(`https://localhost:8000/ws-330121`);
const socket = io.connect(`https://localhost:8000/nsp-42143a`);
const socket2 = io.connect(`https://localhost:8000/nsp-af31oi2kldf`);

const TalkPage = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const history = useHistory();
  const [username, setUsername] = useState("");

  const [talk, setTalk] = useState([]);
  const [message, setMessage] = useState("");

  // const [socket, disconnect] = useSocket();

  useEffect(() => {
    socket.on("rootClient", (data) => {
      console.log("rootClient data >> ", data);
    });
  });

  function getUserId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  function test() {
    console.log("test...");
    socket.emit("rootServer", { test: "test" }, (data) => {
      console.log("test data >> ", data);
    });
  }

  function test2() {
    console.log("test...");
    socket2.to("firstRoom").emit("rootServer", { test: "test" }, (data) => {
      console.log("test data >> ", data);
    });
  }

  function onSubmitSendMessage(e) {
    e.preventDefault();

    if (message === "") return;
  }
  return (
    <>
      <button onClick={test}>test</button>
      <button onClick={test2}>test2</button>
      username: {user.isSignin && user.isSignin.data.storeName} <br />
      <form onSubmit={onSubmitSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">전송</button>
      </form>
      {talk &&
        talk.map((v) => (
          <div>
            {v.talk} <br />
          </div>
        ))}
    </>
  );
};

export default TalkPage;
