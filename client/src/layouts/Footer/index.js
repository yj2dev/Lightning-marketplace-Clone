import {
  Container,
  Content1,
  Content2,
  Content3,
  ContentContainer,
  ContentTitle,
  ItemSection,
} from "./styled";

const Footer = () => {
  return (
    <Container>
      <ItemSection>
        <span>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/nogoduck/Lightning-marketplace-Clone"
          >
            개발자 깃허브
          </a>
        </span>
        <span>고민은 배송만 늦출뿐</span>
        <span>마음속 가려운 곳은 카드로 긁으면 시원하다</span>
        <span>내 소비는 맞고 내 월급을 틀렸다.</span>
      </ItemSection>

      <ContentContainer>
        <Content1>
          <ContentTitle>벼락장터(주)사업자정보</ContentTitle> <br />
          대표이사 : 성난오리 | 개인정보보호책임자 : 성난오리
          <br />
          사업자등록번호 : 000-00-00000 | 통신판매업신고 : 2022-한국-0000
          <br />
          호스팅서비스 제공자 : Amazon Web Services (AWS) <br />
          EMAIL : help@lightningmarket.co.kr | FAX : 00-000-0000 <br />
          주소 : 경기도 성남시 분당구 판교신도시
        </Content1>
        <Content2>
          <ContentTitle>고객센터</ContentTitle> <br />
          <span className="center_number">1670-0000</span>
          <br />
          운영시간 00시 - 24시 <br />
          (주말/공휴일 휴무, 점심시간 12시 - 13시) <br />
        </Content2>
        <Content3>
          <ContentTitle>중고거래</ContentTitle> <br />
          중고품을 사고 파는 행위. 따라서 개인 간의 거래, 기업 간의 거래, 단체
          간의 거래, 국가 간의 거래가 있을 수 있으나,{" "}
          <u>개인 간의 거래를 제외하고는</u> '중고거래'란 명칭을 거의 사용하지
          않고 '감가상각계산'이라든지 '가치측정' 같은 다른 방식과 명칭을
          사용하기 때문에 보통은 개인이 구입한 물건을 다시 팔 때로 정의한다.
          <br />
          <span id="copyright">
            Ⓒ Lightningmarket. Inc All rights reserved.
          </span>
        </Content3>
      </ContentContainer>
    </Container>
  );
};

export default Footer;
