import * as Yup from 'yup';
import { phoneNumber, pinCode } from './rules';
import { createMsg } from './createMsg';

const ShippingSchema = (t) => Yup.object({
    homeNumber: Yup.string()
        .required(createMsg(t, "required", "shipping","homeNumber")),

    city: Yup.string()
        .required(createMsg(t, "required", "shipping", "city")),

    country: Yup.string()
        .required(createMsg(t, "required", "shipping", "country")),

    state: Yup.string()
        .required(createMsg(t, "required", "shipping", "state")),

    pinCode: Yup.string()
        .matches(pinCode.pattern, createMsg(t, "validation", "shipping", "pinCode"))
        .min(pinCode.min, createMsg(t, "min", "shipping", "pinCode", pinCode.min))
        .required(createMsg(t, "required", "shipping", "pinCode")),

    phoneNumber: Yup.string()
        .matches(phoneNumber.pattern, createMsg(t, "validation", "shipping", "phoneNumber"))
        .min(phoneNumber.min, createMsg(t, "min", "shipping", "phoneNumber", phoneNumber.min))
        .required(createMsg(t, "required", "shipping", "phoneNumber")),
    
    "cf-turnstile-response": Yup.string()
        .required(createMsg(t, "securityCheck", "shipping"))
});

export default ShippingSchema;