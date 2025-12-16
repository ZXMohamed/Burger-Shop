export const changeTheme = (theme) => {

    typeof document !== "undefined" && document.documentElement.setAttribute('data-theme', theme);
    typeof window !== "undefined" && localStorage.setItem("theme", theme);//*SSR
};