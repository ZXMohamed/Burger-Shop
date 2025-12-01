import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CartWrapper from "./components/templates/cartWrapper";
import Shipping from "./components/cart/Shipping";

import { ToastContainer } from "react-toastify";

import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/shipping.scss";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useCurrentCurrency } from "./state/currentCurrency";
import { useEffect } from "react";


function App() {

  const detectCurrentCurrency = useCurrentCurrency((state) => state.detect);
  
  useEffect(() => { 
    detectCurrentCurrency();
  }, []);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={ <>main</> } />
        <Route path="/about" element={ <>about</> } />

        <Route path="/cart" element={ <CartWrapper /> }>
          <Route index element={ <>cart</> } />
          <Route path="shipping" element={ <Shipping /> } />
        </Route>
        
        <Route path="/myorders" element={ <><Outlet /></> }>
          <Route index element={ <>myorders</> } />
          <Route path=":id" element={<>order</>} />
        </Route>
        
        <Route path="/contact" element={ <>contact</> } />
        <Route path="*" element={<>notFound</>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;