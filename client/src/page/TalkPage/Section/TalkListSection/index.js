import { Container, LoadingWrapper, TalkListWrapper } from "./styled";
import { useEffect, useState } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import axios from "axios";
import { timeKrFormat, timeKrFormatAndMMDD } from "../../../../utils/Time";
import BeatLoader from "react-spinners/BeatLoader";

export const TalkListSection = ({ history, user }) => {
  const location = useLocation();
  const [roomList, setRoomList] = useState(null);

  useEffect(() => {
    // 채팅방 리스트 가져오기
    getRoomList();
  }, []);

  function getRoomList() {
    axios
      .get(`/talk/${user.isSignin.data._id}/room-list`)
      .then((res) => {
        console.log("RoomList res >> ", res);
        const _roomList = [];
        for (let i = 0; i < Object.keys(res.data).length; i++) {
          const _data = {};

          _data["roomId"] = res.data[i]._id;
          _data["productId"] = res.data[i].toProductId;

          if (res.data[i].buyerId !== user.isSignin.data._id) {
            _data["receiverId"] = res.data[i].buyerId;
            _data["receiverName"] = res.data[i]._buyerId[0].storeName;
            _data["receiverProfileURL"] = res.data[i]._buyerId[0].profileURL;
          } else {
            _data["receiverId"] = res.data[i].sellerId;
            _data["receiverName"] = res.data[i]._sellerId[0].storeName;
            _data["receiverProfileURL"] = res.data[i]._sellerId[0].profileURL;
          }

          _data["createdAt"] = res.data[i].createdAt;
          _data["lastMessage"] = res.data[i].lastContent;

          // console.log("_data >> ", _data);
          _roomList.push(_data);
        }
        // console.log("_roomList >> ", _roomList);
        setRoomList(_roomList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Container>
      <div className="title">벼락톡</div>
      <TalkListWrapper>
        <ul>
          {roomList ? (
            roomList.map((room) => (
              <li>
                <Link
                  to={`/talk/${room.productId}?sellerId=${room.receiverId}&roomId=${room.roomId}`}
                ></Link>
                <img src={room.receiverProfileURL} />
                <div className="name">{room.receiverName}</div> <br />
                <div className="last_message">{room.lastMessage}</div>
                <div className="date">
                  {timeKrFormatAndMMDD(room.createdAt)}
                </div>
              </li>
            ))
          ) : (
            <LoadingWrapper>
              <BeatLoader loading={true} size={15} color="#e0464d" />
            </LoadingWrapper>
          )}
        </ul>
      </TalkListWrapper>
      {/*{roomList && roomList.forEach((room) => <>{room.receiverId}</>)}*/}
    </Container>
  );
};

export default withRouter(TalkListSection);
