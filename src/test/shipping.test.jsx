import { act, render, screen, waitFor } from"@testing-library/react";
import { expect, test, vi } from"vitest";
import { useCart } from "../state/cart";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { isAllInteger } from "../utils/isAllInteger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { objectMerge } from "../utils/objectMerge";
import { LanguageProvider } from "../language/languageProvider";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "../theme/themeProvider";
import MenuProvider from "../menu/menuProvider";
import App from "../App";

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

objectMerge();
isAllInteger();

const client = new QueryClient();


test("shipping confirm test with empty cart", {timeout:10000},async () => {

    render(
      <LanguageProvider>
        <HelmetProvider>
          <ThemeProvider>
            <QueryClientProvider client={client}>
              <MenuProvider>
                <MemoryRouter initialEntries={ ['/cart/shipping'] }>
                  <App />
                </MemoryRouter>
              </MenuProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LanguageProvider>
    );

    const { empty } = useCart.getState();

    const cartItemsCount = screen.getByTestId("cartIconTest");
    
    if (cartItemsCount.textContent > 0) {
        act(() => {
            empty();
        });
    }

});


test("shipping confirm test with nonempty cart", async () => {

    const user = userEvent.setup();

    const { add } = useCart.getState();

    act(() => {
        add({ id: 1 });
        add({ id: 2 });
    });

    render(
      <LanguageProvider>
        <HelmetProvider>
          <ThemeProvider>
            <QueryClientProvider client={client}>
              <MenuProvider>
                <MemoryRouter initialEntries={ ['/cart/shipping'] }>
                  <App />
                </MemoryRouter>
              </MenuProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LanguageProvider>
    );

    const homeNumberTest = screen.getByTestId("homeNumberTest");
    const cityTest = screen.getByTestId("cityTest");
    const countryTest = screen.getByTestId("countryTest");
    const stateTest = screen.getByTestId("stateTest");
    const pinCodeTest = screen.getByTestId("pinCodeTest");
    const phoneNumberTest = screen.getByTestId("phoneNumberTest");

    await user.type(homeNumberTest, "E46");
    await user.type(cityTest, "cairo");
    await user.selectOptions(countryTest,"EG");
    await user.selectOptions(stateTest, "AS");
    await user.type(pinCodeTest, "55344");
    await user.type(phoneNumberTest, "010546464546");

    expect(screen.queryByText("Home No. is required")).not.toBeInTheDocument();
    expect(screen.queryByText("City is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Country is required")).not.toBeInTheDocument();
    expect(screen.queryByText("State is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Pin Code is required")).not.toBeInTheDocument();
    expect(screen.queryByText("Phone Number is required")).not.toBeInTheDocument();
    
    //*use egypt currency because payment get way apply EGP only in test mode
    const currencySelect = screen.getByTestId("currencySelectTest");
    userEvent.selectOptions(currencySelect, "EGP");
    
    const checkoutTest = screen.getByTestId("checkoutTest");
    await user.click(checkoutTest);

});


test("shipping confirm test with nonempty cart and form errors", async () => {

    const user = userEvent.setup();

    const { add } = useCart.getState();

    act(() => {
      add({ id: 1 });
      add({ id: 2 });
    });

    render(
      <LanguageProvider>
        <HelmetProvider>
          <ThemeProvider>
            <QueryClientProvider client={client}>
              <MenuProvider>
                <MemoryRouter initialEntries={ ['/cart/shipping'] }>
                  <App />
                </MemoryRouter>
              </MenuProvider>
            </QueryClientProvider>
          </ThemeProvider>
        </HelmetProvider>
      </LanguageProvider>
    );

    const homeNumberTest = screen.getByTestId("homeNumberTest");
    const cityTest = screen.getByTestId("cityTest");
    const countryTest = screen.getByTestId("countryTest");
    const stateTest = screen.getByTestId("stateTest");
    const pinCodeTest = screen.getByTestId("pinCodeTest");
    const phoneNumberTest = screen.getByTestId("phoneNumberTest");

    await user.clear(homeNumberTest);
    await user.clear(cityTest);
    await user.selectOptions(countryTest,"");
    await user.selectOptions(stateTest, "");
    await user.type(pinCodeTest, "553");
    await user.type(phoneNumberTest, "0105");

    expect(await screen.findByText("House No. is required")).toBeInTheDocument();
    expect(await screen.findByText("City is required")).toBeInTheDocument();
    expect(await screen.findByText("Country is required")).toBeInTheDocument();
    expect(await screen.findByText("State is required")).toBeInTheDocument();
    expect(await screen.findByText("Pin code is too short (min 5 characters)")).toBeInTheDocument();
    expect(await screen.findByText("Phone No. is too short (min 10 characters)")).toBeInTheDocument();
    
    const checkoutTest = screen.getByTestId("checkoutTest");

    await user.click(checkoutTest);

});