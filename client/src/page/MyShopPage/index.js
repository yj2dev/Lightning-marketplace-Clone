import {
  Container,
  TabContent,
  TabMenu,
  EditProfileMenu,
  UserStore,
  UserStoreContents,
} from "./styled";
import React, { useEffect, useRef, useState } from "react";
import { Link, Route, Switch, useLocation, withRouter } from "react-router-dom";
import { AiFillShop } from "react-icons/ai";
import { GrEdit } from "react-icons/gr";

import { RiMessage3Line } from "react-icons/ri";
import { BsPersonCheckFill, BsPersonPlus } from "react-icons/bs";

import { useSelector } from "react-redux";
import ShopProductsPage from "./Section/ShopProductsPage";
import ShopCommentsPage from "./Section/ShopCommentsPage";
import ShopFavoritesPage from "./Section/ShopFavoritesPage";
import ShopReviewsPage from "./Section/ShopReviewsPage";
import ShopFollowingsPage from "./Section/ShopFollowingsPage";
import ShopFollowersPage from "./Section/ShopFollowersPage";
import axios from "axios";
import { oneDaysFormat } from "../../utils/Time";
import Menu from "../../components/Menu";
import AlertModal from "../../components/AlertModal";
import ImageCrop from "../../components/ImageCrop";
import SigninModal from "../../components/SigninModal";

