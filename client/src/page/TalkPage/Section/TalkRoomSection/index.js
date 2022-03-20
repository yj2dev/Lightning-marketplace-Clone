import { Container, NullContainer, TalkForm, TalkRoomWrapper } from "./styled";
import { intOfKr } from "../../../../utils/Currency";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { RiMessage3Line } from "react-icons/ri";

const socket = io.connect(`https://localhost:8000/nsp-root`);

export const TalkRoomSection = ({ history, user }) => {
  const location = useLocation();
  const talkScrollRef = useRef();

  const [talkToProduct, setTalkToProduct] = useState(null);
  const [talkToUser, setTalkToUser] = useState(null);

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const toProductId = getProductParam();
  const receiverId = getReceiverIdQuery();

  useEffect(() => {
    const toProductId = getProductParam();
    const receiverId = getReceiverIdQuery();
    const roomId = getRoomIdQuery();

    // 이전 채팅내역 가져오기
    getMessageList(roomId);

    socket.on(`${roomId}-receiveMessage`, (data) => {
      console.log("spread data >> ", data);
      console.log(typeof data);
      const _messageList = messageList;
      _messageList.push(data);
      console.log("_messageList >> ", _messageList);

      setMessageList(_messageList);
    });
  }, []);

  useEffect(() => {
    // 채팅 상대와 상품 가져오기
    getProductInfo();
    getReceiverInfo();

    // 채팅내용 최하단으로 내리기
  }, [toProductId, receiverId]);

  function onSubmitSendMessage(e) {
    e.preventDefault();

    if (message === "") return;
    const roomId = getRoomIdQuery();

    const payload = {
      senderId: user.isSignin.data._id,
      toProductId,
      receiverId,
      message,
      roomId,
    };

    console.log("p >> ", payload);
    socket.emit("sendMessage", payload, (data) => {
      console.log("sendMessage data >> ", data);
    });

    console.log("메시지 전송");
    console.log("message >> ", message);
    setMessage("");
    scrollToBottom();
  }

  function getMessageList(roomId) {
    axios
      .get(`/talk/${roomId}/message-list`)
      .then((res) => {
        console.log("getMessageList res >> ", res);

        const _messageList = [];
        for (let i = 0; i < Object.keys(res.data).length; i++) {
          const _data = {};

          _data["toUserId"] = res.data[i]._toUserId[0]._id;
          _data["toUserName"] = res.data[i]._toUserId[0].storeName;
          _data["toUserProfileURL"] = res.data[i]._toUserId[0].profileURL;
          _data["fromUserId"] = res.data[i]._fromUserId[0]._id;
          _data["fromUserName"] = res.data[i]._fromUserId[0].storeName;
          _data["fromUserProfileURL"] = res.data[i]._fromUserId[0].profileURL;

          _data["notRead"] = res.data.notRead;
          _data["content"] = res.data.content;
          _data["createdAt"] = res.data[i].createdAt;

          // console.log("_data >> ", _data);
          _messageList.push(_data);
        }
        console.log("_messageList >> ", _messageList);
        setMessageList(_messageList);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getReceiverInfo() {
    axios
      .get(`/user/detail/${receiverId}`)
      .then((res) => {
        setTalkToUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getProductInfo() {
    axios
      .get(`/product/detail/${toProductId}`)
      .then((res) => {
        setTalkToProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function getRoomIdQuery() {
    const roomId = new URL(window.location.href).searchParams.get("roomId");
    return roomId;
  }
  function getReceiverIdQuery() {
    const sellerId = new URL(window.location.href).searchParams.get("sellerId");
    return sellerId;
  }

  function getProductParam() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  const scrollToBottom = () => {
    const { scrollHeight, clientHeight } = talkScrollRef.current;
    const bottom = scrollHeight - clientHeight + 100;
    talkScrollRef.current.scrollTo(0, bottom);
  };

  const onClickTitle = () => {
    history.push(`/shop/${receiverId}`);
  };
  const onClickSubTitle = () => {
    history.push(`/product/${toProductId}`);
  };

  if (!talkToUser) {
    return (
      <NullContainer>
        <span className="icon">
          <RiMessage3Line
            size={32}
            style={{
              color: "#ffffff",
              position: "absolute",
              top: "9px",
              left: "9px",
            }}
          />
        </span>
        <span className="content">
          <span>벼락톡</span> 간편하게 거래해요.!
        </span>
      </NullContainer>
    );
  } else {
    return (
      <Container>
        {talkToUser && (
          <div onClick={onClickTitle} className="title">
            {talkToUser.storeName}
          </div>
        )}
        {talkToProduct && (
          <div onClick={onClickSubTitle} className="sub_title">
            <img src={`${talkToProduct.thumbnailImgURL}`} />
            <div className="price">
              {intOfKr(`${talkToProduct.price}`)}
              <span>원</span>
            </div>
            <br />
            <div className="product_title">{talkToProduct.title}</div>
          </div>
        )}
        <TalkRoomWrapper ref={talkScrollRef}>
          <div>
            <div className="sender">
              직거래 가능할까요?
              <div className="time">04:12</div>
            </div>
          </div>
          <div>
            <div className="receiver">
              네 가능하죠
              <div className="time">04:12</div>
            </div>
          </div>
          <div>
            <div className="receiver">
              어디서 거래하실건가요?
              <div className="time">04:12</div>
            </div>
          </div>
          <div>
            <div className="sender">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              enim esse et minima odit quae quia reiciendis tempora, veritatis
              voluptates.
              <div className="time">04:15</div>
            </div>
          </div>
          <div>
            <div className="sender">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
              enim esse et minima odit quae quia reiciendis tempora, veritatis
              voluptates. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Aut dolores error est eveniet hic laboriosam laudantium
              velit vitae. Amet animi, architecto assumenda atque autem
              consequuntur dolor eaque inventore iste labore laudantium
              molestiae nemo neque nihil nisi nostrum nulla numquam, obcaecati
              officiis placeat quae quaerat qui ratione tempora vel velit vitae.
              <div className="time">04:15</div>
            </div>
          </div>

          <div>
            <div className="receiver">
              OK bye... Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Corporis delectus dicta expedita ipsum itaque nemo nostrum
              quidem quod sint voluptate?
              <div className="time">04:12</div>
            </div>
          </div>
        </TalkRoomWrapper>

        <TalkForm onSubmit={onSubmitSendMessage}>
          <input
            type="text"
            placeholder="메시지를 입력하세요"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">전송</button>
        </TalkForm>
      </Container>
    );
  }
};

export default withRouter(TalkRoomSection);
