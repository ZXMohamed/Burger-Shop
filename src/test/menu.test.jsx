import { expect, test, vi } from "vitest";
import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";
import { data as menuData } from "../data/menu";
import { isAllInteger } from "../utils/isAllInteger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../language/languageProvider";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "../theme/themeProvider";
import MenuProvider from "../menu/menuProvider";
import i18n from "../language/i18n";
import { MemoryRouter } from "react-router";


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

isAllInteger();

const client = new QueryClient();

test("menu events test", () => {
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
    
    const menuItems = [];
    var cardCount = 0;
    Object.values(menuData(i18n.t)).forEach(async ({ id, name }) => {
        const count = ++cardCount;
        const item = await screen.findByTestId(`menuItemBtnTest${id}`);
        fireEvent.click(item);
        expect(screen.getByTestId("cartIconTest")).toHaveTextContent(count);
        expect(screen.getAllByText("added to cart successfully!")[count-1]).toBeInTheDocument();
        fireEvent.click(item);
        const toastMessage = await screen.findByText(`" ${name} " is already in cart!`);
        expect(toastMessage).toBeInTheDocument();
        expect(screen.getByTestId("cartIconTest")).toHaveTextContent(count);
        menuItems.push(item);
    });
});