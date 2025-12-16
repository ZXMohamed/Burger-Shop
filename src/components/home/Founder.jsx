import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { founderBackground, loadMainImage, owner } from "../../assets/images/images";
import { upIn } from "../../animation/upIn";
import { rightIn } from "../../animation/rightIn";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";

const Founder = () => {

  const ownerBackground = useRef();
  const ownerImg = useRef();

  const { t } = useTranslation();

  const { scrollYProgress } = useScroll();

  const isLg = useMediaQuery({ query: '(max-width: 992px)' });
  
  const bgSizeValue = useTransform(scrollYProgress, [0, 1], isLg? ["auto 120%", "auto 100%"]:["150% 150%", "100% 100%"]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    loadMainImage(founderBackground, ownerBackground, { type: "background" });
    loadMainImage(owner, ownerImg, { type: "img" });
  }, []);

  return (
    <motion.section ref={ownerBackground} data-testid="founderTest" className="founder" style={ { backgroundSize: bgSizeValue } }>
      <div>
        <motion.article style={ { scale: scaleValue } }>
          <motion.img ref={ownerImg} src={ owner } alt="Nelson" height={ 200 } width={ 200 } loading="lazy" {...rightIn(0.4)}/>
          <motion.h3  { ...upIn(0.2) }>{ t(`home.founder.name`) }</motion.h3>
          <motion.p  { ...upIn(0.6) }>{ t(`home.founder.about`) }</motion.p>
        </motion.article>
      </div>
    </motion.section>
  );
};

export default Founder;
