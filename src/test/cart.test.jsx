import { act, render, screen } from"@testing-library/react";
import { expect, test } from"vitest";
import { useCart } from "../state/cart";
import { data } from "../data/menu";
import { MemoryRouter, Route, Routes } from "react-router";
import Cart from "../components/cart/Cart";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { ToastContainer } from "react-toastify";
import userEvent from "@testing-library/user-event";

test("cart checkout test", async() => {
    render(
        <MemoryRouter initialEntries={ ['/cart'] }>
            <Header />
            <ToastContainer />
            <Routes>
                <Route path="/cart" element={ <Cart /> } />
                <Route path="/cart/shipping" element={ <>shipping</> } />
                <Route path="*" element={<>notFound</>} />
            </Routes>
            <Footer />
        </MemoryRouter>
    );
    
    const { add, empty } = useCart.getState();
    
    const cartItemsCount = screen.getByTestId("cartIconTest");

    const subTotalTest = screen.getByTestId("subTotalTest");
    const taxTest = screen.getByTestId("taxTest");
    const shippingTest = screen.getByTestId("shippingTest");
    const TotalTest = screen.getByTestId("TotalTest");

    const checkoutTest = screen.getByTestId("checkoutTest");


    //*test if cart empty

    if (cartItemsCount.textContent > 0) {
        act(() => {
            empty();
        });
    }
    
    const noItems = screen.getByText("No items added yet!");

    expect(noItems).toBeInTheDocument();

    expect(subTotalTest).toHaveTextContent("0");
    expect(taxTest).toHaveTextContent("0");
    expect(shippingTest).toHaveTextContent("200");
    expect(TotalTest).toHaveTextContent("0");
    
    

    userEvent.click(checkoutTest);

    const noItemsToast = await screen.findByText("no items in cart!");
    expect(noItemsToast).toBeInTheDocument();
    
    //*test if cart has 2 items

    act(() => {
        useCart.setState({ cart: {} });
        add({ id: 1 });
        add({ id: 2 });
    });
    
    for (let id = 1; id <= 2; id++) {
        //*check each item content
        expect(screen.getByTestId(`cardItemNameTest${id}`)).toHaveTextContent(data[id].name);
        expect(screen.getByTestId(`cardItemPriceTest${id}`)).toHaveTextContent(data[id].price);
        expect(screen.getByAltText(data[id].name)).toHaveAttribute("src", data[id].photo);
        
        //*check quantity limits min=0, max=10 
        //*by clicking on buttons more than 10 clicks
        for (let i = 0; i < 12; i++){
            userEvent.click(screen.getByTestId(`cardItemINCTest${id}`));
        }
        expect(screen.getByTestId(`cardItemQuantityTest${id}`)).toHaveValue(10);
        
        for (let i = 0; i < 12; i++){
            userEvent.click(screen.getByTestId(`cardItemDECTest${id}`));
        }
        expect(screen.getByTestId(`cardItemQuantityTest${id}`)).toHaveValue(0);
    }

    //*test if cart has 2 items but quantity = 0 at each one
    
    userEvent.click(checkoutTest);
    
    const zeroQuantityToast = await screen.findByText("quantity is zero please add at lest 1!");
    expect(zeroQuantityToast).toBeInTheDocument();
    
    //*test if cart has 2 items but quantity = 2 at first one
    //*and quantity = 1 at second one

    userEvent.click(screen.getByTestId(`cardItemINCTest1`));
    userEvent.click(screen.getByTestId(`cardItemINCTest1`));
    userEvent.click(screen.getByTestId(`cardItemINCTest2`));
    
    expect(screen.getByTestId(`cardItemQuantityTest1`)).toHaveValue(2);
    expect(screen.getByTestId(`cardItemQuantityTest2`)).toHaveValue(1);

    const price1 = parseFloat(data[1].price);
    const price2 = parseFloat(data[2].price);

    const calculSubTotal = parseFloat((price1*2 + price2*1).toFixed(2));
    const calculTax = parseFloat((calculSubTotal * 0.10).toFixed(2));
    const calculShipping = parseFloat((200).toFixed(2));
    const calculTotal = parseFloat((calculSubTotal + calculShipping + calculTax).toFixed(2));
    
    expect(subTotalTest).toHaveTextContent(calculSubTotal);
    expect(taxTest).toHaveTextContent(calculTax);
    expect(shippingTest).toHaveTextContent(calculShipping);
    expect(TotalTest).toHaveTextContent(calculTotal);
    
    userEvent.click(checkoutTest);
    expect(screen.getByText("shipping")).toBeInTheDocument();
    
});