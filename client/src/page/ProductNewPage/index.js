import {
  Container,
  ImgUploadLabel,
  InputSection,
  Title,
  Category,
  TrandingArea,
  Status,
  Exchange,
  Price,
  ProductDescription,
  Tag,
  ProductQuantity,
  ErrorMessage,
  ProductImgSection,
  DaumPostcodeWrapper,
} from "./styled";

import { AiFillCamera } from "react-icons/ai";
import { HiOutlineBan } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import { forwardRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import UploadProductImage from "./Section/UploadProductImage";
import { withRouter } from "react-router-dom";
import {
  ProductLargeCategory,
  ProductMediumCategory,
  ProductSmallCategory,
} from "../../data/ProductCategory";
import DaumPostcode from "react-daum-postcode";
import Postcode from "../../components/Postcode";
import Modal from "../../components/Modal";

const ProductNewPage = ({ history }) => {
  const MAX_IMAGE = 12;
  const [productImage, setProductImage] = useState([]);
  const [productImageURL, setProductImageURL] = useState([]);

  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [showDeleteTitleButton, setShowDeleteTitleButton] = useState(false);

  const [largeCateogry, setLargeCategory] = useState("");
  const [mediumCategory, setMediumCategory] = useState("");
  const [smallCategory, setSmallCategory] = useState("");
  const [selectCategory, setSelectCategory] = useState({
    large: null,
    medium: null,
    small: null,
  });

  const [address, setAddress] = useState("지역설정안함");
  const [showPostcodeModal, setShowPostcodeModal] = useState(false);

  const [status, setStatus] = useState("중고상품");

  const [exchange, setExchange] = useState("교환불가");

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState({
    minPrice: false,
  });
  const [checkedDeliveryCharge, setCheckedDeliveryCharge] = useState(false);

  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [quantity, setQuantity] = useState("");

  const onClickDeliveryCharge = () => {
    // true(배송비 포함), false(배송비 미포함)
    setCheckedDeliveryCharge((prev) => !prev);
    console.log(checkedDeliveryCharge);
  };

  const onClickStatus = (e) => {
    setStatus(e.target.value);
  };
  const onClickExchange = (e) => {
    setExchange(e.target.value);
  };

  const onChangePrice = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]+$/;
    if (value !== "" && !regex.test(value)) {
      alert("숫자만 입력해 주세요.");
      return;
    }

    if (parseInt(value) < 100) setPriceError({ minPrice: true });
    else setPriceError({ minPrice: false });

    setPrice(value);
  };

  const onSelectLargeCategory = (e) => {
    const value = e.target.valueOf(e).innerText;
    setSelectCategory({
      large: value,
    });
    setMediumCategory(ProductMediumCategory[value]);
  };

  const onClosePostcodeModal = () => {
    setShowPostcodeModal(false);
  };
  const onTogglePostcodeModal = () => {
    setShowPostcodeModal((prev) => !prev);
  };
  const onClickNoneAddress = () => {
    setAddress("지역설정안함");
  };

  const onSelectMediumCategory = (e) => {
    const value = e.target.valueOf(e).innerText;
    setSelectCategory({
      large: selectCategory.large,
      medium: value,
    });
    setSmallCategory(ProductSmallCategory[`${selectCategory.large}-${value}`]);
  };

  const onSelectSmallCategory = (e) => {
    const value = e.target.valueOf(e).innerText;
    setSelectCategory({
      large: selectCategory.large,
      medium: selectCategory.medium,
      small: value,
    });
  };

  const imageUpload = () => {
    const formData = new FormData();

    for (let i = 0; i < productImage.length; i++) {
      formData.append("image", productImage[i]);
    }

    axios
      .post("http://localhost:8000/user/upload/product", formData)
      .then(({ data }) => {
        console.log("succeed >> ", data);
      })
      .catch(({ data }) => {
        console.log("failed >> ", data);
      });
  };

  const onChangeImage = (e) => {
    console.log(e.target.files);
    const files = e.target.files;

    if (files.length + productImage.length > MAX_IMAGE) {
      alert("사진 첨부는 최대 12장까지 가능합니다.");
      return;
    }

    const imageDataArray = productImage;
    const imageURLArray = productImageURL;
    // const imageDataArray = [];
    // const imageURLArray = [];

    console.log("imageDataArray >> ", imageDataArray);
    console.log("imageURLArray >> ", imageURLArray);

    for (let i = 0; i < files.length; i++) {
      imageDataArray.push(e.target.files[i]);
      imageURLArray.push(URL.createObjectURL(e.target.files[i]));
    }

    console.log("imageDataArray >> ", imageDataArray);
    console.log("imageURLArray >> ", imageURLArray);

    // 동작확인 불가
    // URL.revokeObjectURL(e.target.files[index]);

    setProductImage(imageDataArray);
    setProductImageURL(imageURLArray);

    history.push("/product/new");

    // imageUpload(imageDataArray);
  };

  const onDeleteProductImage = (e) => {
    if (productImage.length === 0 || productImageURL.length === 0) {
      alert("삭제할 이미지가 존재하지 않습니다.");
      return;
    }

    const imageDataArray = productImage;
    const imageURLArray = productImageURL;

    imageDataArray.splice(parseInt(e.target.value), 1);
    imageURLArray.splice(parseInt(e.target.value), 1);

    setProductImage(imageDataArray);
    setProductImageURL(imageURLArray);

    console.log(productImage);
    console.log(productImageURL);
    console.log("del ... ");
    history.push("/product/new");
  };

  const onClickProductInfo = () => {
    console.log("도로명 API 호출 정보");
    console.log(address);
  };

  const onDeleteTitleValue = () => {
    setTitle("");
    setTitleLength(0);
    setShowDeleteTitleButton(false);
  };
  const onChangeTitle = (e) => {
    const value = e.target.value;

    if (value.length > 40) {
      return;
    }

    if (value === "") setShowDeleteTitleButton(false);
    else setShowDeleteTitleButton(true);

    setTitleLength(value.length);
    setTitle(value);

    if (value.length <= 2) setTitleError(true);
    else setTitleError(false);
  };

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    onClosePostcodeModal();
    setAddress(fullAddress);
  };

  return (
    <Container>
      <ul>
        <li>상품등록</li>
        <li>상품관리</li>
        <li>구매/판매 내역</li>
      </ul>

      <button onClick={onClickProductInfo}>상품 정보</button>

      <h1>
        기본정보&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>*필수항목</span>
      </h1>
      <hr className="bold_hr" />
      {/*  상품 이미지 Section */}
      <InputSection>
        <tr>
          <td>
            <h2>
              상품이미지<span>*</span>
              &nbsp;
              <span className="img_cnt">
                ({productImageURL.length}/{MAX_IMAGE})
              </span>
            </h2>
          </td>
          <td>
            <ImgUploadLabel className="cursor_pointer" for="product_image">
              <AiFillCamera size={42} style={{ color: "d7d7d7" }} />
              이미지 등록
            </ImgUploadLabel>
            <input
              type="file"
              accept="image/*"
              id="product_image"
              className="hidden"
              multiple
              onChange={onChangeImage}
            />

            <ProductImgSection>
              {productImageURL &&
                productImageURL.map((imageURL, i) => (
                  <div key={i} className="img_wrapper">
                    <span className={!i && "title_image"}></span>
                    <button
                      className="product_image_index cursor_pointer"
                      value={i}
                      id="image_id"
                      onClick={onDeleteProductImage}
                    >
                      &times;
                    </button>
                    <img src={imageURL} />
                  </div>
                ))}
            </ProductImgSection>

            <div className="img_description">
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
              최대 지원 사이즈인 640 X 640 으로 리사이즈 해서 올려주세요.(개당
              이미지 최대 10M)
            </div>
          </td>
        </tr>
        {/*  End 상품 이미지 Section */}

        <tr>
          <td>
            <h2>
              제목<span>*</span>
            </h2>
          </td>
          <Title>
            <input
              type="text"
              placeholder="상품 제목을 입력해주세요."
              value={title}
              onChange={onChangeTitle}
              id={titleError && "error"}
            />
            {showDeleteTitleButton && (
              <IoMdCloseCircle
                size={24}
                className="cursor_pointer"
                style={{
                  color: "lightgray",
                  position: "absolute",
                  top: "45px",
                  right: "70px",
                }}
                onClick={onDeleteTitleValue}
              />
            )}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {titleLength}/40
            {titleError && (
              <ErrorMessage>
                <HiOutlineBan />
                &nbsp;&nbsp;상품명을 2자 이상 입력해주세요.
              </ErrorMessage>
            )}
          </Title>
        </tr>

        <tr>
          <td>
            <h2>
              카테고리<span>*</span>
            </h2>
          </td>
          <Category>
            <div>
              <table>
                <tr>
                  <td>
                    <div className="category_scroll">
                      {ProductLargeCategory &&
                        ProductLargeCategory.map((v) => (
                          <li
                            onClick={onSelectLargeCategory}
                            className={v === selectCategory.large && "active"}
                          >
                            {v}
                          </li>
                        ))}
                    </div>
                  </td>
                  <td>
                    <div className="category_scroll">
                      {mediumCategory &&
                        mediumCategory.map((v) => (
                          <li
                            onClick={onSelectMediumCategory}
                            className={v === selectCategory.medium && "active"}
                          >
                            {v}
                          </li>
                        ))}
                    </div>
                  </td>
                  <td>
                    <div className="category_scroll">
                      {smallCategory &&
                        smallCategory.map((v) => (
                          <li
                            onClick={onSelectSmallCategory}
                            className={v === selectCategory.small && "active"}
                          >
                            {v}
                          </li>
                        ))}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
            <div className="selected_category">
              선택한 카테고리 :&nbsp;
              <strong>
                {selectCategory.large && selectCategory.large}
                {selectCategory.medium && <> > {selectCategory.medium}</>}
                {selectCategory.small && <> > {selectCategory.small}</>}
              </strong>
            </div>
          </Category>
        </tr>

        <tr>
          <td>
            <h2>
              거래지역<span>*</span>
            </h2>
          </td>
          <TrandingArea>
            <button onClick={onTogglePostcodeModal} className="cursor_pointer">
              주소 검색
            </button>
            <button onClick={onClickNoneAddress} className="cursor_pointer">
              지역설정안함
            </button>
            <input type="text" disabled={true} value={address} />
            <Modal
              show={showPostcodeModal}
              close={onClosePostcodeModal}
              style={{ width: "450px" }}
            >
              <DaumPostcode onComplete={handleComplete} />
            </Modal>
          </TrandingArea>
        </tr>

        <tr>
          <td>
            <h2>
              상태<span>*</span>
            </h2>
          </td>
          <Status>
            <input
              type="radio"
              id="used_product"
              name="product_status"
              onClick={onClickStatus}
              value="중고상품"
              checked={status === "중고상품" && true}
            />
            <label htmlFor="used_product">중고상품</label>
            <input
              type="radio"
              id="new_product"
              name="product_status"
              onClick={onClickStatus}
              value="새상품"
              checked={status === "새상품" && true}
            />
            <label htmlFor="new_product">새상품</label>
          </Status>
        </tr>

        <tr>
          <td>
            <h2>
              교환<span>*</span>
            </h2>
          </td>
          <Exchange>
            <input
              type="radio"
              id="exchange_disable"
              name="product_exchange"
              onClick={onClickExchange}
              value="교환불가"
              checked={exchange === "교환불가" && true}
            />
            <label htmlFor="exchange_disable">교환불가</label>
            <input
              type="radio"
              id="exchange_enable"
              name="product_exchange"
              onClick={onClickExchange}
              value="교환가능"
              checked={exchange === "교환가능" && true}
            />
            <label htmlFor="exchange_enable">교환가능</label>
          </Exchange>
        </tr>

        <tr>
          <td>
            <h2>
              가격<span>*</span>
            </h2>
          </td>
          <Price>
            <input
              type="text"
              placeholder="숫자만 입력해주세요."
              value={price}
              onChange={onChangePrice}
              id={priceError.minPrice && "error"}
            />
            &nbsp;&nbsp;&nbsp;원
            {priceError.minPrice && (
              <ErrorMessage>
                <HiOutlineBan />
                &nbsp;&nbsp;100원 이상 입력해주세요.
              </ErrorMessage>
            )}
            <br />
            <div className="delivery_charge_wrapper">
              <input
                type="checkbox"
                id="delivery_charge_include"
                checked={checkedDeliveryCharge}
                onClick={onClickDeliveryCharge}
              />
              <label htmlFor="delivery_charge_include">배송비 포함</label>
            </div>
          </Price>
        </tr>

        <tr>
          <td>
            <h2>
              설명<span>*</span>
            </h2>
          </td>
          <ProductDescription>
            <input type="text" />
          </ProductDescription>
        </tr>

        <tr>
          <td>
            <h2>
              연관태그<span>*</span>
            </h2>
          </td>
          <Tag>
            <input
              type="text"
              placeholder="연관태그를 입력해주세요. (최대 5개)"
            />
            <ul>
              <li>
                태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있습니다.
              </li>
              <li>
                태그는 검색의 부가정보로 사용 되지만, 검색 결과 노출을
                보장하지는 않습니다.
              </li>
              <li>검색 광고는 태그정보를 기준으로 노출됩니다.</li>
              <li>
                상품과 직접 관련이 없는 다른 상품명, 브랜드, 스팸성 키워드 등을
                입력하면 노출이 중단되거나 상품이 삭제될 수 있습니다.
              </li>
            </ul>
          </Tag>
        </tr>

        <tr>
          <td>
            <h2>
              수량<span>*</span>
            </h2>
          </td>
          <ProductQuantity>
            <input type="text" className="quantity" value="1" />
            &nbsp;&nbsp;&nbsp;개
          </ProductQuantity>
        </tr>
      </InputSection>

      <button>등록하기</button>
    </Container>
  );
};

export default withRouter(ProductNewPage);
