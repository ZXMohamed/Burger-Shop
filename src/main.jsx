import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MenuProvider from "./menu/menuProvider";
import { LanguageProvider } from "./language/languageProvider";
import App from "./App";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <MenuProvider>
        <App />
      </MenuProvider>
    </LanguageProvider>
  </StrictMode>
)
