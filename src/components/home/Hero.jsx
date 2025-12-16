import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { downIn } from "../../animation/downIn";
import { useTranslation } from "react-i18next";
import { homeBackground, loadMainImage } from "../../assets/images/images";

function Hero() {

    const heroBackground = useRef();

    const { t } = useTranslation();

    const { scrollYProgress } = useScroll();

    const backdropBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(20px)"]);

    useEffect(() => {
        loadMainImage(homeBackground, heroBackground, { type: "background" });
    }, []);
    
    return (
        <section ref={heroBackground} data-testid="heroTest" className="home">
            <motion.div style={ { backdropFilter: backdropBlur, WebkitBackdropFilter: backdropBlur } }>
                <div>
                    <article>
                        <motion.h1 { ...rightIn(0) }>{ t(`home.hero.title`) }</motion.h1>
                        <motion.p { ...rightIn(0.5) } >{ t(`home.hero.description`) }</motion.p>
                        <motion.a href="#menu" {...downIn(0.5)}>{ t(`home.hero.exploreMenu`) }</motion.a>
                    </article>
                </div>
            </motion.div>
        </section> 
    );
}

export default Hero;
