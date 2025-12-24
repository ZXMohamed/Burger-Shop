import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillInstagram, AiFillYoutube, AiFillGithub } from "react-icons/ai";
const Footer = () => {

    const { t } = useTranslation();

    return (
        <footer data-testid="footerTest">
            <aside className="side1">
                <h2>{ t(`footer.logo.title`) }</h2>
                <p>{ t(`footer.logo.description`) }</p>
                <br />
                <em>{ t(`footer.logo.feedback`) }</em>
                <strong>{ t(`footer.logo.rights`) }</strong>
            </aside>
            <aside className="side2">
                <h3>{ t(`footer.social.title`) }</h3>
                <a href="https://youtube.com" title="youtube">
                    <AiFillYoutube /> youtube
                </a>
                <a href="https://instagram.com" title="instagram">
                    <AiFillInstagram /> instagram
                </a>
                <a href="https://github.com" title="github">
                    <AiFillGithub /> github
                </a>
            </aside>
        </footer>
    );
};
export default Footer;