import { Container } from "./styled.js";
import {
  Product,
  ProductContents,
  ProductSection,
} from "../../../LandingPage/styled";
import { Link } from "react-router-dom";
import { intOfKr } from "../../../../utils/Currency";
import { daysFormat } from "../../../../utils/Time";

const ShopProductsPage = ({ products }) => {
  return (
    <Container>
      <h3>
        상품&nbsp;<span style={{ color: "red" }}>{products.length}</span>
      </h3>
      <hr />
      <ProductSection>
        {products &&
          products.map((product) => (
            <>
              <Link to={`/product/${product._id}`}>
                <Product>
                  <div className="img_wrapper">
                    <img
                      width={190}
                      src={product.thumbnailImgURL}
                      alt={product.title}
                    />
                  </div>
                  <ProductContents>
                    <div className="title">{product.title}</div>
                    <div className="price">
                      {intOfKr(product.price)} <span>원</span>
                    </div>
                    <div className="time">{daysFormat(product.createdAt)}</div>
                  </ProductContents>
                </Product>
              </Link>
            </>
          ))}
      </ProductSection>
    </Container>
  );
};

export default ShopProductsPage;
