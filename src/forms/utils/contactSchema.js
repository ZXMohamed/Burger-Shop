import * as Yup from 'yup';
import { message, name } from './rules';
import { createMsg } from './createMsg';

const contactSchema = (t)=> Yup.object({
    name: Yup.string()
        .min(name.min, createMsg(t,"min","contact", "name", name.min))
        .max(name.max, createMsg(t,"max","contact", "name", name.max))
        .required(createMsg(t,"required","contact","name")),

    email: Yup.string()
        .email(createMsg(t,"validation","contact","email"))
        .required(createMsg(t,"required","contact", "email")),

    message: Yup.string()
        .min(message.min, createMsg(t,"min","contact","message",message.min))
        .required(createMsg(t,"required","contact", "message")),
    
    "cf-turnstile-response": Yup.string()
        .required(createMsg(t,"securityCheck"))
});

export default contactSchema;