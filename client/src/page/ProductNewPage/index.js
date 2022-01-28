import { Container } from "./styled";

const ProductNewPage = () => {
  return (
    <Container>
      <ul>
        <li>상품등록</li>
        <li>상품관리</li>
        <li>구매/판매 내역</li>
      </ul>
      <h1>
        기본정보&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>*필수항목</span>
      </h1>
      <hr className="bold_hr" />
      <h2>
        상품이미지<span>*</span>
        &nbsp;<span className="img_cnt">(0/12)</span>
      </h2>
      <div></div>
      <div>
        <strong>
          <span>*</span> 상품 이미지는 640x640에 최적화 되어 있습니다.
        </strong>
        <br />
        - 이미지는 상품등록 시 정사각형으로 짤려서 등록됩니다.
        <br />
        - 이미지를 클릭 할 경우 원본이미지를 확인할 수 있습니다.
        <br />
        - 이미지를 클릭 후 이동하여 등록순서를 변경할 수 있습니다.
        <br />
        - 큰 이미지일경우 이미지가 깨지는 경우가 발생할 수 있습니다.
        <br />
        최대 지원 사이즈인 640 X 640 으로 리사이즈 해서 올려주세요.(개당 이미지
        최대 10M)
      </div>
      <hr />
      <h2>
        제목<span>*</span>
      </h2>
      <hr />
      <h2>
        카테고리<span>*</span>
      </h2>
      <hr />
      <h2>
        거래지역<span>*</span>
      </h2>
      <hr />
      <h2>
        상태<span>*</span>
      </h2>
      <hr />
      <h2>
        교환<span>*</span>
      </h2>
      <hr />
      <h2>
        가격<span>*</span>
      </h2>
      <h2>
        설명<span>*</span>
      </h2>
      <hr />
      <h2>연관태그</h2>
      <h2>수량</h2>
      <button>등록하기</button>
    </Container>
  );
};

export default ProductNewPage;
