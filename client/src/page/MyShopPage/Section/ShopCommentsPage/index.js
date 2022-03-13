import {
  CommentSection,
  CommentTextarea,
  Container,
  InputContainer,
} from "./styled.js";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

import { BsPencil } from "react-icons/bs";
import { Link, withRouter } from "react-router-dom";
import { daysFormat } from "../../../../utils/Time";
import { FaRegCommentDots, FaRegTrashAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import SigninModal from "../../../../components/SigninModal";

const ShopCommentsPage = ({ shopId, history }) => {
  const user = useSelector((state) => state.user);

  const [showSigninModal, setShowSigninModal] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  const inputComment = useRef();

  function getShopComment(shopId) {
    axios
      .get(`/user/${shopId}/contact`)
      .then((res) => {
        console.log("res get comment >> ", res);

        const _commentList = [];

        res.data.data.forEach((comment) => {
          let data = {};

          data["content"] = comment.content;
          data["createdAt"] = comment.createdAt;
          data["commentId"] = comment.id;
          data["storeId"] = comment._fromWriterId[0].id;

          delete comment._fromWriterId[0].createdAt;
          delete comment._fromWriterId[0].id;
          delete comment._fromWriterId[0]._id;

          data = {
            ...data,
            ...comment._fromWriterId[0],
          };
          _commentList.push(data);
        });

        setCommentList(_commentList);
      })
      .catch((err) => {
        console.log("err get comment >> ", err);
      });
  }

  useEffect(() => {
    getShopComment(shopId);
  }, []);

  function onClickCreateComment() {
    if (!user.isSignin) {
      setShowSigninModal(true);
      return;
    }

    if (comment.length === 0) return;

    axios
      .post(`/user/${shopId}/contact`, { content: comment })
      .then((res) => {
        console.log("res create comment >> ", res);
        setComment("");
        getShopComment(shopId);
      })
      .catch((err) => {
        console.log("err create comment >> ", err);
      });
  }

  const onClickNestedComment = (e) => {
    const [userId, storeName] = e.target.value.split("/");
    console.log(userId, storeName);
    setComment(`@${storeName} : `);
    inputComment.current.focus();
  };

  const onClickDeleteComment = (e) => {
    const [commentId, storeName] = e.target.value.split("/");

    axios
      .delete(`/user/${commentId}/contact`)
      .then((res) => {
        console.log(res);
        getShopComment(shopId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isNestedComment = (comment) => {
    if (comment[0] === "@") {
      const target = comment.split(" ")[0];
      comment = comment.replace(target, "");

      return (
        <>
          <span>{target}</span> {comment}
        </>
      );
    }
    return comment;
  };

  return (
    <Container>
      <h3>
        찜&nbsp;<span style={{ color: "red" }}>{commentList.length}</span>
      </h3>
      <hr />

      <InputContainer>
        <CommentTextarea
          value={comment}
          onChange={(e) => {
            if (e.target.value.length > 100) return;
            setComment(e.target.value);
          }}
          type="text"
          placeholder="상품문의 입력"
          ref={inputComment}
        />

        <hr />
        <span>{comment.length} / 100</span>
        <button onClick={onClickCreateComment}>
          <BsPencil /> 등록
        </button>
      </InputContainer>

      <div>
        {commentList &&
          commentList.map((comment) => (
            <CommentSection>
              <Link to={`/shop/${comment._id}`}>
                <img src={comment.profileURL} />
              </Link>
              <div>
                <Link to={`/shop/${comment._id}`}>
                  <div className="name">{comment.storeName}</div>
                </Link>
                <div className="content">
                  {isNestedComment(comment.content)}
                </div>
                <div className="time">{daysFormat(comment.createdAt)}</div>
                <button
                  className="create_comment cursor_pointer"
                  value={`${comment._id}/${comment.storeName}`}
                  onClick={onClickNestedComment}
                >
                  <span>
                    <FaRegCommentDots
                      size={14}
                      style={{ transform: "scaleX(-1)" }}
                    />
                  </span>
                  &nbsp; 댓글달기
                </button>
                {user.isSignin && user.isSignin.data._id === comment.storeId && (
                  <button
                    className="delete_ask cursor_pointer"
                    value={`${comment.commentId}/${comment.storeName}`}
                    onClick={onClickDeleteComment}
                  >
                    <span>
                      <FaRegTrashAlt size={14} />
                    </span>
                    &nbsp; 삭제하기
                  </button>
                )}
              </div>
            </CommentSection>
          ))}
      </div>
      <SigninModal
        show={showSigninModal}
        close={() => setShowSigninModal(false)}
      ></SigninModal>
    </Container>
  );
};

export default withRouter(ShopCommentsPage);
