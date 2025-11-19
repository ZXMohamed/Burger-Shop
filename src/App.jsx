import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MyOrders from "./components/myOrders/MyOrders";

import { ToastContainer } from "react-toastify";

import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/myorders.scss";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import OrderWrapper from "./components/templates/orderWrapper";


function App() {
  
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
        
        <Route path="/myorders" element={ <OrderWrapper/> }>
          <Route index element={ <MyOrders /> } />
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