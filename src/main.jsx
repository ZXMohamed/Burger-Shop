import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./language/languageProvider";
import MenuProvider from "./menu/menuProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { objectMerge } from "./utils/objectMerge";

objectMerge()

const client = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <QueryClientProvider client={ client }>
        <MenuProvider>
          <App />
        </MenuProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </StrictMode>
)
