import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MenuProvider from "./menu/menuProvider";
import { LanguageProvider } from "./language/languageProvider";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <QueryClientProvider client={client}>
        <MenuProvider>
          <App />
        </MenuProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </StrictMode>
)
