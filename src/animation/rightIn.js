export const rightIn = (delay = 0, triggerAt = "whileInView") => ({
    initial: {
        x: "-100%",
        opacity: 0
    },
    [triggerAt]: {
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