import { act, render, screen } from"@testing-library/react";
import { expect, test } from"vitest";
import { useCart } from "../state/cart";
import { MemoryRouter, Outlet, Route, Routes } from "react-router";
import CartWrapper from "../components/templates/cartWrapper";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event";
import Shipping from "../components/cart/Shipping";

test("shipping confirm test with empty cart", async () => {
        
    render(
        <MemoryRouter initialEntries={ ['/cart/shipping'] }>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/" element={ <>main</> } />
                <Route path="/cart" element={ <CartWrapper /> }>
                    <Route index element={ <>cart</> } />
                    <Route path="shipping" element={ <Shipping /> } />
                </Route>
                <Route path="*" element={ <>notFound</> } />
            </Routes>
            <Footer />
        </MemoryRouter>
    );

    const { empty } = useCart.getState();

    const cartItemsCount = screen.getByTestId("cartIconTest");
    
    if (cartItemsCount.textContent > 0) {
        act(() => {
            empty();
        });
    }

    const noItemsToast = await screen.findByText("cart is empty!");
    expect(noItemsToast).toBeInTheDocument();

});


test("shipping confirm test with nonempty cart", async () => {

    const user = userEvent.setup();

    const { add } = useCart.getState();

    act(() => {
        add({ id: 1 });
        add({ id: 2 });
    });
        
    render(
        <MemoryRouter initialEntries={ ['/cart/shipping'] }>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/cart" element={ <CartWrapper /> }>
                    <Route index element={ <>cart</> } />
                    <Route path="shipping" element={ <Shipping /> } />
                </Route>
                <Route path="/myorders" element={ <><Outlet /></> }>
                    <Route index element={ <>myorders</> } />
                    <Route path=":id" element={<>order</>} />
                </Route>
                <Route path="*" element={ <>notFound</> } />
            </Routes>
            <Footer />
        </MemoryRouter>
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
    
    const confirmTest = screen.getByTestId("confirmTest");

    await user.click(confirmTest);
    
    expect(await screen.findByText("myorders")).toBeInTheDocument();

});


test("shipping confirm test with nonempty cart and form errors", async () => {

    const user = userEvent.setup();

    const { add } = useCart.getState();

    act(() => {
        add({ id: 1 });
        add({ id: 2 });
    });
        
    render(
        <MemoryRouter initialEntries={ ['/cart/shipping'] }>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/cart" element={ <CartWrapper /> }>
                    <Route index element={ <>cart</> } />
                    <Route path="shipping" element={ <Shipping /> } />
                </Route>
                <Route path="*" element={ <>notFound</> } />
            </Routes>
            <Footer />
        </MemoryRouter>
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

    expect(screen.getByText("Home No. is required")).toBeInTheDocument();
    expect(screen.getByText("City is required")).toBeInTheDocument();
    expect(screen.getByText("Country is required")).toBeInTheDocument();
    expect(screen.getByText("State is required")).toBeInTheDocument();
    expect(screen.getByText("Pin Code must be at least 5 digits")).toBeInTheDocument();
    expect(screen.getByText("Phone Number must be at least 10 digits")).toBeInTheDocument();
    
    const confirmTest = screen.getByTestId("confirmTest");

    await user.click(confirmTest);
    
    expect(await screen.findByText("Shipping Details")).toBeInTheDocument();

});