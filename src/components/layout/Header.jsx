import React, { useContext } from "react";
import { IoFastFoodOutline } from "react-icons/io5"; import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";
import { Cart } from "../../cart";
const Header = () => {
    const cartitems = useContext(Cart).data
    return (
        <nav>
            <motion.div initial={ { x: "-100%" } } whileInView={ { x: 0 } }>
                <IoFastFoodOutline />
            </motion.div>
            <div>
                <Link to="/">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/myorders">Orders</Link>
                <Link to="/about">About</Link>
                <Link to="/cart">
                    <FiShoppingCart />
                    <div style={ { marginLeft:"5px",display: "inline-flex", justifyContent:"center",alignItems:"center",width:"25px",height:"25px", backgroundColor: "#f7f7f7",color:"maroon", borderRadius: "50%"} }>
                        {Object.keys(cartitems).length}
                    </div>
                </Link>
            </div>
        </nav>
    );
};
export default Header;