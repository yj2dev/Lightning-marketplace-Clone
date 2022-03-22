import { Container } from "./styled.js";
import { ReviewTextarea, InputContainer } from "./styled";
import { BsPencil } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { ReviewSection } from "../ShopReviewsPage/styled";
import { daysFormat } from "../../../../utils/Time";
import { FaRegCommentDots, FaRegTrashAlt } from "react-icons/fa";
import SigninModal from "../../../../components/SigninModal";
import { useSelector } from "react-redux";

const ShopReviewsPage = ({ shopId, hishory }) => {
  const user = useSelector((state) => state.user);
  const inputReview = useRef();

  const [showSigninModal, setShowSigninModal] = useState(false);
  const [review, setReview] = useState("");
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    getShopReview(shopId);
  }, []);

  function getShopReview(shopId) {
    axios
      .get(`/user/${shopId}/review`)
      .then((res) => {
        console.log("res get review >> ", res);

        const _reviewList = [];

        res.data.data.forEach((review) => {
          let data = {};

          data["content"] = review.content;
          data["createdAt"] = review.createdAt;
          data["reviewId"] = review.id;
          data["storeId"] = review._fromWriterId[0].id;

          delete review._fromWriterId[0].createdAt;
          delete review._fromWriterId[0].id;
          delete review._fromWriterId[0]._id;

          data = {
            ...data,
            ...review._fromWriterId[0],
          };
          _reviewList.push(data);
        });

        setReviewList(_reviewList);
      })
      .catch((err) => {
        console.log("err get review >> ", err);
      });
  }

  const onClickCreateReview = () => {
    if (!user.isSignin) {
      setShowSigninModal(true);
      return;
    }

    if (review.length === 0) return;

    axios
      .post(`/user/${shopId}/review`, { content: review })
      .then((res) => {
        console.log("res create review >> ", res);
        setReview("");
        getShopReview(shopId);
      })
      .catch((err) => {
        console.log("err create review >> ", err);
      });
  };

  const onClickNestedReview = (e) => {
    const [userId, storeName] = e.target.value.split("/");
    console.log(userId, storeName);
    setReview(`@${storeName} : `);
    inputReview.current.focus();
  };

  const onClickDeleteReview = (e) => {
    const [reviewId, storeName] = e.target.value.split("/");

    axios
      .delete(`/user/${reviewId}/review`)
      .then((res) => {
        console.log(res);
        getShopReview(shopId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isNestedReview = (review) => {
    if (review[0] === "@") {
      const target = review.split(" ")[0];
      review = review.replace(target, "");

      return (
        <>
          <span>{target}</span> {review}
        </>
      );
    }
    return review;
  };

  return (
    <Container>
      <h3>
        찜&nbsp;<span style={{ color: "red" }}>{reviewList.length}</span>
      </h3>
      <hr />

      <InputContainer>
        <ReviewTextarea
          value={review}
          onChange={(e) => {
            if (e.target.value.length > 100) return;
            setReview(e.target.value);
          }}
          type="text"
          placeholder="상점후기 입력"
          ref={inputReview}
        />

        <hr />
        <span>{review.length} / 100</span>
        <button onClick={onClickCreateReview}>
          <BsPencil /> 등록
        </button>
      </InputContainer>

      <div>
        {reviewList &&
          reviewList.map((review) => (
            <ReviewSection>
              <Link to={`/shop/${review._id}`}>
                <img src={review.profileURL} />
              </Link>
              <div>
                <Link to={`/shop/${review._id}`}>
                  <div className="name">{review.storeName}</div>
                </Link>
                <div className="content">{isNestedReview(review.content)}</div>
                <div className="time">{daysFormat(review.createdAt)}</div>
                <button
                  className="create_review cursor_pointer"
                  value={`${review._id}/${review.storeName}`}
                  onClick={onClickNestedReview}
                >
                  <span>
                    <FaRegCommentDots
                      size={14}
                      style={{ transform: "scaleX(-1)" }}
                    />
                  </span>
                  &nbsp; 댓글달기
                </button>
                {user.isSignin && user.isSignin.data._id === review.storeId && (
                  <button
                    className="delete_ask cursor_pointer"
                    value={`${review.reviewId}/${review.storeName}`}
                    onClick={onClickDeleteReview}
                  >
                    <span>
                      <FaRegTrashAlt size={14} />
                    </span>
                    &nbsp; 삭제하기
                  </button>
                )}
              </div>
            </ReviewSection>
          ))}
      </div>
      <SigninModal
        show={showSigninModal}
        close={() => setShowSigninModal(false)}
      ></SigninModal>
    </Container>
  );
};

export default withRouter(ShopReviewsPage);
