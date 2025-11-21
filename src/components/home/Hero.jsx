import React from "react";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { downIn } from "../../animation/downIn";
import { useTranslation } from "react-i18next";

function Hero() {
    const { t } = useTranslation();
    return (
        <section data-testid="heroTest" className="home">
            <article>
                <motion.h1 { ...rightIn(0) }>{ t(`home.hero.title`) }</motion.h1>
                <motion.p { ...rightIn(0.5) } >{ t(`home.hero.description`) }</motion.p>
            </article>
            <motion.a href="#menu" {...downIn(0.5)}>{ t(`home.hero.exploreMenu`) }</motion.a>
        </section> 
    );
}

export default Hero;
