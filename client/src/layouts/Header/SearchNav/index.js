import {
  Container,
  Content,
  Title,
  SearchInput,
  Sell,
  MyShop,
  LighteningTalk,
  SideMenu,
  SellerCenter,
} from "./styled";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosArrowForward, IoIosClose } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import { MdOutlineSell } from "react-icons/md";
import { BsShop } from "react-icons/bs";
import { RiMessage3Line } from "react-icons/ri";
import { useState } from "react";
import CategoryMenu from "../../../components/CategoryMenu";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import ProductNewPage from "../../../page/ProductNewPage";

const SearchNav = ({ history }) => {
  const [searchValue, setSearchValue] = useState("");
  const [showDeleteSearch, setShowDeleteSearch] = useState(false);

  const onChangeSearchValue = (e) => {
    if (e.target.value !== "") setShowDeleteSearch(true);
    else setShowDeleteSearch(false);

    setSearchValue(e.target.value);
  };
  const onDeleteSearchValue = () => {
    setSearchValue("");
    setShowDeleteSearch(false);
  };

  const onClickHome = (e) => {
    history.push("/");
  };
  const onClickSell = (e) => {
    history.push("/product/new");
  };
  const onClickShop = (e) => {
    history.push("/shop");
  };
  const onClickTalk = (e) => {
    history.push("/talk");
  };

  return (
    <Container>
      <Content>
        <Title id="logo_title" onClick={onClickHome} className="cursor_pointer">
          <BsFillLightningChargeFill
            size={28}
            style={{
              transform: "rotate(-5deg)",
              position: "absolute",
              left: "-32px",
              top: "4px",
            }}
          />
          벼락장터
        </Title>
        {/* Search Section */}
        <SearchInput
          placeholder="상품명, 지역명, @상점명 입력"
          onChange={onChangeSearchValue}
          value={searchValue}
        ></SearchInput>
        <BiSearch
          className="cursor_pointer"
          size={20}
          style={{
            position: "absolute",
            top: "47px",
            left: "655px",
            color: "red",
          }}
        />
        {showDeleteSearch && (
          <IoIosClose
            onClick={onDeleteSearchValue}
            className="cursor_pointer"
            size={28}
            style={{
              position: "absolute",
              top: "42px",
              left: "630px",
              color: "#787878",
            }}
          />
        )}
        {/* End Search Section */}
        {/* Right Nav Section */}
        <Sell className="cursor_pointer" onClick={onClickSell}>
          <span>
            <MdOutlineSell />
          </span>
          판매하기
        </Sell>
        <MyShop className="cursor_pointer" onClick={onClickShop}>
          <span>
            <BsShop />
          </span>
          내상점
        </MyShop>
        <LighteningTalk className="cursor_pointer" onClick={onClickTalk}>
          <span>
            <RiMessage3Line />
          </span>
          번개톡
        </LighteningTalk>
        {/* End Right Nav Section */}
        <CategoryMenu />
        <SellerCenter>
          번개장터 판매자센터
          <IoIosArrowForward style={{ position: "absolute", top: "4px" }} />
        </SellerCenter>
      </Content>
    </Container>
  );
};

export default withRouter(SearchNav);