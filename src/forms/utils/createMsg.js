//*msg ex: %input% is too short (min %length% characters)
//*use replace() to change values of vars (%input%, %length%)
//*in the current language so the msg will be fully translated

export const createMsg = (t, msg, page, input, length) => {
    return t(`msgs.forms.${msg}`)
        .replace("%input%", t(`${page}.form.inputs.${input}.placeholder`))
        .replace("%length%", length)
}