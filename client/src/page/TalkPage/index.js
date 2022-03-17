import { useEffect, useState } from "react";
// import io from "socket.io-client";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useSocket from "../../hooks/useSocket";

// 실제 배포시 도메인 지정
// const socket = io.connect(`https://localhost:8000/${namspace}`);
// const socket = io.connect(`https://localhost:8000/ws-330121`);
const socket = io.connect(`https://localhost:8000/d12`);

const TalkPage = () => {
  const user = useSelector((state) => state.user);
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

  function test() {
    console.log("test...");
    socket.emit("rootServer", { test: "test" }, (data) => {
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
