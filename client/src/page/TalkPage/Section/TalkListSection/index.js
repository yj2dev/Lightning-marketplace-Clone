import { Container } from "./styled";
import { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import axios from "axios";

export const TalkListSection = ({ history, user }) => {
  const location = useLocation();
  const [RoomList, setRoomList] = useState([]);

  useEffect(() => {
    // 채팅방 리스트 가져오기
    getRoomList();
  }, []);

  function getRoomList() {
    axios
      .get(`/talk/${user.isSignin.data._id}/room-list`)
      .then((res) => {
        console.log("RoomList res >> ", res);
        setRoomList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <div className="title">벼락톡</div>
    </Container>
  );
};

export default withRouter(TalkListSection);
