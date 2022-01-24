import React, { useState, useEffect } from "react";

import LoginModal from "../../../components/LoginModal";

function TopNav() {
  useEffect(() => {}, []);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const onClosLoginModal = () => {
    setShowLoginModal(false);
  };

  const onToggleLogin = () => {
    setShowLoginModal((prev) => !prev);
  };
  const onSubmitLogin = () => {
    console.log("submit");
  };

  return (
    <>
      <button>앱다운로드</button>
      <button>즐겨찾기</button>
      <button onClick={onToggleLogin}>로그인/회원가입</button>
      <button>내상점</button>

      <LoginModal show={showLoginModal} close={onClosLoginModal}>
        {/*<Button onClick={onSubmitLogin}>계정 생성하기</Button>*/}
      </LoginModal>
    </>
  );
}

export default TopNav;
