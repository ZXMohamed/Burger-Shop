import { useEffect } from "react";
import { ToastContainer } from "react-toastify";

import SEO from "./components/SEO/SEO.jsx";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollFollow from "./components/scrollFollow/scrollFollow.jsx";
import Routes from "./routes/routes";

import "./styles/theme.css";
import "./styles/page.scss";
import "./styles/scrollFollow.scss";
import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/themeToggler.scss";
import "./styles/loading.scss";
import "./styles/alertError.scss";
import "./styles/hero.scss";
import "./styles/menu.scss";
import "./styles/founder.scss";

// import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import i18n from "./language/i18n.js";
import { detectLanguage } from "./language/utils/detectLanguage.js";
import { useCurrentCurrency } from "./state/currentCurrency.js";

//*them will run when call useTheme() in theme toggler component

function App() {

  //*prepare currency and language

  const detectCurrentCurrency = useCurrentCurrency((state) => state.detect);
  
  useEffect(() => {
    //*detect user preferred language after hydration (finish)
    i18n.changeLanguage(detectLanguage());

    //*detect user currency from The Browser or client IP
    detectCurrentCurrency();
  }, []);

  return (
    <>
      <SEO/>
      <Header />
      <ToastContainer />
      <ScrollFollow>
        <Routes/>
      </ScrollFollow>
      <Footer />
    </>
  );
}

export default App;