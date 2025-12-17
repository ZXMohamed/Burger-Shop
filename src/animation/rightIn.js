export const rightIn = (delay = 0) => ({
    initial: {
        x: "-100%",
        opacity: 0
    },
    whileInView: {
        x: 0,
        opacity: 1
    },
    viewport: {
        once: true,
        amount: 0
    },
    transition: {
        delay: delay,
    }
});