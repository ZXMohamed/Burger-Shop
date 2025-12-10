export const navMenu = {
    collapsed: {
        height: "5rem",
        transition: {duration: 0}
    },
    expanded: {
        height: 420,
        paddingTop: 20,
        alignItems: "flex-start",
        transition: {duration: 0.3}
    }
};

export const menuTabs = {
    visible: {
        display: "flex",
    },
    menuCollapsed: {
        display: "none",
        
    },
    menuExpanded: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        rowGap: "22px",
        padding:"15px 40px"
    }
};