export const upIn = (delay = 0, triggerAt = "whileInView") => ({
    initial: {
        y: "100%",
        opacity: 0
    },
    [triggerAt]: {
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