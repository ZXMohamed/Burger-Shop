import React from "react";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { downIn } from "../../animation/downIn";

function Hero() {
    
    return (
        <section className="home">
            <article>
                <motion.h1 { ...rightIn(0) }>Burger Shop</motion.h1>
                <motion.p { ...rightIn(0.5) } >Give yourself a tasty burger.</motion.p>
            </article>
            <motion.a href="#menu" {...downIn(0.5)}>Explore Menu</motion.a>
        </section> 
    );
}

export default Hero;
