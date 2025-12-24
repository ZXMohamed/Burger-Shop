import React from "react";
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from "../App";
import { isAllInteger } from "../utils/isAllInteger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../language/languageProvider";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "../theme/themeProvider";
import MenuProvider from "../menu/menuProvider";
import i18n from "../language/i18n";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { data as menuData } from "../data/menu";


global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    blob: () => Promise.resolve(new Blob()),
  })
);

vi.mock(import("country-state-city"), async (importOriginal) => {
    const actual = await importOriginal()
  return {
    ...actual,
    getCountryByCode: vi.fn(() => ({
      currency: "USD",
    })),
  }
});

vi.mock("../state/currency", () => ({
  useCurrency: vi.fn(() => ({
    data: { rates: { USD: 1, EGP: 0.50 } },
    isFetching: false,
    isSuccess: true,
    isError: false,
  })),
}));

isAllInteger();

const client = new QueryClient();

test("test page layout", async() => { 
    
    render(
      <LanguageProvider>
        <HelmetProvider>
          <ThemeProvider>
            <QueryClientProvider client={client}>
              <MenuProvider>
                <MemoryRouter initialEntries={ ['/'] }>
                  <App />
                </MemoryRouter>
              </MenuProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LanguageProvider>
    );
    
    const header = screen.getByTestId("headerTest");
    expect(header).toBeInTheDocument();
    expect(screen.getByText("home")).toBeInTheDocument();
    expect(screen.getByText("contact")).toBeInTheDocument();
    expect(screen.getByText("orders")).toBeInTheDocument();
    expect(screen.getByText("about")).toBeInTheDocument();
    expect(await screen.findByTestId("cartIconTest")).toBeInTheDocument();
    expect(screen.getByTestId("cartIconTest")).toHaveTextContent("0");

    expect(screen.getByTestId("themeToggleTest")).toBeInTheDocument();
    expect(screen.getByTestId("languageSelectTest")).toBeInTheDocument();
    expect(screen.getByTestId("currencySelectTest")).toBeInTheDocument();

    const footer = screen.getByTestId("footerTest");
    expect(footer).toBeInTheDocument();

});


// test("test currency change", async () => {
  
//   render(
//     <LanguageProvider>
//       <HelmetProvider>
//         <ThemeProvider>
//           <QueryClientProvider client={client}>
//             <MenuProvider>
//               <MemoryRouter initialEntries={ ['/'] }>
//                 <App />
//               </MemoryRouter>
//             </MenuProvider>
//           </QueryClientProvider>
//         </ThemeProvider>
//       </HelmetProvider>
//     </LanguageProvider>
//   );
  
// console.log(screen.getAllByRole("menuItem")[0].innerHTML);
  
//   const menuItem_1_Price_USD = Object.values(menuData(i18n.t))[0].price;
//   // expect(await screen.findByText(menuItem_1_Price_USD)).toBeInTheDocument();
//   expect((await screen.findByTestId("jj")).getAttribute("to")).toBe(menuItem_1_Price_USD.toString());
  
//   const currencySelect = screen.getByTestId("currencySelectTest");
//   userEvent.selectOptions(currencySelect, "EGP");

//   const menuItem_1_Price_EGP = 106.13;
//   expect(await screen.findByText(menuItem_1_Price_EGP)).toBeInTheDocument();
  
// });

test("test language change", async () => {
    
  render(
    <LanguageProvider>
      <HelmetProvider>
        <ThemeProvider>
          <QueryClientProvider client={client}>
            <MenuProvider>
              <MemoryRouter initialEntries={ ['/'] }>
                <App />
              </MemoryRouter>
            </MenuProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </LanguageProvider>
  );
  
  const languageSelect = screen.getByTestId("languageSelectTest");

  userEvent.selectOptions(languageSelect, "en");

  const menuItem_1_Name_EN = Object.values(menuData(i18n.t))[0].name;
  
  expect(await screen.findByText(menuItem_1_Name_EN)).toBeInTheDocument();
  
  userEvent.selectOptions(languageSelect, "ar");
  
  
  const menuItem_1_Name_ar = Object.values(menuData(i18n.t))[0].name;
  expect(await screen.findByText(menuItem_1_Name_ar)).toBeInTheDocument();
  
});
