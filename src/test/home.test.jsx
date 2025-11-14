import React from "react";
import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Home from '../components/home/Home';
import { data } from "../data/menu";
import { owner } from "../assets/images/images";


test("test home page", () => {
    render(<Home/>);
    
    const hero = screen.getByTestId("heroTest");
    expect(hero).toBeInTheDocument();

    const menu = screen.getByTestId("menuTest");
    expect(menu).toBeInTheDocument();

    const menuItems = screen.getAllByRole("menuItem");
    expect(menuItems).toHaveLength(data.length);
    data.forEach(item => {
        expect(screen.getByText(item.name)).toBeInTheDocument();
        expect(screen.getByText(item.price)).toBeInTheDocument();
        expect(screen.getByAltText(item.name)).toHaveAttribute("src",item.photo);
    });
    
    const founder = screen.getByTestId("founderTest");
    expect(founder).toBeInTheDocument();
    expect(screen.getByAltText("Nelson")).toHaveAttribute("src", owner);

});