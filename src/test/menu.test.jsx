import { expect, test } from "vitest";
import App from "../App";
import { fireEvent, render, screen } from "@testing-library/react";
import { data } from "../data/menu";

test("menu events test", () => {
    render(<App />);
    
    const menuItems = [];
    var cardCount = 0;
    data.forEach(async ({ id, name }) => {
        const count = ++cardCount;
        const item = screen.getByTestId(`menuItemBtnTest${id}`);
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