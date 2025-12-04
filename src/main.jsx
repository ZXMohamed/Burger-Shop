import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MenuProvider from "./menu/menuProvider";
import { LanguageProvider } from "./language/languageProvider";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

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
      <QueryClientProvider client={client}>
        <MenuProvider>
          <App />
        </MenuProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </StrictMode>
)
