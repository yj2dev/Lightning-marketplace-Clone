import { useEffect, useState } from "react";
import socketIO from "socket.io-client";

// 실제 배포시 도메인 지정
const socket = socketIO.connect("https://localhost:8000");
const TalkPage = () => {
  const [username, setUsername] = useState("");
  const [talk, setTalk] = useState("");
  const [message, setMessage] = useState("");

  function getUser() {
    const name = prompt("What is your name?");
    setUsername(name);
  }

  function onClickName() {
    console.log("username >> ", username);
    socket.emit("new_user", username, (data) => {
      console.log("new_user data >> ", data);
    });

    socket.on("server_res", (data) => {
      console.log("server_res data >> ", data);
    });
  }

  useEffect(() => {
    onClickName();
  }, [username]);

  useEffect(() => {
    getUser();
  }, []);

  function onSubmitSendMessage(e) {
    e.preventDefault();

    socket.emit("submit_talk", message);

    socket.on("new_talk", (data) => {
      console.log("new_talk data >> ", data);
      setTalk(data.talk);
    });
  }
  return (
    <>
      TalkPage
      <button onClick={onClickName}>username</button>
      username: {username} <br />
      <form onSubmit={onSubmitSendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button type="submit">전송</button>
      </form>
      {talk}
    </>
  );
};

export default TalkPage;
