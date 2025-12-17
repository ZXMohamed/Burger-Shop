import React, { StrictMode } from "react";
import { BrowserRouter } from "react-router";
import { hydrateRoot } from "react-dom/client";
import MenuProvider from "./menu/menuProvider";
import { LanguageProvider } from "./language/languageProvider";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./theme/themeProvider";
import { isAllInteger } from "./utils/isAllInteger";
import { HelmetProvider } from "react-helmet-async";
import i18n from './language/i18n.js';

//*match server language for successful hydration match process 
const data = JSON.parse(document.getElementById("serverDataJson").textContent);
i18n.changeLanguage(data.language);

isAllInteger()

const client = new QueryClient();

hydrateRoot(document.getElementById('root'),
  <StrictMode>
    <LanguageProvider>
      <HelmetProvider>
        <ThemeProvider>
          <QueryClientProvider client={ client }>
            <MenuProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </MenuProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </LanguageProvider>
  </StrictMode>
);
