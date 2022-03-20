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
    socket.on(`6236f8ae9f21683878768c72-spread`, (data) => {
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
    scrollToBottom();
  }, [toProductId, receiverId]);

  function onSubmitSendMessage(e) {
    e.preventDefault();

    if (message === "") return;

    const payload = {
      senderId: user.isSignin.data._id,
      toProductId,
      receiverId,
      message,
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

  function getReceiverInfo() {
    axios
      .get(`/user/detail/${receiverId}`)
      .then((res) => {
        setTalkToUser(res.data.data);
      })
      .catch((err) => {});
  }
  function getProductInfo() {
    axios
      .get(`/product/detail/${toProductId}`)
      .then((res) => {
        setTalkToProduct(res.data);
      })
      .catch((err) => {});
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
