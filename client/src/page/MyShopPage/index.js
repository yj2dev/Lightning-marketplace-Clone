import { Container, TabContent, TabMenu, UserStore } from "./styled";
import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";

import { useSelector } from "react-redux";
import ShopProductsPage from "./Section/ShopProductsPage";
import ShopCommentsPage from "./Section/ShopCommentsPage";

const MyShopPage = ({ history }) => {
  const tabMenuList = [
    "상품",
    "상품문의",
    "찜",
    "상점후기",
    "팔로잉",
    "팔로워",
  ];
  const [tabMenu, setTabMenu] = useState(0);
  const user = useSelector((state) => state.user);

  const selectTabMenu = useRef("0");

  useEffect(() => {
    setTabMenu(selectTabMenu.current);
    console.log(selectTabMenu.current);
  }, []);
  const onClickTabMenu = (e) => {
    const tabIndex = e.target.value;
    console.log(tabIndex);
    // setTabMenu(tabIndex);
    selectTabMenu.current = tabIndex;
    console.log("user >> ", user);

    console.log("cur >> ", selectTabMenu.current);
    setTabMenu(selectTabMenu.current);

    // return;
    // switch (tabIndex) {
    //   case 0:
    //     history.push(`/shop/${user.isSignin.data._id}/products`);
    //     break;
    //   case 1:
    //     history.push(`/shop/${user.isSignin.data._id}/comments`);
    //     break;
    //   case 2:
    //     history.push(`/shop/${user.isSignin.data._id}/favorites`);
    //     break;
    //   case 3:
    //     history.push(`/shop/${user.isSignin.data._id}/reviews`);
    //     break;
    //   case 4:
    //     history.push(`/shop/${user.isSignin.data._id}/followings`);
    //     break;
    //   case 5:
    //     history.push(`/shop/${user.isSignin.data._id}/followers`);
    //     break;
    //   default:
    //     break;
    // }
  };
  return (
    <Container>
      <UserStore>
        <div className="imgWrapper"></div>
      </UserStore>
      <TabMenu>
        <ul>
          {tabMenuList &&
            tabMenuList.map((menu, index) => (
              <li
                className={tabMenu === index && "active"}
                onClick={onClickTabMenu}
                value={index}
              >
                {menu}
              </li>
            ))}
        </ul>
      </TabMenu>
      <TabContent>{tabMenu === 0 && <ShopProductsPage />}</TabContent>
      <TabContent>{tabMenu === 1 && <ShopCommentsPage />}</TabContent>
      <TabContent>{tabMenu === 2 && <ShopProductsPage />}</TabContent>
      <TabContent>{tabMenu === 3 && <ShopProductsPage />}</TabContent>
      <TabContent>{tabMenu === 4 && <ShopProductsPage />}</TabContent>
    </Container>
  );
};

export default withRouter(MyShopPage);
