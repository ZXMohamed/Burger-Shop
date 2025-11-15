import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Contact from "../components/contact/Contact";
import { burger2 } from "../assets/images/images";
import userEvent from "@testing-library/user-event";


test("contact form", async () => {

    window.alert = vi.fn();
    
    render(<Contact />);
    
    const burgerImage = screen.getByAltText("Burger");
    expect(burgerImage).toHaveAttribute("src", burger2);

    const contactForm = screen.getByTestId("contactFormTest");
    expect(contactForm).toBeInTheDocument();
    
    //*form inputs
    const formName = screen.getByTestId("contactFormNameTest");
    const formEmail = screen.getByTestId("contactFormEmailTest");
    const formMessage = screen.getByTestId("contactFormMessageTest");
    const formSubmit = screen.getByTestId("contactFormSubmitTest");
    
    //*test errors
    userEvent.type(formName, "s");
    expect(await screen.findByText("Name is too short (min 2 characters)")).toBeInTheDocument();
    
    const longString = "s".repeat(51);
    userEvent.type(formName, longString);
    expect(await screen.findByText("Name is too long (max 50 characters)")).toBeInTheDocument();
    
    userEvent.clear(formName);
    expect(await screen.findByText("Name is required")).toBeInTheDocument();

    userEvent.type(formEmail, "dahkasjdhask");
    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
    
    userEvent.clear(formEmail);
    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    
    userEvent.type(formMessage, "s");
    expect(await screen.findByText("Message is too short (min 10 characters)")).toBeInTheDocument();

    userEvent.clear(formMessage);
    expect(await screen.findByText("Message is required")).toBeInTheDocument();
    
    //*test submit
    userEvent.type(formName, "test");
    userEvent.type(formEmail, "test@test.test");
    userEvent.type(formMessage, "test test test");

    fireEvent.click(formSubmit);

    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledTimes(1);
        expect(window.alert).toHaveBeenCalledWith("test / test@test.test / test test test");
    });
    
});