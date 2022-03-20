import { Container, TalkForm, TalkRoomWrapper } from "./styled";
import { intOfKr } from "../../../../utils/Currency";
import { useRef, useState } from "react";

export const TalkRoomSection = () => {
  const talkScrollRef = useRef();
  const [message, setMessage] = useState("");

  // console.log(talkScrollRef.current.scrollX());

  const scrollToBottom = () => {
    const { scrollTop, scrollHeight, clientHeight } = talkScrollRef.current;
    const bottom = scrollHeight - clientHeight;
    talkScrollRef.current.scrollTo(0, bottom);
  };

  function onSubmitSendMessage(e) {
    e.preventDefault();

    // if (message === "") return;

    console.log("메시지 전송");
    console.log("message >> ", message);
    setMessage("");
    scrollToBottom();
  }
  return (
    <Container>
      <div className="title">닉네임</div>
      <div className="sub_title">
        <img src="https://place-hold.it/50x50" />
        <div className="price">
          {intOfKr(450000)} <span>원</span>
        </div>
        <br />
        <div className="product_title">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. In neque
          officiis quae!
        </div>
      </div>
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
            elit. Aut dolores error est eveniet hic laboriosam laudantium velit
            vitae. Amet animi, architecto assumenda atque autem consequuntur
            dolor eaque inventore iste labore laudantium molestiae nemo neque
            nihil nisi nostrum nulla numquam, obcaecati officiis placeat quae
            quaerat qui ratione tempora vel velit vitae.
            <div className="time">04:15</div>
          </div>
        </div>

        <div>
          <div className="receiver">
            OK bye... Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Corporis delectus dicta expedita ipsum itaque nemo nostrum quidem
            quod sint voluptate?
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
};

export default TalkRoomSection;
