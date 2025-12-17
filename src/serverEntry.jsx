import React from "react";
import { renderToString } from "react-dom/server";
import MenuProvider from "./menu/menuProvider";
import { LanguageProvider } from "./language/languageProvider";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./theme/themeProvider";
import { isAllInteger } from "./utils/isAllInteger";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import i18n from "./language/i18n";
import { objectMerge } from "./utils/objectMerge";


function renderInServer(url, language) {

    i18n.changeLanguage(language);

    objectMerge()
    isAllInteger()

    const client = new QueryClient();
    
    const helmetContext = {};

    const html = renderToString(
        <LanguageProvider>
            <HelmetProvider context={ helmetContext }>
                <ThemeProvider>
                    <QueryClientProvider client={ client }>
                        <MenuProvider>
                            <StaticRouter location={ url }>
                                <App />
                            </StaticRouter>
                        </MenuProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </HelmetProvider>
        </LanguageProvider>
    );

    return { html, helmet: helmetContext.helmet };
}

export default renderInServer;