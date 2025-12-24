import React from "react";
import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import { data as menuData } from "../data/menu";
import { isAllInteger } from "../utils/isAllInteger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../language/languageProvider";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "../theme/themeProvider";
import MenuProvider from "../menu/menuProvider";
import i18n from "../language/i18n";
import App from "../App";
import { MemoryRouter } from "react-router";


global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    blob: () => Promise.resolve(new Blob()),
  })
);

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

test("test home page", async() => {
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
    
    const hero = screen.getByTestId("heroTest");
    expect(hero).toBeInTheDocument();

    const menu = screen.getByTestId("menuTest");
    expect(menu).toBeInTheDocument();

    const menuItems = await screen.findAllByRole("menuItem");
    expect(menuItems).toHaveLength(Object.values(menuData(i18n.t)).length);

    Object.values(menuData).forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.price)).toBeInTheDocument();
      expect(screen.getByAltText(item.name)).toHaveAttribute("src",item.photo);
    });
    
    const founder = screen.getByTestId("founderTest");
  expect(founder).toBeInTheDocument();

});