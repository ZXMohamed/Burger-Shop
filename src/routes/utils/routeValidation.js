export function routeValidation() {
    return Array.from(arguments).every((state) => {
        if (!state.value && state?.message) {
            state.message();
        }
        return state.value;
    });
}