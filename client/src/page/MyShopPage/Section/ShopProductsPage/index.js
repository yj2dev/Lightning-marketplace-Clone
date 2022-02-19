import { Container } from "./styled.js";

const ShopProductsPage = ({ products }) => {
  return (
    <Container>
      {products &&
        products.map((product) => (
          <div>
            <div>{product.thumbnailImgURL}</div>
            <img width="200px" src={product.thumbnailImgURL} />
            {/*<br />*/}
          </div>
        ))}
    </Container>
  );
};

export default ShopProductsPage;
