import { Outlet } from 'react-router';

import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

import './Layout.css';

function Layout({ tab, setTab, product,  cart,setToken,role  }) {
  return (<div>
    <Header />
    <Navbar tab={tab} setTab={setTab} product={product} cart={cart} setToken={setToken} role={role} />
    <Outlet />
    <Footer />
  </div>);
}

export default Layout;