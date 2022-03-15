import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

// 실제 배포시 도메인 지정
const socket = io.connect("https://localhost:8000/good");

const TalkPage = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [username, setUsername] = useState("");

  const [talk, setTalk] = useState([]);
  const [message, setMessage] = useState("");

  const uId = "tk4w21";

  console.log("rendering count...");

  useEffect(() => {
    if (!user.isSignin) history.push("/");
  }, []);

  socket.on(uId, (data) => {
    console.log(`uid[${uId}] data >> `, data);
  });

  function onSubmitSendMessage(e) {
    e.preventDefault();

    socket.emit(
      "send_talk",
      { fromUserId: user.isSignin.data._id, message },
      (data) => {
        console.log("send_talk data >> ", data);
        setMessage("");
      }
    );

    socket.on("new_talk", (data) => {
      console.log("new_talk data >> ", data);
      const temp = talk;
      console.log("temp >> ", temp);
      // temp.push(data);
      // setTalk(temp);

      console.log("talk map ");
    });
  }
  function test() {
    console.log(talk);
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
