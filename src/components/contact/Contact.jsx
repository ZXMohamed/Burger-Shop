import React from "react";
import { motion } from "framer-motion";
import { rightIn } from "../../animation/rightIn";
import { downIn } from "../../animation/downIn";
import { useFormik } from "formik";
import ContactSchema from "../../forms/utils/contactSchema";
import toast from "react-hot-toast";
import { burger2 } from "../../assets/images/images";

const Contact = () => {
   
    const form = useFormik({
        initialValues: {
            name:"",
            email:"",
            message:"",
        },
        validationSchema: ContactSchema,
        onSubmit: (data, { resetForm }) => {
            alert(Object.values(data).join(" / "));
            resetForm();
        }
    });

    return (
        <section className="contact">
            <motion.form onSubmit={form.handleSubmit} {...rightIn(0)} data-testid="contactFormTest">
                <h2>Contact Us</h2>
                <input type="text" name="name" placeholder="Name" onChange={ form.handleChange } onBlur={ form.handleBlur } value={ form.values.name } data-testid="contactFormNameTest"/>
                <span>{ form.errors.name }</span>
                <input type="email" name="email" placeholder="Email" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.email} data-testid="contactFormEmailTest"/>
                <span>{ form.errors.email }</span>
                <textarea name="message" placeholder="Message..." cols="30" rows="10" onChange={form.handleChange} onBlur={form.handleBlur} value={form.values.message} data-testid="contactFormMessageTest"></textarea>
                <span>{ form.errors.message }</span>
                <button type="submit" disabled={ form.isSubmitting } data-testid="contactFormSubmitTest">
                    {form.isSubmitting ? 'Sending...' : 'Send'}
                </button>
            </motion.form>
            <motion.div className="formBorder" {...downIn(0)} viewport={{ once: true }}>
                <img src={ burger2 } alt="Burger" />
            </motion.div>
        </section>
    );
};
export default Contact;