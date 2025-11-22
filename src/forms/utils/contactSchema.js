import * as Yup from 'yup';
import { message, name } from './rules';

//*msg ex: %input% is too short (min %length% characters)
//*use replace() to change values of vars (%input%, %length%)
//*in the current language so the msg will be fully translated

const createMsg = (t,msg, input, length) => {
    return t(`msgs.forms.${msg}`)
        .replace("%input%", t(`contact.form.inputs.${input}.placeholder`))
        .replace("%length%", length)
}

const contactSchema = (t)=> Yup.object({
    name: Yup.string()
        .min(name.min, createMsg(t,"min", "name", name.min))
        .max(name.max, createMsg(t,"max", "name", name.max))
        .required(createMsg(t,"required","name")),

    email: Yup.string()
        .email(createMsg(t,"validation","email"))
        .required(createMsg(t,"required", "email")),

    message: Yup.string()
        .min(message.min, createMsg(t,"min","message",message.min))
        .required(createMsg(t,"required", "message")),
    
    "cf-turnstile-response": Yup.string()
        .required(createMsg(t,"securityCheck"))
});

export default contactSchema;