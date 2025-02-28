import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Contact from "./components/contact/Contact";
import Cart from "./components/cart/Cart";

import Shipping from "./components/cart/Shipping";
import MyOrders from "./components/myOrders/MyOrders";

import OrderDetails from "./components/myOrders/OrderDetails";
import About from "./components/about/About";

import { ToastContainer } from "react-toastify";


import "./styles/app.scss";
import "./styles/header.scss";
import "./styles/home.scss";
import "./styles/founder.scss";
import "./styles/menu.scss";
import "./styles/footer.scss";
import "./styles/contact.scss";
import "./styles/cart.scss";
import "./styles/shipping.scss";
import "./styles/login.scss";
import "./styles/profile.scss";
import "./styles/table.scss";
import "./styles/orderDetails.scss";
import "./styles/about.scss";


function App() {
  
  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/shipping" element={ <Shipping /> } />
        <Route path="/myorders" element={ <MyOrders /> } />
        <Route path="/order/:id" element={<OrderDetails  />} />
        <Route path="*" element={ <Notfound /> } />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


function Notfound() { 
  return(<h1 style={{width:"99vw",height:"90vh",textAlign:"center",paddingTop:"100px"}}>Not Found!</h1>)
}