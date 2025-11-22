import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";
const Footer = () => {

    const { t } = useTranslation();

    return (
        <footer data-testid="footerTest">
            <div>
                <h2>{ t(`footer.logo.title`) }</h2>
                <p>{ t(`footer.logo.description`) }</p>
                <br />
                <em>{ t(`footer.logo.feedback`) }</em>
                <strong>{ t(`footer.logo.rights`) }</strong>
            </div>
            <aside>
                <h4>{ t(`footer.social.title`) }</h4>
                <a href="https://youtube.com">
                    <AiFillYoutube />
                </a>
                <a href="https://instagram.com">
                    <AiFillInstagram />
                </a>
                <a href="https://github.com">
                    <AiFillGithub />
                </a>
            </aside>
        </footer>
    );
};
export default Footer;