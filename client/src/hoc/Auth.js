import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authUser } from "../_actions/user_actions";

// option: 로그인 여부 상관없음 (0) - 기본값
//         로그인 한 유저만 허용(1)
//         로그인 안한 유저만 허용(2)
export default function (Component, option = 0) {
  function AuthenticationCheck({ history }) {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authUser()).then((res) => {
        console.log("authUser res >> ", res);
        const isSignin = res.payload && res.payload.success && true;
        console.log("isSignin >> ", isSignin);

        if (isSignin && option === 1) {
          // 로그인 한 유저만 접근 가능
          return <Component />;
        } else {
          history.push("/");
        }

        if (!isSignin && option === 2) {
          // 로그인 안한 유저만 접근 가능
          return <Component />;
        } else {
          history.push("/");
        }
      });
    }, []);

    return <Component />;
  }

  return withRouter(AuthenticationCheck);
}
