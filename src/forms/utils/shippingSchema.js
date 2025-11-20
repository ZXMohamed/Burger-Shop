import * as Yup from 'yup';
import { phoneNumber, pinCode } from './rules';

const ShippingSchema = Yup.object().shape({
    homeNumber: Yup.string()
        .required('Home No. is required'),

    city: Yup.string()
        .required('City is required'),

    country: Yup.string()
        .required('Country is required'),

    state: Yup.string()
        .required('State is required'),

    pinCode: Yup.string()
        .matches(pinCode.pattern, 'Pin Code must be only digits')
        .min(pinCode.min, 'Pin Code must be at least 5 digits')
        .required('Pin Code is required'),

    phoneNumber: Yup.string()
        .matches(phoneNumber.pattern, 'Phone Number must be only digits')
        .min(phoneNumber.min, 'Phone Number must be at least 10 digits')
        .required('Phone Number is required'),
    
    "cf-turnstile-response": Yup.string()
        .required('Complete the security check')
});

export default ShippingSchema;