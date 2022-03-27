import React, { useEffect, useState } from "react";
import AlertModal from "../../../../components/AlertModal";
import { RiMessage3Fill } from "react-icons/ri";
import { StoreProfile, StoreTable, TalkButton } from "./styled";
import SigninModal from "../../../../components/SigninModal";
import { useLocation, withRouter } from "react-router-dom";

const ProductTalkSection = ({ storeOfProduct, user, history }) => {
  const location = useLocation();
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showTalkModal, setShowTalkModal] = useState(false);
  const [store, setStore] = useState(storeOfProduct);
  const [isMyProduct, setIsMyProduct] = useState(false);

  useEffect(() => {
    if (storeOfProduct === undefined) return;
    setStore(storeOfProduct[0]);

    console.log("uesr >> ", user);
    const myProduct =
      user.isSignin?.data.id == storeOfProduct[0].id ? true : false;
    setIsMyProduct(myProduct);
    console.log(myProduct);
  }, [storeOfProduct, user]);

  function getProductId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  const onClickTalk = () => {
    if (!user.isSignin) {
      setShowSigninModal(true);
      return;
    }

    const productId = getProductId();

    history.push("/");
    history.push(`talk/${productId}?sellerId=${storeOfProduct[0].id}`);
  };

  const onShowTalkModal = () => {
    if (!user.isSignin) {
      setShowSigninModal(true);
      return;
    }
    setShowTalkModal(true);
  };

  return (
    <>
      {!isMyProduct && (
        <button
          id="btn-product"
          style={{ background: "#ffa425" }}
          onClick={onShowTalkModal}
        >
          연락하기
        </button>
      )}
      <AlertModal
        show={showTalkModal}
        close={() => setShowTalkModal((prev) => !prev)}
        confirm={onShowTalkModal}
        useCancelButton={false}
        useSubmitButton={false}
        useCloseButton={true}
      >
        {store && (
          <StoreProfile>
            <img src={store.profileURL} />
            <div className="name">{store.storeName}</div>
          </StoreProfile>
        )}

        <StoreTable>
          <tr>
            <td>연락가능시간</td>
            <td style={{ color: "red" }}>24시간</td>
          </tr>
          <tr>
            <td>상점연락처</td>
            <td>연락처 비공개</td>
          </tr>
        </StoreTable>
        <TalkButton id="btn-product" onClick={onClickTalk}>
          <RiMessage3Fill style={{ marginRight: "4px" }} />
          벼락톡
        </TalkButton>
      </AlertModal>
      <SigninModal
        show={showSigninModal}
        close={() => setShowSigninModal(false)}
      ></SigninModal>
    </>
  );
};

export default withRouter(ProductTalkSection);
