import { Container, TalkListWrapper } from "./styled";
import { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import axios from "axios";
import { timeKrFormat, timeKrFormatAndMMDD } from "../../../../utils/Time";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export const TalkListSection = ({ history, user }) => {
  const location = useLocation();
  const [roomList, setRoomList] = useState([]);

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
          _data["buyerId"] = res.data[i].buyerId;
          _data["buyerName"] = res.data[i]._buyerId[0].storeName;
          _data["buyerProfileURL"] = res.data[i]._buyerId[0].profileURL;
          _data["sellerId"] = res.data[i].sellerId;
          _data["sellerName"] = res.data[i]._sellerId[0].storeName;
          _data["sellerProfileURL"] = res.data[i]._sellerId[0].profileURL;
          _data["createdAt"] = res.data[i].createdAt;
          _data["lastMessage"] = res.data[i].lastContent;

          console.log("_data >> ", _data);
          _roomList.push(_data);
        }
        console.log("_roomList >> ", _roomList);
        setRoomList(_roomList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const onClickRoom = () => {
    // history.push("/");
    // history.push(`talk/${productId}?sellerId=${sellerId}`);
  };

  return (
    <Container>
      <div className="title">벼락톡</div>
      <TalkListWrapper>
        <ul>
          {roomList ? (
            roomList.map((room) => {
              {
                room.buyerId !== user.isSignin.data._id ? (
                  <li>
                    <img src={room.buyerProfileURL} />
                    <div className="name">{room.buyerName}</div> <br />
                    <div className="last_message">{room.lastMessage}</div>
                    <div className="date">
                      {timeKrFormatAndMMDD(room.createdAt)}
                    </div>
                  </li>
                ) : (
                  <li>
                    <img src={room.sellerProfileURL} />
                    <div className="name">{room.sellerName}</div> <br />
                    <div className="last_message">{room.lastMessage}</div>
                    <div className="date">
                      {timeKrFormatAndMMDD(room.createdAt)}
                    </div>
                  </li>
                );
              }
            })
          ) : (
            <ClimbingBoxLoader loading={true} size={15} />
          )}
        </ul>
      </TalkListWrapper>
    </Container>
  );
};

export default withRouter(TalkListSection);
