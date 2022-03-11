import React, { useEffect, useState } from "react";
import AlertModal from "../../../../components/AlertModal";
import { RiMessage3Fill } from "react-icons/ri";
import { StoreProfile, StoreTable, TalkButton } from "./styled";

const ProductTalkSection = ({ storeOfProduct }) => {
  const [showTalkModal, setShowTalkModal] = useState(false);
  const [store, setStore] = useState(storeOfProduct);

  const onClickTalk = () => {
    console.log("TALK");
  };

  // console.log(storeOfProduct);
  useEffect(() => {
    if (storeOfProduct === undefined) return;
    setStore(storeOfProduct[0]);
  }, [storeOfProduct]);

  return (
    <>
      <button
        style={{ background: "#ffa425" }}
        onClick={() => setShowTalkModal(true)}
      >
        연락하기
      </button>
      <AlertModal
        show={showTalkModal}
        close={() => setShowTalkModal((prev) => !prev)}
        confirm={onClickTalk}
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
        <TalkButton>
          <RiMessage3Fill style={{ marginRight: "4px" }} />
          번개톡
        </TalkButton>
      </AlertModal>
    </>
  );
};

export default ProductTalkSection;
