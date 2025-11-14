import React from "react";
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import App from "../App";

test("test page layout", () => { 
    render(<App/>);
    
    const header = screen.getByTestId("headerTest");
    expect(header).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByTestId("cartIconTest")).toBeInTheDocument();
    expect(screen.getByTestId("cartIconTest")).toHaveTextContent("0");

    const footer = screen.getByTestId("footerTest");
    expect(footer).toBeInTheDocument();

});