import React from "react";
import { motion } from "framer-motion";
import { owner } from "../../assets/images/images";
import { upIn } from "../../animation/upIn";
import { rightIn } from "../../animation/rightIn";
import { useTranslation } from "react-i18next";

const Founder = () => {
  const { t } = useTranslation();
  return (
    <section data-testid="founderTest" className="founder">
      <article>
        <motion.img src={ owner } alt="Nelson" height={ 200 } width={ 200 }  {...rightIn(0.4)}/>
        <motion.h3  { ...upIn(0.2) }>{ t(`home.founder.name`) }</motion.h3>
        <motion.p  { ...upIn(0.6) }>{ t(`home.founder.about`) }</motion.p>
      </article>
    </section>
  );
};

export default Founder;
