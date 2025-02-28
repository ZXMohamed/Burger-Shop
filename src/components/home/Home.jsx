import React, { Fragment } from "react";
import { motion } from "framer-motion";
import Founder from "./Founder";
import Menu from "./Menu";

const Home = () => {
    const options = {
        initial: {
            x: "-100%",
            opacity: 0,
        },
        whileInView: {
            x: 0,
            opacity: 1,
        },
    };
    
    return (
        <Fragment>
            <section className="home">
                <div>
                    <motion.h1 { ...options } animate={ {
                        color: "#fff",
                       } }>Burger Shop</motion.h1>
                    <motion.p
                        { ...options } transition={ {
                            delay: 1,
                        } } animate={ {
                            color: "#fff",
                        } }
                    >
                        Give yourself a tasty burger.
                    </motion.p>
                </div>
                <motion.a href="#menu" initial={ {
                    y: "-100%",
                    opacity: 0,
                } }
                    whileInView={ {
                        y: 0,
                        opacity: 1,
                        color:"#eee"
                    } }
                    transition={ {
                        delay: 1,
                    } }
                >
                    Explore Menu
                </motion.a>
            </section>
            <Menu />
            <Founder />
        </Fragment>
    );
};
export default Home;