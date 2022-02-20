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
  SubmitSection,
} from "./styled";

import { AiFillCamera } from "react-icons/ai";
import { HiOutlineBan } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import axios from "axios";
import UploadProductImage from "./Section/UploadProductImage";
import { Route, Switch, useLocation, withRouter } from "react-router-dom";
import {
  ProductLargeCategory,
  ProductMediumCategory,
  ProductSmallCategory,
} from "../../data/ProductCategory";
import DaumPostcode from "react-daum-postcode";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { ProductManagePage } from "../ProductManagePage";
import AlertModal from "../../components/AlertModal";

const ProductNewPage = ({ history }) => {
  const MAX_IMAGE = 12;
  const [productImage, setProductImage] = useState([]);
  const [productImageURL, setProductImageURL] = useState([]);
  const [productImageError, setProductImageError] = useState({
    required: false,
  });

  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState({ minLength: false });
  const [showDeleteTitleButton, setShowDeleteTitleButton] = useState(false);

  const [largeCateogry, setLargeCategory] = useState("");
  const [mediumCategory, setMediumCategory] = useState("");
  const [smallCategory, setSmallCategory] = useState("");
  const [selectCategory, setSelectCategory] = useState({
    large: null,
    medium: null,
    small: null,
  });
  const [selectCategoryError, setSelectCategoryError] = useState({
    required: false,
  });
  const [address, setAddress] = useState("지역설정안함");
  const [showPostcodeModal, setShowPostcodeModal] = useState(false);
  const [newProduct, setNewProduct] = useState(false);
  const [enableExchange, setEnableExchange] = useState(false);
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState({ minPrice: false });
  const [containDeliveryCharge, setContainDeliveryCharge] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState({
    minLength: false,
  });
  const [tagValue, setTagValue] = useState("");
  const [tag, setTag] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(false);

  const onClickDeleteTag = (e) => {
    const tagList = tag;
    tagList.splice(parseInt(e.target.value), 1);
    console.log(e.target.value);
    history.push("/product/new");
  };
  const onChangeTagValue = (e) => {
    const value = e.target.value;

    if (value.length > 9) return;

    setTagValue(e.target.value);
  };

  const onKeySpace = (e) => {
    const tagList = tag;
    const value = "#" + e.target.value.trim();
    if (e.key === " ") {
      if (value === "") {
        setTagValue("");
        return;
      }

      // 태그에 중복된 값이 있으면 아무 작업도 수행안함
      if (tagList.includes(value)) {
        setTagValue("");
        return;
      }

      tagList.push(value);
      setTag(tagList);
      setTagValue("");
    }
    history.push("/product/new");
  };

  const onValidateTotal = () => {
    let validateResult = false;

    // 이미지
    if (productImage.length < 1) {
      setProductImageError({ minLength: true });
      validateResult = true;
    } else {
      setProductImageError({ minLength: false });
    }
    // 제목
    if (title.length < 1) {
      setTitleError({ minLength: true });
      validateResult = true;
    } else {
      setTitleError({ minLength: false });
    }
    // 카테고리
    if (selectCategory.large === null) {
      setSelectCategoryError({ required: true });
      validateResult = true;
    } else {
      setSelectCategoryError({ required: false });
    }
    // 가격
    if (price < 100) {
      setPriceError({ minPrice: true });
      validateResult = true;
    } else {
      setPriceError({ minPrice: false });
    }
    // 설명
    if (description.length < 10) {
      setDescriptionError({ minLength: true });
      validateResult = true;
    } else {
      setDescriptionError({ minLength: false });
    }
    return validateResult;
  };
  const currencyOfInt = (value) => {
    return parseInt(value.replaceAll(",", ""));
  };

  const onSubmitNewProduct = () => {
    // 수량란에 잘못된 값이 들어있으면 변환
    onValidateQuantity();

    // 공란 체크 (에러 발생시 true 반환)
    if (onValidateTotal()) return;

    setLoading(true);

    // 이미지 전송 폼
    const formData = new FormData();

    // 이미지 폼에 등록
    for (let i = 0; i < productImage.length; i++) {
      formData.append("image", productImage[i]);
    }

    // 전송할 데이터
    const payload = {
      title,
      largeCateogry: selectCategory.large,
      mediumCategory: selectCategory.medium,
      smallCategory: selectCategory.small,
      address,
      newProduct,
      enableExchange,
      price: currencyOfInt(price),
      containDeliveryCharge,
      description,
      tag,
      quantity,
    };

    const stringPayload = JSON.stringify(payload);

    // console.log("submit payload >> ", payload);
    // console.log("submit stringPayload >> ", stringPayload);
    // return;

    // 전송할 데이터 폼에 등록
    formData.append("data", stringPayload);

    axios
      .post("/product/upload", formData)
      .then((res) => {
        console.log("product res >> ", res);
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log("product err >> ", err);
      });
  };

  const onValidateQuantity = () => {
    if (quantity === "" || parseInt(quantity) === 0) {
      setQuantity(1);
      return;
    }
    setQuantity(parseInt(quantity));
  };
  const onFocusQuantity = (e) => {
    // 사용안함
    console.log("Focus");
    console.log(e.target.value);
  };

  const onChangeQuantity = (e) => {
    const value = e.target.value;
    const regex = /^[0-9]+$/;
    if (value !== "" && !regex.test(value)) {
      alert("숫자만 입력해 주세요.");
      return;
    }

    if (value.length > 3) return;
    setQuantity(e.target.value);
  };

  const onChangeDescription = (e) => {
    const value = e.target.value;
    if (value !== "" && value.length < 10) {
      setDescriptionError({ minLength: true });
    } else {
      setDescriptionError({ minLength: false });
    }

    if (value.length > 2000) {
      return;
    }

    setDescription(value);
  };

  const onChangePrice = (e) => {
    const value = e.target.value.replaceAll(",", "");

    const regex = /^[0-9]+$/;
    if (value !== "" && !regex.test(value)) {
      alert("숫자만 입력해 주세요.");
      return;
    }

    // 최소 가격 제한 ( 100 ~ )
    if (parseInt(value) < 100) setPriceError({ minPrice: true });
    else setPriceError({ minPrice: false });

    // 최대 가격 제한 ( ~ 999,999,999 )
    if (value.length > 9) {
      return;
    }
    const KRValue = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    setPrice(KRValue);
  };

  const onSelectLargeCategory = (e) => {
    setSelectCategoryError({ required: false });

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

  const onChangeImage = (e) => {
    console.log(e.target.files);
    const files = e.target.files;
    if (productImage.length < 1) {
      setProductImageError({ required: true });
    } else {
      setProductImageError({ required: false });
    }

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
    // imageList.current.v;
  };

  const imageList = useRef();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    // 로그인이 안된 유저가 해당 페이지 접근시 랜딩페이지로 이동
    if (!user.isSignin) {
      history.push("/");
    }
  }, []);

  const onDeleteTitleValue = () => {
    setTitle("");
    setShowDeleteTitleButton(false);
  };
  const onChangeTitle = (e) => {
    const value = e.target.value;

    if (value.length > 40) {
      return;
    }

    if (value === "") setShowDeleteTitleButton(false);
    else setShowDeleteTitleButton(true);

    setTitle(value);

    if (value.length <= 2) setTitleError({ minLength: true });
    else setTitleError({ minLength: false });
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
        <li
          onClick={() => history.push("/product/new")}
          className="active_menu"
        >
          상품등록
        </li>
        <li onClick={() => history.push("/product/manage")}>상품관리</li>
        {/*<li>구매/판매 내역</li>*/}
      </ul>

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
            <ImgUploadLabel
              className={`cursor_pointer img_upload_label ${
                productImageError.minLength && "error"
              }`}
              for="product_image"
            >
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
            {productImageError.minLength && (
              <ErrorMessage>
                <HiOutlineBan />
                &nbsp;&nbsp;상품 사진을 등록해주세요.
              </ErrorMessage>
            )}
            <ProductImgSection ref={imageList}>
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
              id={titleError.minLength && "error"}
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
            {title.length}/40
            {titleError.minLength && (
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
                  <td id={selectCategoryError.required && "error"}>
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
                  <td id={selectCategoryError.required && "error"}>
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
                  <td id={selectCategoryError.required && "error"}>
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
            {selectCategoryError.required && (
              <ErrorMessage>
                <HiOutlineBan />
                &nbsp;&nbsp;대분류 카테고리를 선택해주세요.
              </ErrorMessage>
            )}
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
            <AlertModal
              show={showPostcodeModal}
              close={onClosePostcodeModal}
              useCancelButton={false}
              useSubmitButton={false}
              useCloseButton={false}
              style={{ width: "450px" }}
            >
              <DaumPostcode onComplete={handleComplete} />
            </AlertModal>
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
              name="newProduct"
              onClick={() => setNewProduct((prev) => !prev)}
              value="중고상품"
              checked={!newProduct}
            />
            <label htmlFor="used_product">중고상품</label>
            <input
              type="radio"
              id="new_product"
              name="newProduct"
              onClick={() => setNewProduct((prev) => !prev)}
              value="새상품"
              checked={newProduct}
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
              id="enableExchange_disable"
              name="product_enableExchange"
              onClick={() => setEnableExchange((prev) => !prev)}
              value="교환불가"
              checked={!enableExchange}
            />
            <label htmlFor="enableExchange_disable">교환불가</label>
            <input
              type="radio"
              id="enableExchange_enable"
              name="product_enableExchange"
              onClick={() => setEnableExchange((prev) => !prev)}
              value="교환가능"
              checked={enableExchange}
            />
            <label htmlFor="enableExchange_enable">교환가능</label>
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
                checked={containDeliveryCharge}
                onClick={() => setContainDeliveryCharge((prev) => !prev)}
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
            <textarea
              placeholder="상품 설명을 입력해주세요. (10글자 이상)"
              value={description}
              onChange={onChangeDescription}
            />
            {descriptionError.minLength && (
              <ErrorMessage>
                <HiOutlineBan />
                &nbsp;&nbsp;상품 설명을 10글자 이상 입력해주세요.
              </ErrorMessage>
            )}
            <span className="description_length">
              {description.length}/2000
            </span>
            <span className="warning">
              혹시 <u>카카오톡 ID</u>를 적으셨나요?
            </span>
          </ProductDescription>
        </tr>

        <tr>
          <td>
            <h2>연관태그</h2>
          </td>
          <Tag>
            <div className="input_wrapper">
              {tag &&
                tag.map((v, i) => (
                  <div className="tag_item">
                    {v}
                    <button
                      value={i}
                      onClick={onClickDeleteTag}
                      className="tag_del"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              {tag.length < 5 && (
                <input
                  type="text"
                  placeholder="연관태그를 입력해주세요. (최대 5개)"
                  value={tagValue}
                  onChange={onChangeTagValue}
                  onKeyPress={onKeySpace}
                />
              )}
            </div>
            <ul className="cursor_none">
              <li>
                - 태그는 띄어쓰기로 구분되며 최대 9자까지 입력할 수 있습니다.
              </li>
              <li>
                - 태그는 검색의 부가정보로 사용 되지만, 검색 결과 노출을
                보장하지는 않습니다.
              </li>
              <li>- 검색 광고는 태그정보를 기준으로 노출됩니다.</li>
              <li>
                - 상품과 직접 관련이 없는 다른 상품명, 브랜드, 스팸성 키워드
                등을 입력하면 노출이 중단되거나 상품이 삭제될 수 있습니다.
              </li>
            </ul>
          </Tag>
        </tr>

        <tr>
          <td>
            <h2>수량</h2>
          </td>
          <ProductQuantity>
            <input
              type="text"
              className="quantity"
              value={quantity}
              onChange={onChangeQuantity}
              onFocus={onFocusQuantity}
            />
            &nbsp;&nbsp;&nbsp;개
          </ProductQuantity>
        </tr>
      </InputSection>

      <SubmitSection>
        <button disabled={loading} onClick={onSubmitNewProduct}>
          {!loading && "등록하기"}
          <BeatLoader color="#ffffff" size={10} margin={5} loading={loading} />
        </button>
      </SubmitSection>
    </Container>
  );
};

export default withRouter(ProductNewPage);
