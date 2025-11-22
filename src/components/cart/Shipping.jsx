import React, { useEffect, useId, useMemo, useState } from "react";
import { Country, State } from "country-state-city";
import { useNavigate, useOutletContext } from "react-router";
import { useFormik } from "formik";
import ShippingSchema from "../../forms/utils/shippingSchema";
import { useOrder } from "../../state/order";
import { useCart } from "../../state/cart";
import { v4 } from "uuid";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import Turnstile, { useTurnstile } from "react-turnstile";
import { useTranslation } from "react-i18next";

const Shipping = () => {

  const goto = useNavigate();

  const { t, i18n } = useTranslation();

  const { cart } = useOutletContext();
  const emptyCart = useCart((state) => state.empty);

  const addOrder = useOrder((state) => state.add);

  const orderId = useMemo(() => v4(), []);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const homeNumberId = useId();
  const cityId = useId();
  const countryId = useId();
  const stateId = useId();
  const pinCodeId = useId();
  const phoneNumberId = useId();

  let onUnmount = () => { };

  useEffect(() => {

    Country && setCountries(Country.getAllCountries().map((i, inx) => (
      <option value={ i.isoCode } key={ inx }>
        { i.name }
      </option>
    )))

    State && setStates(State.getStatesOfCountry("IN").map((i, inx) => (
      <option value={ i.isoCode } key={ inx }>
        { i.name }
      </option>
    )))

  }, []);

  useEffect(() => onUnmount(), []);

  const turnstile = useTurnstile();

  const formik = useFormik({
    initialValues: {
      homeNumber: '',
      city: '',
      country: '',
      state: '',
      pinCode: '',
      phoneNumber: '',
      "cf-turnstile-response": ""
    },
    validationSchema: ShippingSchema(t),
    onSubmit: (value, { resetForm }) => {
      addOrder({
        order: cart,
        orderCode: orderId,
        orderInfo: {
          HNo: value.homeNumber,
          city: value.city,
          country: value.country,
          state: value.state,
          PinCode: value.pinCode,
          PhoneNo: value.phoneNumber,
          status: "Processing",
          paymentMethod: "COD"
        }
      });
      onUnmount = () => emptyCart();
      goto("/myorders", { replace: true });
      resetForm();
      turnstile.reset();
    }
  });

  useEffect(() => {
    formik.validateForm();
  },[i18n.language]);

  const handleOnVerify = (token) => {
    formik.setFieldValue("cf-turnstile-response", token);
    if (formik.errors["cf-turnstile-response"]) {
        formik.setFieldError("cf-turnstile-response", '');
    }
  }

  return (
    <section className="shipping">
      <motion.section {...upIn(0)}>
        <h1>{ t(`shipping.title`) }</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor={ homeNumberId }>{ t(`shipping.form.inputs.homeNumber.label`) }</label>
            <input type="text" id={homeNumberId} name={"homeNumber"} placeholder={ t(`shipping.form.inputs.homeNumber.placeholder`) } onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="homeNumberTest" />
          </div>
          <span>{ formik.errors.homeNumber }</span>
          
          <div>
            <label htmlFor={cityId}>{ t(`shipping.form.inputs.city.label`) }</label>
            <input type="text" id={cityId} name={"city"} placeholder={ t(`shipping.form.inputs.city.placeholder`) } onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="cityTest" />
          </div>
          <span>{ formik.errors.city }</span>
          
          <div>
            <label htmlFor={countryId}>{ t(`shipping.form.inputs.country.label`) }</label>
            <select id={countryId} name={"country"} onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="countryTest">
              <option value="">{ t(`shipping.form.inputs.country.placeholder`) }</option>
              { countries}
            </select>
          </div>
          <span>{ formik.errors.country }</span>
          
          <div>
            <label htmlFor={stateId}>{ t(`shipping.form.inputs.state.label`) }</label>
            <select id={stateId} name={"state"} onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="stateTest">
              <option value="">{ t(`shipping.form.inputs.state.placeholder`) }</option>
              { states }
            </select>
          </div>
          <span>{ formik.errors.state }</span>
          
          <div>
            <label htmlFor={pinCodeId}>{ t(`shipping.form.inputs.pinCode.label`) }</label>
            <input type="number" id={pinCodeId} name={"pinCode"} placeholder={ t(`shipping.form.inputs.pinCode.placeholder`) } onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="pinCodeTest"/>
          </div>
          <span>{ formik.errors.pinCode }</span>
          
          <div>
            <label htmlFor={phoneNumberId}>{ t(`shipping.form.inputs.phoneNumber.label`) }</label>
            <input type="number" id={phoneNumberId} name={"phoneNumber"} placeholder={ t(`shipping.form.inputs.phoneNumber.placeholder`) } onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="phoneNumberTest"/>
          </div>
          <span>{ formik.errors.phoneNumber }</span>
          
          <br />
          <Turnstile sitekey={import.meta.env.VITE_TURNSTILE} action="shipping" theme="dark" language={i18n.language} onVerify={handleOnVerify} style={{justifyContent:"center"}}/>
          <span>{ formik.errors["cf-turnstile-response"] }</span>
          
          <button type="submit" disabled={formik.isSubmitting} className="link" style={ { outLine: "none", border: "none" } } data-testid="confirmTest">
            { formik.isSubmitting ?
              t(`shipping.form.submit.loadingTitle`)
              :
              t(`shipping.form.submit.title`) }
          </button>
           
        </form>
      </motion.section>
    </section>
  );
}

export default Shipping;