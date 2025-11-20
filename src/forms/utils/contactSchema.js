import * as Yup from 'yup';
import { message, name } from './rules';

const ContactSchema = Yup.object().shape({
    name: Yup.string()
        .min(name.min, 'Name is too short (min 2 characters)')
        .max(name.max, 'Name is too long (max 50 characters)')
        .required('Name is required'),

    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),

    message: Yup.string()
        .min(message.min, 'Message is too short (min 10 characters)')
        .required('Message is required'),
    
    "cf-turnstile-response": Yup.string()
        .required('Complete the security check')
});

export default ContactSchema;