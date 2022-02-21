import { Container, SettingTabMenu } from "./styled";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import SignoutPage from "./Section/SignoutPage";
import UpdatePasswordPage from "./Section/UpdatePasswordPage";
import DeleteMyAccountPage from "./Section/DeleteMyAccountPage";

export const SettingPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Container>
      <SettingTabMenu>
        <ul>
          <li
            onClick={() => setTabIndex(0)}
            className={tabIndex === 0 && "active"}
          >
            로그아웃
          </li>
          <li
            onClick={() => setTabIndex(1)}
            className={tabIndex === 1 && "active"}
          >
            비밀번호 변경
          </li>
          <li
            onClick={() => setTabIndex(2)}
            className={tabIndex === 2 && "active"}
          >
            회원탈퇴
          </li>
        </ul>
      </SettingTabMenu>
      {tabIndex === 0 && <SignoutPage />}
      {tabIndex === 1 && <UpdatePasswordPage />}
      {tabIndex === 2 && <DeleteMyAccountPage />}
    </Container>
  );
};

export default SettingPage;
