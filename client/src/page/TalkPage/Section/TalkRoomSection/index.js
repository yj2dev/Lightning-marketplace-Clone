import { Container, NullContainer, TalkForm, TalkRoomWrapper } from "./styled";
import { intOfKr } from "../../../../utils/Currency";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import { io } from "socket.io-client";
import axios from "axios";
import { RiMessage3Line } from "react-icons/ri";
import { timeKrFormatAndMMDD } from "../../../../utils/Time";

const socket = io.connect(`${process.env.REACT_APP_BASE_URL}/nsp-root`);

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

    console.log("roomId >> ", roomId);
    // 가져왔던 유저정보 그대로 활용예정
    socket.on(`${roomId}-receiveMessage`, (data) => {
      console.log("receiveMessage data >> ", data);
      data["isMine"] = data.fromUserId === user.isSignin.data._id;
      getMessageList(roomId);

      const _messageList = messageList;
      console.log("------------");
      console.log(messageList);
      console.log(_messageList);
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
      receive: {
        content: message,
        createdAt: new Date().toISOString(),
        fromUserId: user.isSignin.data._id,
        fromUserName: user.isSignin.data.storeName,
        fromUserProfileURL: user.isSignin.data.profileURL,
        notRead: true,
        toUserId: talkToUser._id,
        toUserName: talkToUser.storeName,
        toUserProfileURL: talkToUser.profileURL,
      },
      save: {
        senderId: user.isSignin.data._id,
        toProductId,
        receiverId,
        message,
        roomId,
      },
    };

    console.log("sendMessage >> ", payload);
    socket.emit("sendMessage", payload, (data) => {
      console.log("sendMessage data >> ", data);
      data["isMine"] = data.fromUserId === user.isSignin.data._id;

      const _messageList = messageList;
      _messageList.push(data);
      console.log("_messageList >> ", _messageList);
      setMessageList(_messageList);
    });

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

          _data["isMine"] =
            res.data[i]._toUserId[0]._id !== user.isSignin.data._id;
          _data["toUserId"] = res.data[i]._toUserId[0]._id;
          _data["toUserName"] = res.data[i]._toUserId[0].storeName;
          _data["toUserProfileURL"] = res.data[i]._toUserId[0].profileURL;
          _data["fromUserId"] = res.data[i]._fromUserId[0]._id;
          _data["fromUserName"] = res.data[i]._fromUserId[0].storeName;
          _data["fromUserProfileURL"] = res.data[i]._fromUserId[0].profileURL;

          _data["notRead"] = res.data[i].notRead;
          _data["content"] = res.data[i].content;
          _data["createdAt"] = res.data[i].createdAt;

          // console.log("_data >> ", _data);
          _messageList.push(_data);
        }
        console.log("_messageList >> ", _messageList);
        setMessageList(_messageList);
        scrollToBottom();
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
        {/*<Link to="/test">TEST</Link>*/}
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
          {messageList?.map((message) => (
            <div>
              <div
                className={
                  message.isMine ? "profile_img hidden" : "profile_img"
                }
              >
                <img src={message.fromUserProfileURL} />
              </div>
              <div className={message.isMine ? "sender" : "receiver"}>
                {message.content}
                <div className="time">
                  {timeKrFormatAndMMDD(message.createdAt)}
                </div>
              </div>
            </div>
          ))}
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
