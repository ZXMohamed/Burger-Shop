import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { LanguageProvider } from "./language/languageProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const clint = new QueryClient();

//*create isAllInteger function on Number class to use it in whole site
//*check if list of numbers are integer
Number.isAllInteger = (...numbers)=> {
    for (const i of [...numbers]) {
        if (!Number.isInteger(i))
          return false;
    }
    return true;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <QueryClientProvider client={ clint }>
        <App />
      </QueryClientProvider>
    </LanguageProvider>
  </StrictMode>
)
