import { motion, useScroll } from "framer-motion"
import { Link, useLocation } from "react-router"

export default function ScrollFollow({currentPath="", target="", icon=<></>, children}) {
    const { scrollYProgress } = useScroll()
    const location = useLocation();

    let link = "";
    let LinkTag = Link; 

    if (location.pathname == currentPath) {
        link = target;
        LinkTag = ({ link, children }) => <a href={ link }>{ children }</a>;
    } else {
        link = currentPath + target;
        LinkTag = ({ link, children }) => <Link to={ link }>{ children }</Link>;
    }

    return (
        <>
            <LinkTag link={link} title="back to menu">
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
}