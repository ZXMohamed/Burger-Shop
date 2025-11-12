import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";

const Header = () => {

    return (
        <nav>
            <motion.div {...rightIn}>
                <IoFastFoodOutline />
            </motion.div>
            <div>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/contact">Contact</NavLink>
                <NavLink to="/myorders">Orders</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/cart">
                    <FiShoppingCart />
                    <div style={ { marginLeft: "5px", display: "inline-flex", justifyContent: "center", alignItems: "center", width: "25px", height: "25px", backgroundColor: "#f7f7f7", color: "maroon", borderRadius: "50%" } }></div>
                </NavLink>
            </div>
        </nav>
    );
};
export default Header;