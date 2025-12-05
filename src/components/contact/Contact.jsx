import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { downIn } from "../../animation/downIn";
import { useFormik } from "formik";
import contactSchema from "../../forms/utils/contactSchema";
import { burger2 } from "../../assets/images/images";
import Turnstile, { useTurnstile } from "react-turnstile";
import { useTranslation } from "react-i18next";
import useEmail from "../../hook/useEmail";
import { toast } from "react-toastify";

const Contact = () => {

    const { t, i18n } = useTranslation();

    const turnstile = useTurnstile();

    const email = useEmail();
    
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: contactSchema(t),
        onSubmit: (data, { resetForm }) => {
            data.subject = "burger shop";
            delete data["cf-turnstile-response"];
            email(data, () => toast.success(t(`msgs.contact.success`)), () => toast.error(t(`msgs.contact.failed`)));
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
        <main className="contact">
            <motion.form onSubmit={formik.handleSubmit} {...rightIn(0)} data-testid="contactFormTest">
                <h1>{ t(`contact.title`) }</h1>
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
            <motion.div className="side" {...downIn(0)} viewport={{ once: true }}>
                <img src={ burger2 } alt="Burger" />
            </motion.div>
        </main>
    );
};
export default Contact;

const initialValues = {
    name: "",
    email: "",
    message: "",
    "cf-turnstile-response": ""
};