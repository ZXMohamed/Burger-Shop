import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Contact from "../components/contact/Contact";
import { burger2 } from "../assets/images/images";
import userEvent from "@testing-library/user-event";
import { isAllInteger } from "../utils/isAllInteger";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LanguageProvider } from "../language/languageProvider";
import { HelmetProvider } from "react-helmet-async";
import ThemeProvider from "../theme/themeProvider";
import MenuProvider from "../menu/menuProvider";
import { MemoryRouter } from "react-router";
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

isAllInteger();

const client = new QueryClient();

test("contact form", async () => {

    window.alert = vi.fn();
    
    render(
    <LanguageProvider>
        <HelmetProvider>
            <ThemeProvider>
            <QueryClientProvider client={client}>
                <MenuProvider>
                <MemoryRouter initialEntries={ ['/contact'] }>
                    <App />
                </MemoryRouter>
                </MenuProvider>
            </QueryClientProvider>
            </ThemeProvider>
        </HelmetProvider>
    </LanguageProvider>
    );

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
    
    const longString = "s".repeat(100);
    userEvent.type(formName, longString);
    expect(await screen.findByText("Name is too long (max 50 characters)")).toBeInTheDocument();
    
    userEvent.clear(formName);
    expect(await screen.findByText("Name is required")).toBeInTheDocument();

    userEvent.type(formEmail, "dahkasjdhask");
    expect(await screen.findByText("Invalid Email")).toBeInTheDocument();
    
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
    
});