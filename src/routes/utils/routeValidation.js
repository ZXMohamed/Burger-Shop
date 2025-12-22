export function routeValidation() {
    return Array.from(arguments).every((state) => {console.log(state);
        if (!state.value && state?.message) {
            state.message();
        }
        return state.value;
    });
}