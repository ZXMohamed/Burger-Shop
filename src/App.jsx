import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";

import "./styles/page.scss";
import "./styles/scrollFollow.scss";
import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/loading.scss";
import "./styles/alertError.scss";
import "./styles/hero.scss";
import "./styles/menu.scss";
import "./styles/founder.scss";

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import './language/i18n.js';
import { useCurrentCurrency } from "./state/currentCurrency.js";
import ScrollFollow from "./components/scrollFollow/scrollFollow.jsx";


function App() {

  //*detect user currency from The Browser or IP
  const detectCurrentCurrency = useCurrentCurrency((state) => state.detect);
  useEffect(() => {
    detectCurrentCurrency();
  }, []);

  return (
    <Router>
      <Header />
      <ToastContainer />
      <ScrollFollow>
        <Routes>
          <Route path="/" exact element={ <Home/> } />
          <Route path="/about" element={ <>about</> } />

          <Route path="/cart" element={ <><Outlet/></> }>
            <Route index element={ <>cart</> } />
            <Route path="shipping" element={ <>shipping</> } />
          </Route>
          
          <Route path="/myorders" element={ <><Outlet /></> }>
            <Route index element={ <>myorders</> } />
            <Route path="order/:id" element={<>order</>} />
          </Route>
          
          <Route path="/contact" element={ <>contact</> } />
          <Route path="*" element={<>notFound</>} />
        </Routes>
      </ScrollFollow>
      <Footer />
    </Router>
  );
}

export default App;