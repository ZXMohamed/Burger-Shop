export const downIn = (delay) => ({
    initial: {
        y: "-100%",
        opacity: 0,
    },
    whileInView: {
        y: 0,
        opacity: 1
    },
    transition: {
        delay: delay
    }
});