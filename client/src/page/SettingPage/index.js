import { Container, SettingTabMenu } from "./styled";
import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import SignoutPage from "./Section/SignoutPage";
import UpdatePasswordPage from "./Section/UpdatePasswordPage";
import DeleteMyAccountPage from "./Section/DeleteMyAccountPage";

export const SettingPage = ({ history }) => {
  const TAB_MENU = ["로그아웃", "비밀번호 변경", "회원탈퇴"];
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    TAB_MENU.forEach((v, i) => {
      console.log(v, i);
    });
  }, []);

  return (
    <Container>
      <SettingTabMenu>
        <ul>
          {TAB_MENU &&
            TAB_MENU.forEach((menu, index) => (
              <div>
                asdsafffaesdf
                <li>{menu}</li>
              </div>
            ))}
        </ul>
        {/*<li onClick={() => setTabIndex(0)} className={tabIndex === }>*/}
        {/*  로그아웃*/}
        {/*</li>*/}
        {/*<li onClick={() => setTabIndex(1)}>비밀번호 변경</li>*/}
        {/*<li onClick={() => setTabIndex(2)}>회원탈퇴</li>*/}
      </SettingTabMenu>
      {tabIndex === 0 && <SignoutPage />}
      {tabIndex === 1 && <UpdatePasswordPage />}
      {tabIndex === 2 && <DeleteMyAccountPage />}
    </Container>
  );
};

export default withRouter(SettingPage);
