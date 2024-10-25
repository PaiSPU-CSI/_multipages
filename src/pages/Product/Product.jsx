import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Product.css";

function Product({ product, cart, setCart }) {
  return (
    <div className="product-container">
      <div className="product-items-container">
        {product.map((theProduct) => {
          return (
            <Card style={{ width: "18rem" }} key={theProduct.id}>
              <Card.Img variant="top" src={theProduct.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{theProduct.title}</Card.Title>
                <Card.Text>
                  <b>${theProduct.price.toFixed(2)}</b>
                </Card.Text>
                {cart.find((theCart) => {
                  return theCart.id === theProduct.id;
                }) ? (
                  <span className="badge bg-danger">Added</span>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() => {
                      setCart([...cart, theProduct]);
                    }}
                  >
                    Add to Cart
                  </Button>
                )}
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
