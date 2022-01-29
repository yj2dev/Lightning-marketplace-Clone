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
} from "./styled";

import { AiFillCamera } from "react-icons/ai";
import { HiOutlineBan } from "react-icons/hi";
import { IoMdCloseCircle } from "react-icons/io";
import { useState } from "react";
import axios from "axios";

const ProductNewPage = () => {
  const [productImage, setProductImage] = useState([]);
  const [productImageURL, setProductImageURL] = useState([]);
  const [productImageCount, setProductImageCount] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState("");
  const [titleLength, setTitleLength] = useState(0);
  const [showDeleteTitleButton, setShowDeleteTitleButton] = useState(false);

  const [smallCategory, setSmallCategory] = useState("");
  const [mediumCategory, setMediumCategory] = useState("");
  const [largeCateogry, setLargeCategory] = useState("");

  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const [exchange, setExchange] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");
  const [quantity, setQuantity] = useState("");

  const imageUpload = (imageArray) => {
    const formData = new FormData();

    for (let i = 0; i < imageArray.length; i++) {
      formData.append("image", imageArray[i]);
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
    const reader = new FileReader();

    const imageDataArray = [];
    const imageURLArray = [];

    for (let i = 0; i < files.length; i++) {
      console.log("for >> ", files[i]);
      imageDataArray.push(e.target.files[i]);
      imageURLArray.push(URL.createObjectURL(e.target.files[i]));
    }

    console.log("imageDataArray >> ", imageDataArray);
    console.log("imageURLArray >> ", imageURLArray);

    setProductImageURL(productImageURL);

    imageUpload(imageDataArray);
  };

  const onClickProductInfo = () => {
    console.log("상품 정보");
    console.log(productImage);
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
              &nbsp;<span className="img_cnt">({productImageCount}/12)</span>
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
              {productImageURL.map((v, i) => (
                <div className="img_wrapper">
                  <span className={!i && "title_image"}></span>
                  <span className="delete_image">
                    <IoMdCloseCircle
                      className="cursor_pointer"
                      size={24}
                      style={{
                        color: "lightgray",
                        opacity: "0.8",
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                      }}
                    />
                  </span>
                  <img src={v} />
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
              className={titleError && "error"}
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
                    <ul>
                      <div className="category_scroll">
                        <li>item1</li>
                        <li>item2</li>
                        <li>item3</li>
                        <li>item4</li>
                        <li>item5</li>
                        <li>item6</li>
                        <li>item7</li>
                        <li>item8</li>
                        <li>item9</li>
                        <li>item10</li>
                        <li>item11</li>
                        <li>item12</li>
                        <li>item13</li>
                        <li>item14</li>
                        <li>item15</li>
                        <li>item16</li>
                        <li>item17</li>
                        <li>item18</li>
                        <li>item19</li>
                        <li>item20</li>
                      </div>
                    </ul>
                  </td>
                  <td>2</td>
                  <td>3</td>
                </tr>
              </table>
            </div>
            <div className="selected_category">
              선택한 카테고리 : <strong>NULL</strong>
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
            <input type="text" />
          </TrandingArea>
        </tr>

        <tr>
          <td>
            <h2>
              상태<span>*</span>
            </h2>
          </td>
          <Status>
            <input type="text" />
          </Status>
        </tr>

        <tr>
          <td>
            <h2>
              교환<span>*</span>
            </h2>
          </td>
          <Exchange>
            <input type="text" />
          </Exchange>
        </tr>

        <tr>
          <td>
            <h2>
              가격<span>*</span>
            </h2>
          </td>
          <Price>
            <input type="text" />
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
            <input type="text" />
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

export default ProductNewPage;
