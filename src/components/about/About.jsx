import React from "react";
import { Link } from "react-router";
import { RiFindReplaceLine } from "react-icons/ri";
import { owner } from "../../assets/images/images";
import { useTranslation } from "react-i18next";

const About = () => {

    const { t } = useTranslation();

    return (
        <section className="about">
            <article>
                <h1>{ t(`about.title`) }</h1>
                <article>
                    <h4>{ t(`about.shop.title`) }</h4>
                    <p>{ t(`about.shop.description`) }</p>
                    <p>{ t(`about.shop.menuLinkDescription`) }</p>
                    <Link to="/"><RiFindReplaceLine /></Link>
                </article>
                <div>
                    <h2>{ t(`about.founder.title`) }</h2>
                    <article>
                        <div>
                            <img src={ owner } alt="Founder" />
                            <h3>{ t(`about.founder.name`) }</h3>
                        </div>
                        <p>{ t(`about.founder.about`) }</p>
                    </article>
                </div>
            </article>
        </section>
    );
};
export default About;