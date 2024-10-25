import { Link } from "react-router-dom";

import "./Navbar.css";

function Navber({ tab, setTab, product, cart ,setToken,role}) {
  return (
    <div className="navbar-container">
        <Link to={"/home"}>
        <button
          className={
            "btn " + (tab === "home" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("home")}
        >
          Home
        </button>
      </Link>

      <Link to={"/animation"}>
        <button
          className={
            "btn " + (tab === "animation" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("animation")}
        >
          Animation
        </button>
      </Link>


      {role === 'user' &&(
        <Link to={"/calculator"}>
        <button
          className={
            "btn " +
            (tab === "calculator" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("calculator")}
        >
          Calculator
        </button>
      </Link>
      )}
      
      
      <Link to={"/todo"}>
        <button
          className={
            "btn " + (tab === "todo" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("todo")}
        >
          Todo
        </button>
      </Link>

      <Link to={"/components"}>
        <button
          className={
            "btn " + (tab === "components" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("components")}
        >
          Components
        </button>
      </Link>

      <Link to={"/product"}>
        <button
          className={
            "btn " + (tab === "product" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("product")}
        >
          Product({product.length})
        </button>
      </Link>
      <Link to={"/cart"}>
        <button
          className={
            "btn position-relative " + (tab === "cart" ? "btn-primary" : "btn-outline-primary")
          }
          onClick={() => setTab("cart")}
        >
          Cart
          {cart.length > 0 && (<span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cart.length < 10 ? cart.length : "9+"}
            <span class="visually-hidden">unread messages</span>
          </span>)}
        </button>
      </Link>
      <button className="btn btn-outline-danger" onClick={() => setToken("")}>Logout</button>
    </div>
  );
}

export default Navber;
