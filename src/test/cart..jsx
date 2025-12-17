// import { act } from "react";
import { act, render, screen } from"@testing-library/react";
import { expect, test } from"vitest";
import { useCart } from "../state/cart";
import { data } from "../data/menu";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import CartWrapper from "../components/templates/orderWrapper";
import Cart from "../components/cart/Cart";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event";

test("cart checkout test", async () => {

    const user = userEvent.setup();
    
    function CurrentPath() {
        const location = useLocation();
        return (
            <span data-testid="currentPath">{ location.pathname }</span>
        );
    }
        
    render(
        <MemoryRouter initialEntries={ ['/'] }>
            <Header />
            <CurrentPath/>
            <ToastContainer />
            <Routes>
                <Route path="/" element={ <>main</> } />
                <Route path="/cart" element={ <CartWrapper /> }>
                    <Route index element={ <Cart /> } />
                    <Route path="shipping" element={ <>shipping</> } />
                </Route>
                <Route path="*" element={ <>notFound</> } />
            </Routes>
            <Footer />
        </MemoryRouter>
    );

    const currentPath = screen.getByTestId("currentPath");

console.log("current path : ", currentPath.textContent);
    
    if (currentPath.textContent == '/') {
        
        const { add, empty } = useCart.getState();
    
        const cartItemsCount = screen.getByTestId("cartIconTest");

        //*test if cart empty
        
        if (cartItemsCount.textContent > 0) {
            act(() => {
                empty();
            });
        }
        
        await user.click(cartItemsCount);

        const noItemsToast = await screen.findByText("cart is empty!");
        expect(noItemsToast).toBeInTheDocument();
    
        //*test if cart has 2 items

        act(() => {
            add({ id: 1 });
            add({ id: 2 });
        });

        await user.click(cartItemsCount);
        
console.log("current path : ", currentPath.textContent);
        
    // } else if (currentPath.textContent=='/cart') {
    
        for (let id = 1; id <= 2; id++) {
            //*check each item content
            expect(screen.getByTestId(`cardItemNameTest${id}`)).toHaveTextContent(data[id].name);
            expect(screen.getByTestId(`cardItemPriceTest${id}`)).toHaveTextContent(data[id].price);
            expect(screen.getByAltText(data[id].name)).toHaveAttribute("src", data[id].photo);
        
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
    
        //*test if cart has 2 items but quantity = 0 at each one
    
        const checkoutTest = screen.getByTestId("checkoutTest");
        await user.click(checkoutTest);
    
        const zeroQuantityToast = await screen.findByText("quantity is zero please add at lest 1!");
        expect(zeroQuantityToast).toBeInTheDocument();
    
        //*test if cart has 2 items but quantity = 2 at first one
        //*and quantity = 1 at second one

        const subTotalTest = screen.getByTestId("subTotalTest");
        const taxTest = screen.getByTestId("taxTest");
        const shippingTest = screen.getByTestId("shippingTest");
        const TotalTest = screen.getByTestId("TotalTest");
    
        await user.click(screen.getByTestId(`cardItemINCTest1`));
        await user.click(screen.getByTestId(`cardItemINCTest1`));
        await user.click(screen.getByTestId(`cardItemINCTest2`));
    
        expect(screen.getByTestId(`cardItemQuantityTest1`)).toHaveValue(2);
        expect(screen.getByTestId(`cardItemQuantityTest2`)).toHaveValue(1);

        const price1 = parseFloat(data[1].price);
        const price2 = parseFloat(data[2].price);

        const calculSubTotal = parseFloat((price1 * 2 + price2 * 1).toFixed(2));
        const calculTax = parseFloat((calculSubTotal * 0.10).toFixed(2));
        const calculShipping = parseFloat((200).toFixed(2));
        const calculTotal = parseFloat((calculSubTotal + calculShipping + calculTax).toFixed(2));
    
        expect(subTotalTest).toHaveTextContent(calculSubTotal);
        expect(taxTest).toHaveTextContent(calculTax);
        expect(shippingTest).toHaveTextContent(calculShipping);
        expect(TotalTest).toHaveTextContent(calculTotal);
    
        await user.click(checkoutTest);

console.log("current path : ", currentPath.textContent);
        
    // } else if (currentPath.textContent == '/cart/shipping') {
        
        expect(await screen.findByText("shipping")).toBeInTheDocument();

    }
    
},10000);