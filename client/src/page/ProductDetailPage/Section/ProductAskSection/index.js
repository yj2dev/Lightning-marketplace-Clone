import { InputContainer, AskTextarea, AskSection } from "./styled";
import { BsPencil } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, withRouter } from "react-router-dom";
import { daysFormat } from "../../../../utils/Time";
import { FaRegCommentDots } from "react-icons/fa";

const ProductAskSection = ({ history }) => {
  const location = useLocation();

  const [askList, setAskList] = useState([]);
  const [ask, setAsk] = useState("");

  const inputAsk = useRef();

  const onChangeAsk = (e) => {
    if (e.target.value.length > 100) return;
    setAsk(e.target.value);
  };

  function getProductId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  function getProductAsk(productId) {
    axios
      .get(`/product/${productId}/contact`)
      .then((res) => {
        console.log("res contact >> ", res);

        const contactList = [];

        res.data.forEach((contact) => {
          let data = {};
          data["content"] = contact.content;
          data["createdAt"] = contact.createdAt;

          delete contact._fromWriterId[0].createdAt;

          data = {
            ...data,
            ...contact._fromWriterId[0],
          };
          contactList.push(data);
        });

        setAskList(contactList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const productId = getProductId();
    getProductAsk(productId);
  }, []);

  const onClickCreateAsk = () => {
    if (ask === "") return;

    const productId = getProductId();

    axios
      .post(`/product/${productId}/contact`, { content: ask })
      .then((res) => {
        console.log(res);
        setAsk("");
        history.push(`/product/${productId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickNestedAsk = (e) => {
    const [askId, storeName] = e.target.value.split("/");
    console.log(askId, storeName);
    setAsk(`@${storeName} : `);
    inputAsk.current.focus();
  };

  const onClickDeleteAsk = () => {
    const productId = getProductId();

    axios
      .delete(`/product/${productId}/contact`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickUpdateAsk = () => {
    if (ask === "") return;

    const productId = getProductId();

    axios
      .patch(`/product/${productId}/contact`, { content: ask })
      .then((res) => {
        console.log(res);
        setAsk("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isNestedAsk = (ask) => {
    if (ask[0] === "@") {
      const target = ask.split(" ")[0];
      ask = ask.replace(target, "");

      return (
        <>
          <span>{target}</span> {ask}
        </>
      );
    }
    return ask;
  };
  return (
    <>
      <h3>
        상품문의&nbsp;
        <span style={{ color: "red" }}>{askList && askList.length}</span>
      </h3>
      <InputContainer>
        <AskTextarea
          value={ask}
          onChange={onChangeAsk}
          type="text"
          placeholder="상품문의 입력"
          ref={inputAsk}
        />

        <hr />
        <span>{ask.length} / 100</span>
        <button onClick={onClickCreateAsk}>
          <BsPencil /> 등록
        </button>
      </InputContainer>

      <div>
        {askList &&
          askList.map((ask) => (
            <AskSection>
              <img src={ask.profileURL} />
              <div>
                <div className="name">{ask.storeName}</div>
                <div className="content">{isNestedAsk(ask.content)}</div>
                <div className="time">{daysFormat(ask.createdAt)}</div>
                <button
                  className="create_ask cursor_pointer"
                  value={`${ask._id}/${ask.storeName}`}
                  onClick={onClickNestedAsk}
                >
                  <span>
                    <FaRegCommentDots
                      size={14}
                      style={{ transform: "scaleX(-1)" }}
                    />
                  </span>
                  &nbsp; 댓글달기
                </button>
              </div>
            </AskSection>
          ))}
      </div>
    </>
  );
};

export default withRouter(ProductAskSection);
