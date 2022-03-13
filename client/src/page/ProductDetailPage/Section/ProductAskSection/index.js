import { InputContainer, AskTextarea, AskSection } from "./styled";
import { BsPencil } from "react-icons/bs";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useLocation, withRouter } from "react-router-dom";
import { daysFormat } from "../../../../utils/Time";
import { FaRegCommentDots, FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import SigninModal from "../../../../components/SigninModal";

const ProductAskSection = ({ history }) => {
  const location = useLocation();
  const productId = getProductId();
  const user = useSelector((state) => state.user);

  const [showSigninModal, setShowSigninModal] = useState(false);
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
          data["askId"] = contact.id;
          data["storeId"] = contact._fromWriterId[0].id;

          delete contact._fromWriterId[0].createdAt;
          delete contact._fromWriterId[0].id;
          delete contact._fromWriterId[0]._id;

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
    getProductAsk(productId);
  }, []);

  const onClickCreateAsk = () => {
    if (!user.isSignin) {
      setShowSigninModal(true);
      return;
    }

    if (ask === "") return;

    const productId = getProductId();

    axios
      .post(`/product/${productId}/contact`, { content: ask })
      .then((res) => {
        console.log(res);
        setAsk("");
        getProductAsk(productId);
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

  const onClickDeleteAsk = (e) => {
    const [askId, storeName] = e.target.value.split("/");
    axios
      .delete(`/product/${askId}/contact`)
      .then((res) => {
        console.log(res);
        getProductAsk(productId);
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
              <Link to={`/shop/${ask.storeId}`}>
                <img src={ask.profileURL} />
              </Link>
              <div>
                <Link to={`/shop/${ask.storeId}`}>
                  <div className="name">{ask.storeName}</div>
                </Link>
                <div className="content">{isNestedAsk(ask.content)}</div>
                <div className="time">{daysFormat(ask.createdAt)}</div>
                <button
                  className="create_ask cursor_pointer"
                  value={`${ask.askId}/${ask.storeName}`}
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
                {user.isSignin && user.isSignin.data._id === ask.storeId && (
                  <button
                    className="delete_ask cursor_pointer"
                    value={`${ask.askId}/${ask.storeName}`}
                    onClick={onClickDeleteAsk}
                  >
                    <span>
                      <FaRegTrashAlt size={14} />
                    </span>
                    &nbsp; 삭제하기
                  </button>
                )}
              </div>
            </AskSection>
          ))}
      </div>
      <SigninModal
        show={showSigninModal}
        close={() => setShowSigninModal(false)}
      ></SigninModal>
    </>
  );
};

export default withRouter(ProductAskSection);
