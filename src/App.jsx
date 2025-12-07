import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import OrderDetails from "./components/myOrders/OrderDetails";
import OrderWrapper from "./components/templates/orderWrapper";

import { ToastContainer } from "react-toastify";

import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/loading.scss";
import "./styles/orderDetails.scss";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useCurrentCurrency } from "./state/currentCurrency";
import { useEffect } from "react";


function App() {

  const detectCurrentCurrency = useCurrentCurrency((state) => state.detect);
  
  useEffect(() => {
    detectCurrentCurrency();
  },[]);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={ <>main</> } />
        <Route path="/about" element={ <>about</> } />

        <Route path="/cart" element={ <><Outlet/></> }>
          <Route index element={ <>cart</> } />
          <Route path="shipping" element={ <>shipping</> } />
        </Route>
        
        <Route path="/myorders" element={ <OrderWrapper /> }>
          <Route index element={ <>myorders</> } />
          <Route path=":id" element={<OrderDetails />} />
        </Route>
        
        <Route path="/contact" element={ <>contact</> } />
        <Route path="*" element={<>notFound</>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;