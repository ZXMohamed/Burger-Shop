import React from 'react'
import { useCurrentCurrency } from '../state/currentCurrency';
import { useCurrency } from '../state/currency';
import useMenu from './useMenu';
import { useOutletContext } from 'react-router';
import { usePayment } from '../state/payment';
import { checkout } from '../utils/checkout';
import { replaceAllKeys } from '../utils/replaceAllKeys';
import { convertToCents, itemsToCents } from '../utils/convertToCents';
import billingData from "../data/billingData.json";
import paymentMethods from "../data/paymentMethods.json";
import { useTranslation } from 'react-i18next';


function useRequestPayment() {

    const { t } = useTranslation();

    const currentCurrency = useCurrentCurrency((state) => state.current);
    const  { data: currency, isSuccess: currencyIsSuccess, isError: currencyIsError }  = useCurrency();

    const menu = useMenu();
    
    const { cart } = useOutletContext();

    const { data: paymentData, mutate: paymentMutate, isSuccess: paymentIsSuccess, isError: paymentIsError } = usePayment();
    

    const requestPayment = () => { 
        if (currencyIsSuccess) {
            const calculateCheckout = checkout(menu, cart, currency.rates[currentCurrency]);
        
            const itemsArr = Object.merge(cart, menu(t, currency.rates[currentCurrency]));
          
            const safeItems = replaceAllKeys(itemsArr, ["title", "price"], ["name", "amount"]);
        
            const items = itemsToCents(safeItems, currentCurrency);
        
            items.push({ "name": "Tax", "amount": convertToCents(currentCurrency, calculateCheckout.tax), "quantity": 1 });
            items.push({ "name": "Shipping", "amount": convertToCents(currentCurrency, calculateCheckout.shipping), "quantity": 1 });
        
            paymentMutate({
                billing_data: billingData,
                amount: convertToCents(currentCurrency, calculateCheckout.total),
                currency: currentCurrency,
                payment_methods: paymentMethods,
                items: items
            });
        } else if(currencyIsError) {
            throw "can't do currency convert operations, check internet connection!"
        }
    }

    return { paymentData, status : {paymentIsSuccess, paymentIsError}, requestPayment };
}

export default useRequestPayment