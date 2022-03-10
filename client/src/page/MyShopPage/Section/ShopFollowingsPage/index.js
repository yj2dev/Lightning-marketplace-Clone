import { Container } from "./styled.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { User, UserContainer } from "../ShopFollowersPage/styled";
import { withRouter } from "react-router-dom";

const ShopFollowingsPage = ({ userId, history }) => {
  const [following, setFollowing] = useState([]);

  // 내가 팔로우한 유저(팔로윙)
  function getUserFollowing(userId) {
    axios
      .get(`/follow/${userId}/following`)
      .then((res) => {
        console.log("res following >> ", res);
        const followerList = [];

        res.data.data.map((v) => {
          followerList.push(v._toUserId[0]);
        });

        setFollowing(followerList);
        // console.log("followerList >> ", followerList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserFollowing(userId);
  }, []);

  return (
    <Container>
      <h3>
        팔로잉&nbsp;<span style={{ color: "red" }}>{following.length}</span>
      </h3>
      <hr />
      <UserContainer>
        {following &&
          following.map((user) => (
            <User
              value={user._id}
              onClick={(e) => {
                history.push(`/shop/${e.target.value}`);
              }}
              className="cursor_pointer"
            >
              <div className="name">{user.storeName}</div>
              <img src={user.profileURL} />
            </User>
          ))}
      </UserContainer>
    </Container>
  );
};

export default withRouter(ShopFollowingsPage);