const MyShopPage = ({ history }) => {
  const location = useLocation();
  const userId = getUserId();
  const tabMenuList = [
    "상품",
    "상점문의",
    "찜",
    "상점후기",
    "팔로잉",
    "팔로워",
  ];
  const [tabMenu, setTabMenu] = useState(0);

  const user = useSelector((state) => state.user);

  const [showSigninModal, setShowSigninModal] = useState(false);

  const [storeName, setStoreName] = useState("");
  const [storeDescription, setStoreDescription] = useState("");

  const [editStoreName, setEditStoreName] = useState(false);
  const [editStoreDescription, setEditStoreDescription] = useState(false);

  const [products, setProducts] = useState([]);

  const [showEditMenu, setShowEditMenu] = useState(false);

  const [showResetModal, setShowResetModal] = useState(false);
  const [showCropImageModal, setShowCropImageModal] = useState(false);

  const [userInfo, setUserInfo] = useState({});
  const [isMyStore, setIsMyStore] = useState(false);

  // 해당 상점 팔로우 여부
  const [isFollow, setIsFollow] = useState(false);

  const onCloseEditMenu = () => {
    setShowEditMenu(false);
  };

  const onClickTabMenu = (e) => {
    const tabIndex = e.target.value;
    setTabMenu(tabIndex);
  };

  const onChangeStoreName = (e) => {
    if (e.target.value.length < 16) setStoreName(e.target.value);
  };
  const onChangeStoreDescription = (e) => {
    if (e.target.value.length < 250) setStoreDescription(e.target.value);
  };

  // 응답 후 상태 업데이트
  function setResState() {
    const userId = getUserId();
    history.push(`/shop/${userId}`);
  }

  function getUserId() {
    const path = location.pathname.split("/");
    return path[2] ? path[2] : null;
  }

  function getUserDetail(userId) {
    axios
      .get(`/user/detail/${userId}`)
      .then((res) => {
        console.log("res detail >> ", res);
        setUserInfo(res.data.data);
        setProducts(res.data.data.products);
        const myStore = user.isSignin.data._id === userId ? true : false;
        // console.log("myStore >> ", myStore);
        setIsMyStore(myStore);
      })
      .catch((err) => {
        console.log("err detail >> ", err);
      });
  }

  function getIsFollow(userId) {
    axios
      .get(`/follow/${userId}/exist`)
      .then((res) => {
        console.log("res follow >> ", res);

        if (res.data.data) setIsFollow(true);
        else setIsFollow(false);
      })
      .catch((err) => {
        console.log("err follow >> ", err);
      });
  }

  useEffect(() => {
    const userId = getUserId();
    getUserDetail(userId);
    getIsFollow(userId);
  }, []);

  // 상점명 변경
  const onSubmitStoreName = () => {
    // 변경할 상점명을 입력하지 않았을 때(공백 제거 후)
    if (storeName.trim() === "") return;

    // 변경할 상점명이 기존의 상점명과 동일할 때
    if (storeName === user.isSignin.data.storeName) {
      setEditStoreName(false);
      return;
    }

    axios
      .patch("/user/nickname", { storeName })
      .then((res) => {
        console.log("res >> ", res);

        // 상점명 변경 성공
        setEditStoreName(false);
        setResState();
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  };

  const onSubmitStoreDescription = () => {
    if (storeDescription === "") return;

    axios
      .patch("/user/description", { description: storeDescription })
      .then((res) => {
        console.log("res >> ", res);
        // 상점 소개글 변경 성공
        setResState();
        setEditStoreDescription(false);
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  };

  const resetProfileImage = () => {
    axios
      .patch("/user/profile/reset")
      .then((res) => {
        console.log("res >> ", res);

        // 프로필 이미지 초기화 성공
        if (res.data.success) {
          history.push(`/shop/${user.isSignin.data._id}`);
        }
      })
      .catch((err) => {
        console.log("err >> ", err);
      });
  };

  const onClickEditStoreName = () => {
    setStoreName(userInfo.storeName);
    setEditStoreName((prev) => !prev);
  };

  const onClickEditStoreDescription = () => {
    setStoreDescription(userInfo.description);
    setEditStoreDescription((prev) => !prev);
  };

  const onClickMyStoreManagement = () => {
    history.push("/product/manage");
  };

  const onClickStoreFollow = () => {
    if (!user.isSignin) {
      setShowSigninModal(true);
      return;
    }

    const userId = getUserId();

    axios
      .post(`/user/follow/${userId}`)
      .then((res) => {
        console.log("res >> ", res);

        if (res.data.data) setIsFollow(true);
        else setIsFollow(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickStoreTalk = () => {
    if (!user.isSignin) {
      setShowSigninModal(true);
      return;
    }
  };

  return (
    <Container>
      <UserStore>
        <div className="imgWrapper">
          <div className="background_img_wrapper">
            <img
              className="background_img"
              src={userInfo && `${userInfo.profileURL}`}
            />
            <Menu show={showEditMenu} close={onCloseEditMenu}>
              <EditProfileMenu>
                <ul>
                  <li onClick={() => setShowResetModal(true)}>
                    기본 이미지로 초기화
                  </li>
                  <li onClick={() => setShowCropImageModal(true)}>
                    프로필 이미지 변경
                  </li>
                </ul>
              </EditProfileMenu>
            </Menu>
          </div>
          <div className="background_img_cover"></div>
          <img
            className="profile_img"
            src={userInfo && `${userInfo.profileURL}`}
          />
          <div className="store_name">
            {userInfo && `${userInfo.storeName}`}
          </div>
          {isMyStore && (
            <span
              className="edit_profile_img"
              onClick={() => setShowEditMenu((prev) => !prev)}
            >
              <GrEdit
                size={16}
                style={{ color: "#000000", marginRight: "4px" }}
              />
              수정
            </span>
          )}

          {isMyStore ? (
            <div
              className="store_management"
              onClick={onClickMyStoreManagement}
            >
              내 상점 관리
            </div>
          ) : (
            <>
              <div
                className={
                  isFollow ? "store_follow active_follow" : "store_follow"
                }
                onClick={onClickStoreFollow}
              >
                {isFollow ? (
                  <>
                    <BsPersonCheckFill size={18} />
                    &nbsp;언팔로우
                  </>
                ) : (
                  <>
                    <BsPersonPlus size={18} />
                    &nbsp;팔로우
                  </>
                )}
              </div>
              <div className="store_talk" onClick={onClickStoreTalk}>
                <RiMessage3Line size={18} />
                &nbsp;벼락톡
              </div>
            </>
          )}
        </div>
        <UserStoreContents>
          <div className="contents_store_name">
            {!editStoreName ? (
              <>
                {userInfo && `${userInfo.storeName}`}
                &nbsp;&nbsp;
                {isMyStore && (
                  <button onClick={onClickEditStoreName}>상점명 수정</button>
                )}
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
            <span>{userInfo && oneDaysFormat(userInfo.createdAt)}</span>
          </div>
          <div className="contents_store_desc">
            {!editStoreDescription ? (
              <>
                {userInfo &&
                  userInfo.description &&
                  userInfo.description.split("\n").map((line) => (
                    <>
                      {line} <br />
                    </>
                  ))}
              </>
            ) : (
              <>
                <textarea
                  value={storeDescription}
                  onChange={onChangeStoreDescription}
                ></textarea>
                <button
                  className="store_desc_submit_btn"
                  onClick={onSubmitStoreDescription}
                >
                  확인
                </button>
              </>
            )}
          </div>
          {!editStoreDescription && isMyStore && (
            <button onClick={onClickEditStoreDescription}>소개글 수정</button>
          )}
        </UserStoreContents>
      </UserStore>
      <TabMenu>
        <ul>
          {tabMenuList &&
            tabMenuList.map((menu, index) => (
              <>
                {isMyStore ? (
                  <li
                    className={tabMenu === index && "active"}
                    onClick={onClickTabMenu}
                    value={index}
                  >
                    {menu}
                  </li>
                ) : (
                  index !== 2 && (
                    <li
                      className={tabMenu === index && "active"}
                      onClick={onClickTabMenu}
                      value={index}
                    >
                      {menu}
                    </li>
                  )
                )}
              </>
            ))}
        </ul>
      </TabMenu>
      <TabContent>
        {tabMenu === 0 && <ShopProductsPage products={products} />}
        {tabMenu === 1 && <ShopCommentsPage shopId={userId} />}
        {tabMenu === 2 && <ShopFavoritesPage />}
        {tabMenu === 3 && <ShopReviewsPage shopId={userId} />}
        {tabMenu === 4 && <ShopFollowingsPage userId={userId} />}
        {tabMenu === 5 && <ShopFollowersPage userId={userId} />}
      </TabContent>
      <AlertModal
        useCloseButton={false}
        show={showResetModal}
        close={() => setShowResetModal(false)}
        confirm={resetProfileImage}
      >
        프로필 이미지를 초기화 하시겠습니까?
      </AlertModal>
      <ImageCrop
        show={showCropImageModal}
        close={() => setShowCropImageModal(false)}
      ></ImageCrop>
      <SigninModal
        show={showSigninModal}
        close={() => setShowSigninModal(false)}
      ></SigninModal>
    </Container>
  );
};

export default withRouter(MyShopPage);
