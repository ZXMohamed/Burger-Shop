import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { useCart } from "../../state/cart";

const Header = () => {

    const cartItems = useCart((state) => state.cart);

    return (
        <nav>
            <motion.div {...rightIn(0)}>
                <IoFastFoodOutline />
            </motion.div>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/myorders">Orders</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/cart">
                    <FiShoppingCart />
                    <div className="cartItemsCount">
                        {Object.keys(cartItems).length}
                    </div>
                </NavLink>
            </div>
        </nav>
    );
};
export default Header;