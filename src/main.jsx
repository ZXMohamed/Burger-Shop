import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import MenuProvider from "./menu/menuContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MenuProvider>
      <App />
    </MenuProvider>
  </StrictMode>
)
