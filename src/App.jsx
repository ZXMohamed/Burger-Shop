import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router";

import { useCurrentCurrency } from "./state/currentCurrency";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Cart from "./components/cart/Cart";
import CartWrapper from "./components/templates/cartWrapper";

import { ToastContainer } from "react-toastify";

import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/loading.scss";
import "./styles/cart.scss";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";


function App() {

  const detectCurrentCurrency = useCurrentCurrency((state) => state.detect );
  
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
          <Route index element={ <Cart/> } />
          <Route path="shipping" element={ <>shipping</> } />
        </Route>
        
        <Route path="/myorders" element={ <><Outlet /></> }>
          <Route index element={ <>myorders</> } />
          <Route path="order/:id" element={<>order</>} />
        </Route>
        
        <Route path="/contact" element={ <>contact</> } />
        <Route path="*" element={<>notFound</>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;