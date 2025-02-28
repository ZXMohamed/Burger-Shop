import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Menu_Provider } from "./menu";
import { Cart_Provider } from "./cart";
import { Orders_Provider } from "./orders";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Menu_Provider>
    <Cart_Provider>
      <Orders_Provider>
        <App />
      </Orders_Provider>
    </Cart_Provider>
  </Menu_Provider>
);
