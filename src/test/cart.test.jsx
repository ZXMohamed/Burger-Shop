import { act, render, screen, waitFor } from"@testing-library/react";
import { expect, test, vi } from"vitest";
import { useCart } from "../state/cart";
import { data as menuData } from "../data/menu";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { isAllInteger } from "../utils/isAllInteger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../language/languageProvider";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "../theme/themeProvider";
import MenuProvider from "../menu/menuProvider";
import i18n from "../language/i18n";
import App from "../App";


global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    blob: () => Promise.resolve(new Blob()),
  })
);

vi.mock("../state/currency", () => ({
  useCurrency: vi.fn(() => ({
    data: { rates: { USD: 1 } },
    isFetching: false,
    isSuccess: true,
    isError: false,
  })),
}));

isAllInteger();

const client = new QueryClient();

test("cart checkout test with empty cart", async () => {

    const user = userEvent.setup();
        
    render(
        <LanguageProvider>
            <HelmetProvider>
                <ThemeProvider>
                    <QueryClientProvider client={client}>
                        <MenuProvider>
                            <MemoryRouter initialEntries={ ['/'] }>
                                <App/>
                            </MemoryRouter>
                        </MenuProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </HelmetProvider>
        </LanguageProvider>
    );
    
    await waitFor(async() => {
    const { empty } = useCart.getState();

    const cartItemsCount = screen.getByTestId("cartIconTest");
    
    if (cartItemsCount.textContent > 0) {
        act(() => {
            empty();
        });
    }
    
    await user.click(cartItemsCount);

    const noItemsToast = await screen.findByText("cart is empty!");
    expect(noItemsToast).toBeInTheDocument();
});
});


test("cart checkout test quantity with full cart",{ timeout: 10000 }, async () => {

    const user = userEvent.setup();

    render(
        <LanguageProvider>
            <HelmetProvider>
                <ThemeProvider>
                    <QueryClientProvider client={client}>
                        <MenuProvider>
                            <MemoryRouter initialEntries={ ['/'] }>
                                <App/>
                            </MemoryRouter>
                        </MenuProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </HelmetProvider>
        </LanguageProvider>
    );

    const { add } = useCart.getState();

    //*test if cart has 2 items

    act(() => {
        add({ id: 1 });
        add({ id: 2 });
    });

    const cartItemsCount = screen.getByTestId("cartIconTest");
    await user.click(cartItemsCount);

    for (let id = 1; id <= 2; id++) {
        //*check each item content
        await waitFor(async () => {
            expect(await screen.findByTestId(`cardItemNameTest${id}`)).toHaveTextContent(menuData(i18n.t)[id].name);
            expect(await screen.findByTestId(`cardItemPriceTest${id}`)).toHaveTextContent(menuData(i18n.t)[id].price);
        },{ timeout: 5000 });

        //*check quantity limits min=0, max=10 
        //*by clicking on buttons more than 10 clicks
        for (let i = 0; i < 12; i++) {
            await user.click(screen.getByTestId(`cardItemINCTest${id}`));
        }
        expect(screen.getByTestId(`cardItemQuantityTest${id}`)).toHaveValue(10);

        for (let i = 0; i < 12; i++) {
            await user.click(screen.getByTestId(`cardItemDECTest${id}`));
        }
        expect(screen.getByTestId(`cardItemQuantityTest${id}`)).toHaveValue(0);
    }
    
    //*test if cart has 2 items but quantity = 0 for each one

    const confirmTest = screen.getByTestId("confirmTest");
    await user.click(confirmTest);

    const zeroQuantityToast = await screen.findByText("quantity is zero please add at lest 1!");
    expect(zeroQuantityToast).toBeInTheDocument();

});


test("cart checkout test with full cart", { timeout: 10000 }, async () => {

    const user = userEvent.setup();

    render(
        <LanguageProvider>
            <HelmetProvider>
                <ThemeProvider>
                    <QueryClientProvider client={client}>
                        <MenuProvider>
                            <MemoryRouter initialEntries={ ['/cart'] }>
                                <App/>
                            </MemoryRouter>
                        </MenuProvider>
                    </QueryClientProvider>
                </ThemeProvider>
            </HelmetProvider>
        </LanguageProvider>
    );

    const { add, empty } = useCart.getState();

    const cartItemsCount = screen.getByTestId("cartIconTest");
    
    if (cartItemsCount.textContent > 0) {
        act(() => {
            empty();
        });
    }

    act(() => {
        add({ id: 1 });
        add({ id: 2 });
    });

    await user.click(cartItemsCount);

    //*test if cart has 2 items but quantity = 3 for first one
    //*and quantity = 2 for second one

    const subTotalTest = await screen.findByTestId("subTotalTest");
    const taxTest = await screen.findByTestId("taxTest");
    const shippingTest = await screen.findByTestId("shippingTest");
    const TotalTest = await screen.findByTestId("TotalTest");

    await user.click(await screen.findByTestId(`cardItemINCTest1`));
    await user.click(await screen.findByTestId(`cardItemINCTest1`));
    await user.click(await screen.findByTestId(`cardItemINCTest2`));

    const price1 = parseFloat(menuData(i18n.t)[1].price);
    const price2 = parseFloat(menuData(i18n.t)[2].price);

    const calculSubTotal = parseFloat((price1 * 3 + price2 * 2).toFixed(2));
    const calculTax = parseFloat((calculSubTotal * 0.10).toFixed(2));
    const calculShipping = parseFloat((2.24).toFixed(2));
    const calculTotal = parseFloat((calculSubTotal + calculShipping + calculTax).toFixed(2));


    await waitFor(async () => {

        expect(screen.getByTestId(`cardItemQuantityTest1`)).toHaveValue(3);
        expect(screen.getByTestId(`cardItemQuantityTest2`)).toHaveValue(2);

        expect(subTotalTest).toHaveTextContent(calculSubTotal);
        expect(taxTest).toHaveTextContent(calculTax);
        expect(shippingTest).toHaveTextContent(calculShipping);
        expect(TotalTest).toHaveTextContent(calculTotal);

    }, { timeout: 5000 });

    const confirmTest = screen.getByTestId("confirmTest");

    await user.click(confirmTest);

    expect(await screen.findByText("Shipping Details")).toBeInTheDocument();
});