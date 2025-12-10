export const changeTheme = (theme) => {

    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem("theme", theme);
};