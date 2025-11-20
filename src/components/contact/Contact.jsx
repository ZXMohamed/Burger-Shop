import React from "react";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { downIn } from "../../animation/downIn";
import { useFormik } from "formik";
import ContactSchema from "../../forms/utils/contactSchema";
import { burger2 } from "../../assets/images/images";
import Turnstile, { useTurnstile } from "react-turnstile";

const Contact = () => {

    const turnstile = useTurnstile();

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
            "cf-turnstile-response": ""
        },
        validationSchema: ContactSchema,
        onSubmit: (data, { resetForm }) => {
            alert(Object.values(data).join(" / "));
            resetForm();
        },
        onReset: () => {
            turnstile.reset();
        }
    });


    const handleOnVerify = (token) => {
        formik.setFieldValue("cf-turnstile-response", token);
        if (formik.errors["cf-turnstile-response"]) {
            formik.setFieldError("cf-turnstile-response", '');
        }
    }

    return (
        <section className="contact">
            <motion.form onSubmit={formik.handleSubmit} {...rightIn(0)} data-testid="contactFormTest">
                <h2>Contact Us</h2>
                <input type="text" name="name" placeholder="Name" onChange={ formik.handleChange } onBlur={ formik.handleBlur } value={ formik.values.name } data-testid="contactFormNameTest"/>
                <span>{ formik.errors.name }</span>
                <input type="email" name="email" placeholder="Email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} data-testid="contactFormEmailTest"/>
                <span>{ formik.errors.email }</span>
                <textarea name="message" placeholder="Message..." cols="30" rows="10" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.message} data-testid="contactFormMessageTest"></textarea>
                <span>{ formik.errors.message }</span>
                <Turnstile sitekey={import.meta.env.VITE_TURNSTILE} action="contact" theme="dark" language="en" onVerify={handleOnVerify} />
                <span>{ formik.errors["cf-turnstile-response"] }</span>
                <button type="submit" disabled={ formik.isSubmitting } data-testid="contactFormSubmitTest">
                    {formik.isSubmitting ? 'Sending...' : 'Send'}
                </button>
            </motion.form>
            <motion.div className="formBorder" {...downIn(0)} viewport={{ once: true }}>
                <img src={ burger2 } alt="Burger" />
            </motion.div>
        </section>
    );
};
export default Contact;