import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

import "./Cart.css";

function Cart({ cart, setCart }) {
  return (
    <div>
      <div className="cart-items-container">
        {cart.map((theCart) => {
          return (
            <Card style={{ width: "18rem" }} key={theCart.id}>
              <Card.Img variant="top" src={theCart.thumbnailUrl} />
              <Card.Body>
                <Card.Title>{theCart.title}</Card.Title>
                <Card.Text>
                  <b>${theCart.price.toFixed(2)}</b>
                </Card.Text>
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    setCart(cart.filter((c) => {
                      return c.id !== theCart.id;
                    }));
                  }}
                >
                  Remove from Cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
      <h4>Items: {cart.length} items - Total Price: ${cart.reduce((prev,cart)=>{return prev + cart.price},0).toFixed(2)}</h4>
    <button className="btn btn-warning">Checkout</button>
    </div>
  );
}

export default Cart;
