import React, { useContext, useEffect, useRef, useState } from "react";
import { Country, State } from "country-state-city";
import { useMatch, useNavigate } from "react-router-dom";
import { Cart as Cartdb } from "../../cart";
import { Orders as Ordersdb } from "../../orders";
import { toast } from "react-toastify";
const Shipping = () => {
  const goto = useNavigate();
  const page = useMatch("/shipping");
  const Cartdata = useContext(Cartdb);
  const orderscontroll = useContext(Ordersdb);
  const [countries, setcountries] = useState([]);
  const [states, setstates] = useState([]);
  useEffect(() => { 
    if (page && Object.keys(Cartdata.data).length == 0) {
      goto("/");
    }
  })
  const HNo = useRef();
  const City = useRef();
  const Countryref = useRef();
  const Stateref = useRef();
  const PinCode = useRef();
  const PhoneNo = useRef();

  const confirm = () => {
    if (Object.keys(Cartdata.data).length > 0) {
      if (HNo.current.value != "" && City.current.value != "" &&
        Countryref.current.value != "" && Stateref.current.value != "" &&
        PinCode.current.value != "" && PhoneNo.current.value != "") {
        orderscontroll.dispatch({
          type: "add_order",
          payload: {
            order: Cartdata.data,
            ordercode: Math.random().toString().replace(".", ""),
            orderinfo: {
              HNo: HNo.current.value,
              city: City.current.value,
              country: Countryref.current.value,
              state: Stateref.current.value,
              PinCode: PinCode.current.value,
              PhoneNo: PhoneNo.current.value,
              status: "Proccessing",
              paymentmethod: "COD"
            }
          }
        });
        Cartdata.dispatch({ type: "empty_cart" })
        goto("/myorders");
      } else {
        toast.warning("Please fill all fields!");
      }
    } else { 
      toast.error("cart is empty!");
      goto("/");
    }
  }

  useEffect(() => { 
    Country && setcountries(Country.getAllCountries().map((i, inx) => (
      <option value={ i.isoCode } key={ inx }>
        { i.name }
      </option>
    )))

    State && setstates(State.getStatesOfCountry("IN").map((i, inx) => (
      <option value={ i.isoCode } key={ inx }>
        { i.name }
      </option>
    )))
  
  }, [])

  return (
    <section className="shipping">
      <main>
        <h1>Shipping Details</h1>
        <form>
          <div>
            <label>H.No.</label>
            <input ref={HNo} type="text" placeholder="Enter House No." />
          </div>
          <div>
            <label>City</label>
            <input ref={City} type="text" placeholder="Enter City" />
          </div>
          <div>
            <label>Country</label>
            <select ref={Countryref}>
              <option value="">Country</option>
              { countries}
            </select>
          </div>
          <div>
            <label>State</label>
            <select ref={Stateref}>
              <option value="">State</option>
              { states }
            </select>
          </div>
          <div>
            <label>Pin Code</label>
            <input ref={PinCode} type="number" placeholder="Enter Pincode" />
          </div>
          <div>
            <label>Phone No.</label>
            <input ref={PhoneNo} type="number" placeholder="Enter Phone No." />
          </div>

          <button onClick={()=>confirm()} type="button" className="link" style={ { outLine: "none", border: "none" } }> Confirm Order</button>
           
        </form>
      </main>
    </section>
  );
};
export default Shipping;