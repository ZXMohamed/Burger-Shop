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

const Shipping = () => {

  const goto = useNavigate();

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

  const formik = useFormik({
    initialValues: {
      homeNumber: '',
      city: '',
      country: '',
      state: '',
      pinCode: '',
      phoneNumber: '',
    },
    validationSchema: ShippingSchema,
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
    }
  });


  return (
    <section className="shipping">
      <motion.section {...upIn(0)}>
        <h1>Shipping Details</h1>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <label htmlFor={homeNumberId}>H.No.</label>
            <input type="text" id={homeNumberId} name={"homeNumber"} placeholder="Enter House No." onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="homeNumberTest" />
          </div>
          <span>{ formik.errors.homeNumber }</span>
          
          <div>
            <label htmlFor={cityId}>City</label>
            <input type="text" id={cityId} name={"city"} placeholder="Enter City" onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="cityTest" />
          </div>
          <span>{ formik.errors.city }</span>
          
          <div>
            <label htmlFor={countryId}>Country</label>
            <select id={countryId} name={"country"} onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="countryTest">
              <option value="">Country</option>
              { countries}
            </select>
          </div>
          <span>{ formik.errors.country }</span>
          
          <div>
            <label htmlFor={stateId}>State</label>
            <select id={stateId} name={"state"} onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="stateTest">
              <option value="">State</option>
              { states }
            </select>
          </div>
          <span>{ formik.errors.state }</span>
          
          <div>
            <label htmlFor={pinCodeId}>Pin Code</label>
            <input type="number" id={pinCodeId} name={"pinCode"} placeholder="Enter Pin code" onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="pinCodeTest"/>
          </div>
          <span>{ formik.errors.pinCode }</span>
          
          <div>
            <label htmlFor={phoneNumberId}>Phone No.</label>
            <input type="number" id={phoneNumberId} name={"phoneNumber"} placeholder="Enter Phone No." onChange={formik.handleChange} onBlur={formik.handleBlur} onReset={formik.handleReset} data-testid="phoneNumberTest"/>
          </div>
          <span>{ formik.errors.phoneNumber }</span>
          

          <button type="submit" disabled={formik.isSubmitting} className="link" style={ { outLine: "none", border: "none" } } data-testid="confirmTest">
            {formik.isSubmitting?"Confirming Order":"Confirm Order"}
          </button>
           
        </form>
      </motion.section>
    </section>
  );
}

export default Shipping;