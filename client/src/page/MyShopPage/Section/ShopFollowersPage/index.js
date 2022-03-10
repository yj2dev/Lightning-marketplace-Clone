import { Container, User, UserContainer } from "./styled.js";
import { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

const ShopFollowersPage = ({ userId, history }) => {
  const [follower, setFollower] = useState([]);

  // 나를 팔로우한 유저(팔로워)
  function getUserFollower(userId) {
    axios
      .get(`/follow/${userId}/follower`)
      .then((res) => {
        console.log("res follower >> ", res);
        const followerList = [];

        res.data.data.map((v) => {
          followerList.push(v._fromUserId[0]);
        });

        setFollower(followerList);
        // console.log("followerList >> ", followerList);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserFollower(userId);
  }, []);

  return (
    <Container>
      <h3>
        팔로워&nbsp;<span style={{ color: "red" }}>{follower.length}</span>
      </h3>
      <hr />
      <UserContainer>
        {follower &&
          follower.map((user) => (
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

export default withRouter(ShopFollowersPage);
