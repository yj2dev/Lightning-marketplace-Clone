import { Container } from "./styled.js";

const ShopProductsPage = ({ products }) => {
  return (
    <Container>
      {products &&
        products.map((product) => (
          <>
            {product.thumbnailImgURL} <br />
          </>
        ))}
    </Container>
  );
};

export default ShopProductsPage;
