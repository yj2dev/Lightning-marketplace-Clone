import { ProductLargeCategory } from "../../data/ProductCategory";
import { Container, Content1, SideMenu } from "./styled";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useRef, useState } from "react";

const CategoryMenu = () => {
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const onHoverMenuButton = () => {
    console.log("hover Menu");
    setShowCategoryMenu(true);
  };

  const onHoverMenuContent = () => {
    console.log("hover Menu");
    setShowCategoryMenu(true);
  };

  const onCloseCategoryMenu = () => {
    console.log("Close");
    setShowCategoryMenu(false);
  };

  const onToggleMenu = () => {
    setShowCategoryMenu((prev) => !prev);
  };
  return (
    <Container>
      <SideMenu onClick={onToggleMenu} className="cursor_pointer">
        <GiHamburgerMenu />
      </SideMenu>

      {showCategoryMenu && (
        <Content1
          className="product_category"
          onHoverMouse={onHoverMenuContent}
        >
          <ui>
            <li>전체 카테고리</li>
            {ProductLargeCategory &&
              ProductLargeCategory.map((v) => <li>{v}</li>)}
          </ui>
        </Content1>
      )}
    </Container>
  );
};

export default CategoryMenu;
