import { Container, SettingCommonSection } from "../../styled";

export const DeleteMyAccountPage = () => {
  return (
    <Container>
      <div>
        <p style={{ textAlign: "center" }}>
          <strong>[ 잠깐! ]</strong>
        </p>
        <p>- 상점명 변경 및 휴대폰번호 변경은 내정보 수정에서 가능합니다.</p>
        <p>
          - 탈퇴 시 계정의 모든 정보는 삭제되며 재가입시에도
          <span style={{ color: "red" }}> 복구되지 않습니다.</span>
        </p>
      </div>
      <SettingCommonSection>
        <label>휴대번호</label>
        <input type="text" />
        <label>비밀번호</label>
        <input type="text" />
        <button>회원탈퇴</button>
      </SettingCommonSection>
    </Container>
  );
};

export default DeleteMyAccountPage;
