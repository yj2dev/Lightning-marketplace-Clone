import { useEffect, useState } from "react";
// import io from "socket.io-client";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { Container } from "./styled";
import useSocket from "../../hooks/useSocket";
import TalkListSection from "./Section/TalkListSection";
import TalkRoomSection from "./Section/TalkRoomSection";

// 실제 배포시 도메인 지정
const socket = io.connect(`${process.env.REACT_APP_BASE_URL}/nsp-42143a`);
const socket2 = io.connect(`${process.env.REACT_APP_BASE_URL}/nsp-af31oi2kldf`);

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

  function test() {
    console.log("test...");
    socket.emit("rootServer", { test: "test" }, (data) => {
      console.log("test data >> ", data);
    });
  }

  function test2() {
    console.log("test...");
    socket2.emit("rootServer", { test: "test" }, (data) => {
      console.log("test data >> ", data);
    });
  }

  return (
    <Container>
      <TalkListSection user={user} />
      <TalkRoomSection user={user} />
    </Container>
  );
};

export default TalkPage;
