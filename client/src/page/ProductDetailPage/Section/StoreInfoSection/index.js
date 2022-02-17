import { Container } from "./styled";

const StoreInfoSection = ({ user }) => {
  return (
    <Container>
      <h3>상점 정보</h3>
      <hr />
      <img src={`${user.profileURL}`} />
      <div>
        {user && user.storeName} <br />
        <span>상품 0 | 팔로워 0</span>
      </div>
    </Container>
  );
};

export default StoreInfoSection;
