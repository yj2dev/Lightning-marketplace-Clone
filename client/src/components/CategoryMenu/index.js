import { ProductCategory1 } from "../../data/ProductCategory";
import { Container, Content1, SideMenu } from "./styled";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const CategoryMenu = () => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const onHoverMenuButton = () => {
    console.log("hover Menu");
    setShowCategoryMenu(true);
  };

  const onHoverMenuContent = () => {
    // console.log("hover Menu");
    // setShowCategoryMenu(true);
  };

  useEffect(() => {
    // const runTime = setTimeout(() => {
    //   console.log("runTime");
    //   setShowCategoryMenu(false);
    setTimeout(() => {
      console.log("runTime");
      //   setShowCategoryMenu(false);
    }, 600);
  }, [showCategoryMenu]);

  const onCloseCategoryMenu = () => {
    // clearTimeout(runTime);
    console.log("onCloseCategoryMenu");
    // runTime;
  };

  return (
    <>
      <SideMenu
        onMouseEnter={() => setShowCategoryMenu(true)}
        onMouseLeave={onCloseCategoryMenu}
        // onMouseLeave={() => {
        //   setTimeout(() => {
        //     setShowCategoryMenu(false);
        //   }, 600);
        // }}
      >
        <GiHamburgerMenu />
      </SideMenu>
      {showCategoryMenu && (
        <Container>
          <Content1
            className="product_category"
            // onHoverMouse={onHoverMenuContent}
          >
            <ui>
              <li>전체 카테고리</li>
              {ProductCategory1 && ProductCategory1.map((v) => <li>{v}</li>)}
            </ui>
          </Content1>
        </Container>
      )}
    </>
  );
};

export default CategoryMenu;
