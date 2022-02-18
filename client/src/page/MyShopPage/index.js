import {
  Container,
  TabContent,
  TabMenu,
  UserStore,
  UserStoreContents,
} from "./styled";
import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Switch, withRouter } from "react-router-dom";
import { AiFillShop } from "react-icons/ai";

import { useSelector } from "react-redux";
import ShopProductsPage from "./Section/ShopProductsPage";
import ShopCommentsPage from "./Section/ShopCommentsPage";
import ShopFavoritesPage from "./Section/ShopFavoritesPage";
import ShopReviewsPage from "./Section/ShopReviewsPage";
import ShopFollowingsPage from "./Section/ShopFollowingsPage";
import ShopFollowersPage from "./Section/ShopFollowersPage";
import axios from "axios";
import { oneDaysFormat } from "../../utils/Time";

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
  const [tabMenuName, setTabMenuName] = useState("상품");

  const user = useSelector((state) => state.user);
  const [store, setStore] = useState({});

  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("상점 설명입니다.");

  const [editStoreName, setEditStoreName] = useState(false);
  const [editStoreDescription, setEditStoreDescription] = useState(false);

  const onClickTabMenu = (e) => {
    const tabIndex = e.target.value;
    setTabMenu(tabIndex);
    setTabMenuName(tabMenuList[parseInt(tabIndex)]);
  };

  const onChangeStoreName = (e) => {
    if (e.target.value.length < 16) setStoreName(e.target.value);
  };
  const onChangeStoreDescription = (e) => {
    if (e.target.value.length < 16) setStoreDescription(e.target.value);
  };

  useEffect(() => {
    console.log("user >> ", user);
    setStore(user.isSignin.data);
    setStoreName(user.isSignin.data.storeName);
    // setStoreDescription(user.isSignin.data.description);
    //   axios
    //     .post("/product/upload")
    //     .then((res) => {
    //       console.log("product res >> ", res);
    //       history.push("/");
    //     })
    //     .catch((err) => {
    //       console.log("product err >> ", err);
    //     });
  }, []);
  const onSubmitStoreName = () => {
    if (storeName === "") return;
    setEditStoreName(false);
  };
  const onSubmitStoreDescription = () => {
    if (storeDescription === "") return;
  };

  return (
    <Container>
      <UserStore>
        <div className="imgWrapper">
          <img className="background_img" src={`${store.profileURL}`} />
          <div className="background_img_wrapper"></div>
          <img className="profile_img" src={`${store.profileURL}`} />
          <div className="store_name">{store.storeName}</div>
          <div className="store_management">내 상점 관리</div>
        </div>
        <UserStoreContents>
          <div className="contents_store_name">
            {!editStoreName ? (
              <>
                {store.storeName}&nbsp;&nbsp;
                <button onClick={(e) => setEditStoreName((prev) => !prev)}>
                  상점명 수정
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={storeName}
                  onChange={onChangeStoreName}
                />
                <button
                  className="store_name_submit_btn"
                  onClick={onSubmitStoreName}
                >
                  확인
                </button>
              </>
            )}
          </div>
          <div className="badge">
            <span className="icon">
              <AiFillShop />
              &nbsp;&nbsp;
            </span>
            상점오픈일&nbsp;
            <span>{oneDaysFormat(store.createdAt)}</span>
          </div>
          <div className="contents_store_desc">
            {!editStoreDescription ? (
              <>설명예시</>
            ) : (
              <>
                <textarea
                  value={storeDescription}
                  onChange={onChangeStoreDescription}
                ></textarea>
                <button
                  className="store_desc_submit_btn"
                  onClick={() => setEditStoreDescription((prev) => !prev)}
                >
                  확인
                </button>
              </>
            )}
          </div>
          {!editStoreDescription && (
            <button onClick={() => setEditStoreDescription((prev) => !prev)}>
              소개글 수정
            </button>
          )}
        </UserStoreContents>
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
      <TabContent>
        <h3>{tabMenuName}</h3>
        <hr />
        {tabMenu === 0 && <ShopProductsPage />}
        {tabMenu === 1 && <ShopCommentsPage />}
        {tabMenu === 2 && <ShopFavoritesPage />}
        {tabMenu === 3 && <ShopReviewsPage />}
        {tabMenu === 4 && <ShopFollowingsPage />}
        {tabMenu === 5 && <ShopFollowersPage />}
      </TabContent>
    </Container>
  );
};

export default withRouter(MyShopPage);
