import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import { RiFindReplaceLine } from "react-icons/ri";
import { founderBackground, loadMainImage, owner } from "../../assets/images/images";
import { useTranslation } from "react-i18next";
import { downIn } from "../../animation/downIn";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";

const About = () => {

    const ownerImg = useRef();
    const ownerBackground = useRef();

    const { t } = useTranslation();

    useEffect(() => {
        loadMainImage(owner, ownerImg, { type: "img" });
        loadMainImage(founderBackground, ownerBackground, { type: "background" });
    },[])

    return (
        <section ref={ownerBackground} className="about">
            <article>
                <motion.h1 {...upIn(0)}>{ t(`about.title`) }</motion.h1>
                <motion.article {...upIn(0)}>
                    <h4>{ t(`about.shop.title`) }</h4>
                    <p>{ t(`about.shop.description`) }</p>
                    <p>{ t(`about.shop.menuLinkDescription`) }</p>
                    <Link to="/#menu"><RiFindReplaceLine /></Link>
                </motion.article>
                <motion.div {...downIn(0)}>
                    <h2>{ t(`about.founder.title`) }</h2>
                    <article>
                        <div>
                            <img ref={ownerImg} src={ owner } alt="Founder" />
                            <h3>{ t(`about.founder.name`) }</h3>
                        </div>
                        <p>{ t(`about.founder.about`) }</p>
                    </article>
                </motion.div>
            </article>
        </section>
    );
};
export default About;