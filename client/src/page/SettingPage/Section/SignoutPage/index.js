import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authUser } from "../../../../_actions/user_actions";
import { withRouter } from "react-router-dom";
import { Container, SettingCommonSection } from "../../styled";
import { User } from "./styled";

export const SignoutPage = ({ history }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  // 로그아웃
  function signout() {
    axios
      .get("/user/signout", { withCredentials: true })
      .then(({ data }) => {
        if (data.success) {
          dispatch(authUser());
        }
        history.push("/");
      })
      .catch((err) => {
        console.error("err >> ", err);
      });
  }

  return (
    <Container>
      <User>
        <img src={`${user.isSignin.data.profileURL}`} />
        <span>{user.isSignin.data.storeName}</span>
      </User>
      <SettingCommonSection>
        <button onClick={signout}>로그아웃</button>
      </SettingCommonSection>
    </Container>
  );
};

export default withRouter(SignoutPage);
