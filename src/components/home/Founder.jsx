import React from "react";
import { motion } from "framer-motion";
import { owner } from "../../assets/images/images";
import { upIn } from "../../animation/upIn";
import { rightIn } from "../../animation/rightIn";

const Founder = () => {

  return (
    <section data-testid="founderTest" className="founder">
      <article>
        <motion.img src={ owner } alt="Nelson" height={ 200 } width={ 200 }  {...rightIn(0.4)}/>
        <motion.h3  {...upIn(0.2)}>Nelson</motion.h3>

        <motion.p  {...upIn(0.6)}>
          Hey, Everyone I am Nelson, the founder of Burger Shop.
          <br />
          Our aim is to create the most tasty burger on planet.
        </motion.p>
      </article>
    </section>
  );
};

export default Founder;
