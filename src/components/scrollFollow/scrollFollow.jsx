import { motion, useScroll } from "framer-motion"
import { memo, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router"

const ScrollFollow = memo(({ currentPath = "", target = "", icon = <></>, children }) => {
    const { scrollYProgress } = useScroll()
    const location = useLocation();

    const link = useRef("");
    const [linkType, setLinkType] = useState("Link");

    
    useEffect(() => {
        if (location.pathname == currentPath) {
            link.current = target;
            setLinkType("a");
        } else {
            link.current = currentPath + target;
            setLinkType("link");
        }
    }, [location.pathname, currentPath, target]);

    return (
        <>
            <LinkTag type={ linkType } link={ link.current } title="back to menu">
                <div className={ "scrollFollow" }>
                    <div className={ "scrollFollowIcon" }>
                        { icon }
                    </div>
                    <svg viewBox="0 0 100 100" className={ "scrollFollowProgress" }>
                        <motion.circle cx="50" cy="50" r="30" pathLength="1" className={ "scrollFollowProgressCircle" } style={ { pathLength: scrollYProgress } } />
                    </svg>
                </div>
            </LinkTag>
            { children }
        </>
    )
});

export default ScrollFollow;


function LinkTag({ type, link, children }) {
    if (type === "a") {        
        return <a href={ link }>{ children }</a>
    } else if(type === "link") {
        return <Link to={ link }>{ children }</Link>
    }
}