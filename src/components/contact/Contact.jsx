import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { downIn } from "../../animation/downIn";
import { useFormik } from "formik";
import contactSchema from "../../forms/utils/contactSchema";
import { burger2 } from "../../assets/images/images";
import Turnstile, { useTurnstile } from "react-turnstile";
import { useTranslation } from "react-i18next";

const Contact = () => {

    const { t, i18n } = useTranslation();

    const turnstile = useTurnstile();
    
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            message: "",
            "cf-turnstile-response": ""
        },
        validationSchema: contactSchema(t),
        onSubmit: (data, { resetForm }) => {
            alert(Object.values(data).join(" / "));
            resetForm();
        },
        onReset: () => {
            turnstile.reset();
        }
    });

    useEffect(() => {
        formik.validateForm();
    }, [i18n.language]);

    const handleOnVerify = (token) => {
        formik.setFieldValue("cf-turnstile-response", token);
        if (formik.errors["cf-turnstile-response"]) {
            formik.setFieldError("cf-turnstile-response", '');
        }
    }

    return (
        <section className="contact">
            <motion.form onSubmit={formik.handleSubmit} {...rightIn(0)} data-testid="contactFormTest">
                <h2>{ t(`contact.title`) }</h2>
                <input type="text" name="name" placeholder={t(`contact.form.inputs.name.placeholder`)} onChange={ formik.handleChange } onBlur={ formik.handleBlur } value={ formik.values.name } data-testid="contactFormNameTest"/>
                <span>{ formik.errors.name }</span>
                <input type="email" name="email" placeholder={t(`contact.form.inputs.email.placeholder`)} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} data-testid="contactFormEmailTest"/>
                <span>{ formik.errors.email }</span>
                <textarea name="message" placeholder={t(`contact.form.inputs.message.placeholder`)} cols="30" rows="10" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.message} data-testid="contactFormMessageTest"></textarea>
                <span>{ formik.errors.message }</span>
                <Turnstile sitekey={import.meta.env.VITE_TURNSTILE} action="contact" theme="dark" language={i18n.language} onVerify={handleOnVerify} />
                <span>{ formik.errors["cf-turnstile-response"] }</span>
                <button type="submit" disabled={ formik.isSubmitting } data-testid="contactFormSubmitTest">{formik.isSubmitting ? 'Sending...' : 'Send'}</button>
            </motion.form>
            <motion.div className="formBorder" {...downIn(0)} viewport={{ once: true }}>
                <img src={ burger2 } alt="Burger" />
            </motion.div>
        </section>
    );
};
export default Contact;