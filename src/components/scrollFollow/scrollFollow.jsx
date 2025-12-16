import { motion, useScroll } from "framer-motion"
import { BiSolidFoodMenu } from "react-icons/bi";

export default function ScrollFollow({ link="", children}) {
    const { scrollYProgress } = useScroll()

    return (
        <>
            <a href={link} title="back to menu">
                <div className={ "scrollFollow" }>
                    <BiSolidFoodMenu className={ "scrollFollowIcon" } />
                    <svg viewBox="0 0 100 100" className={ "scrollFollowProgress" }>
                        <motion.circle cx="50" cy="50" r="30" pathLength="1" className={"scrollFollowProgressCircle"} style={{pathLength: scrollYProgress}}/>
                    </svg>
                </div>
            </a>
            { children }
        </>
    )
}