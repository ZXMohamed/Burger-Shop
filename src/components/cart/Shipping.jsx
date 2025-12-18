import React, { useEffect, useId, useRef, useState } from "react";
import { Country, State } from "country-state-city";
import { useNavigate, useOutletContext } from "react-router";
import { useFormik } from "formik";
import ShippingSchema from "../../forms/utils/shippingSchema";
import { useOrder } from "../../state/order";
import { useCart } from "../../state/cart";
import { motion } from "framer-motion";
import { upIn } from "../../animation/upIn";
import Turnstile, { useTurnstile } from "react-turnstile";
import { useTranslation } from "react-i18next";
import { createOrder } from "../../utils/createOrder";
import useRequestPayment from "../../hook/useRequestPayment";
import { toast } from "react-toastify";

const Shipping = () => {

  const [clientTurnstile, setClientTurnstile] = useState(<></>);

  const goto = useNavigate();

  const { t, i18n } = useTranslation();

  const { cart } = useOutletContext();

  const emptyCart = useCart((state) => state.empty);

  const addOrder = useOrder((state) => state.add);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  const orderInfoTemp = useRef({});

  const { paymentData, status, requestPayment, currency, currentCurrency } = useRequestPayment();

  const homeNumberId = useId();
  const cityId = useId();
  const countryId = useId();
  const stateId = useId();
  const pinCodeId = useId();
  const phoneNumberId = useId();

  const onUnmount = useRef(() => { console.log("uuuuuu");});

  useEffect(() => {

    Country && setCountries(Country.getAllCountries().map((i, inx) => (
      <option value={ i.isoCode } key={ inx }>
        { i.name }
      </option>
    )));

    State && setStates(State.getStatesOfCountry("IN").map((i, inx) => (
      <option value={ i.isoCode } key={ inx }>
        { i.name }
      </option>
    )));

  }, []);

  useEffect(() => onUnmount.current(), [] );

  const turnstile = useTurnstile();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ShippingSchema(t),
    onSubmit: (orderInfo, { resetForm }) => {
      orderInfoTemp.current = orderInfo;
      requestPayment();
      resetForm();
      turnstile.reset();
    }
  });

  useEffect(() => {
    formik.validateForm();
    setClientTurnstile(<Turnstile sitekey={import.meta.env.VITE_TURNSTILE} action="shipping" theme="dark" language={i18n.language} onVerify={handleOnVerify} style={{justifyContent:"center"}}/>)
  }, [i18n.language]);
  

  useEffect(() => {
    if (status.paymentIsSuccess) {
      const order = createOrder(cart, paymentData?.intention_order_id, orderInfoTemp.current);
      addOrder(order);
      onUnmount.current = () => { console.log("111111111111111111111111111") };//emptyCart();
      window.open(import.meta.env.VITE_PAYMENT_PAGE_URL + paymentData?.client_secret, '_blank', "width=1200,height=800,resizable=yes,scrollbars=yes,status=yes");
      //*user should go to orders page after pay (successful payment)
      //*but this site is frontend, focus on frontend only (no backend)
      //*and no data base, all data saved on zustand (clint state)
      //*so can't perform real payment process 
      //*(just simulation for a menu + cart + payment + orders)
      goto("/myorders");
    }
    else if (status.paymentIsError) {
      toast.error(t(`msgs.payment.failed`));
    }

    if (status.currencyIsError) {
      toast.error(t(`msgs.currency.convertError`));
    }

  }, [paymentData, status]);

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
            <input type="text" id={homeNumberId} name={"homeNumber"} placeholder={ t(`shipping.form.inputs.homeNumber.placeholder`) } value={formik.values.homeNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="homeNumberTest" />
          </div>
          <span>{ formik.errors.homeNumber }</span>
          
          <div>
            <label htmlFor={cityId}>{ t(`shipping.form.inputs.city.label`) }</label>
            <input type="text" id={cityId} name={"city"} placeholder={ t(`shipping.form.inputs.city.placeholder`) }  value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="cityTest" />
          </div>
          <span>{ formik.errors.city }</span>
          
          <div>
            <label htmlFor={countryId}>{ t(`shipping.form.inputs.country.label`) }</label>
            <select id={countryId} name={"country"}  value={formik.values.country}  onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="countryTest">
              <option value="">{ t(`shipping.form.inputs.country.placeholder`) }</option>
              { countries}
            </select>
          </div>
          <span>{ formik.errors.country }</span>
          
          <div>
            <label htmlFor={stateId}>{ t(`shipping.form.inputs.state.label`) }</label>
            <select id={stateId} name={"state"}  value={formik.values.state}  onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="stateTest">
              <option value="">{ t(`shipping.form.inputs.state.placeholder`) }</option>
              { states }
            </select>
          </div>
          <span>{ formik.errors.state }</span>
          
          <div>
            <label htmlFor={pinCodeId}>{ t(`shipping.form.inputs.pinCode.label`) }</label>
            <input type="number" id={pinCodeId} name={"pinCode"} placeholder={ t(`shipping.form.inputs.pinCode.placeholder`) }  value={formik.values.pinCode}  onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="pinCodeTest"/>
          </div>
          <span>{ formik.errors.pinCode }</span>
          
          <div>
            <label htmlFor={phoneNumberId}>{ t(`shipping.form.inputs.phoneNumber.label`) }</label>
            <input type="number" id={phoneNumberId} name={"phoneNumber"} placeholder={ t(`shipping.form.inputs.phoneNumber.placeholder`) }  value={formik.values.phoneNumber}  onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="phoneNumberTest"/>
          </div>
          <span>{ formik.errors.phoneNumber }</span>
          
          <br />
          {clientTurnstile}
          <span>{ formik.errors["cf-turnstile-response"] }</span>
        
          <button type="submit" disabled={formik.isSubmitting} className="link" style={ { outLine: "none", border: "none" } } data-testid="confirmTest"> { formik.isSubmitting ? t(`shipping.form.submit.loadingTitle`) : t(`shipping.form.submit.title`) + currentCurrency } </button>
           
        </form>
      </motion.section>

      { /* FOR DEVELOPER ONLY */}
        <div style={{position:"fixed",bottom:0,right:0,color:"#000000"}}>
          <bdi>استخدم العملة المصرية EGP عند الدفع لان بوابة الدفع في وضع اللإختبار لا تقبل إلا العملة المصرية</bdi>
          <br />
          <bdi>use egypt currency because payment get way apply EGP only in test mode</bdi>
        </div>
      { /* FOR DEVELOPER ONLY */}

    </section>
  );
}

export default Shipping;

const initialValues = {
  homeNumber: '',
  city: '',
  country: '',
  state: '',
  pinCode: '',
  phoneNumber: '',
  "cf-turnstile-response": ""
};