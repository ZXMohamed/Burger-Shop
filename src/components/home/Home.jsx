import React, { Fragment } from "react";
import Founder from "./Founder";
import Menu from "./Menu";
import Hero from "./Hero";

const Home = () => {
    
    return (
        <Fragment>
            <Hero />
            <Menu />
            <Founder />
        </Fragment>
    );
}

export default Home;