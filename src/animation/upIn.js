export const upIn = (delay = 0) => ({
    initial: {
        y: "100%",
        opacity: 0
    },
    whileInView: {
        y: 0,
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