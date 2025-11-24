import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./language/languageProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clint = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <QueryClientProvider client={ clint }>
        <App />
      </QueryClientProvider>
    </LanguageProvider>
  </StrictMode>
)
