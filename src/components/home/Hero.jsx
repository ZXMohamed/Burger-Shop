import React from "react";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { downIn } from "../../animation/downIn";
import { useTranslation } from "react-i18next";

function Hero() {
    const { t } = useTranslation();
    return (
        <section data-testid="heroTest" className="home">
            <div>
                <div className="blurCard"></div>
                <article>
                    <motion.h1 { ...rightIn(0) }>{ t(`home.hero.title`) }</motion.h1>
                    <motion.p { ...rightIn(0.5) } >{ t(`home.hero.description`) }</motion.p>
                <motion.a href="#menu" {...downIn(0.5)}>{ t(`home.hero.exploreMenu`) }</motion.a>
                </article>
            </div>
        </section> 
    );
}

export default Hero;
