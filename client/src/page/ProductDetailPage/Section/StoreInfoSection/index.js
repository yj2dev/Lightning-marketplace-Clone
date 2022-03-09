import { Container } from "./styled";
import { withRouter } from "react-router-dom";

const StoreInfoSection = ({ user, history }) => {
  function onClickStoreInfo() {
    history.push(`/shop/${user._id}`);
  }

  return (
    <Container>
      <h3>상점 정보</h3>
      <hr />
      <div onClick={onClickStoreInfo} className="cursor_pointer">
        <img src={`${user.profileURL}`} />
        {user && user.storeName} <br />
        <span>상품 0 | 팔로워 0</span>
      </div>
    </Container>
  );
};

export default withRouter(StoreInfoSection);
