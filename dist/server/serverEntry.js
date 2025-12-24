import { jsxDEV, Fragment } from "react/jsx-dev-runtime";
import React, { createContext, useContext, Component, useState, useId, memo, useRef, useEffect, Children, cloneElement, useCallback, useMemo } from "react";
import { renderToString } from "react-dom/server";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import { toast, ToastContainer } from "react-toastify";
import { create } from "zustand";
import { Country, State } from "country-state-city";
import axios from "axios";
import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import fastCompare from "react-fast-compare";
import invariant from "invariant";
import shallowEqual from "shallowequal";
import { useLocation, NavLink, Link, useNavigate, useOutletContext, useMatch, Outlet, useParams, useRoutes, StaticRouter } from "react-router";
import { motion, useScroll, useTransform, animate } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import icons from "currency-icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import Turnstile, { useTurnstile } from "react-turnstile";
import emailjs from "@emailjs/browser";
const homeBackground = "/assets/homeBackground.TEMP-2u0XW46w.webp";
const gradientBackground = "/assets/gradientBackground.TEMP-elDjG_EF.webp";
const founderBackground = "/assets/founderBackground.TEMP-BdcWrVTX.webp";
const burger1 = "/assets/burger1.TEMP-BcTxd3-I.webp";
const burger2 = "/assets/burger2.TEMP-DmdCebjq.webp";
const burger3 = "/assets/burger3.TEMP-iCqbbz06.webp";
const owner = "/assets/owner.TEMP-B4QBmM-t.webp";
const loading$3 = "/assets/loading-sWLCSsqG.webp";
const logo = "assets/logo-BepfS2qk.svg";
async function loadMainImage(image, ref, options, onError = () => {
}) {
  if (window.requestIdleCallback) {
    requestIdleCallback(async () => {
      await load(image, ref, options, onError);
    });
  } else {
    await load(image, ref, options, onError);
  }
  async function load(image2, ref2, options2, onError2 = () => {
  }) {
    const mainImage = image2.replace(".TEMP", "");
    try {
      const response = await axios.get(mainImage, { responseType: "blob" });
      const blob = response.data;
      const blobUrl = URL.createObjectURL(blob);
      if (options2.type === "img") {
        ref2.current?.src && (ref2.current.src = blobUrl);
      } else if (options2.type === "background") {
        ref2.current?.style && (ref2.current.style.backgroundImage = `url(${blobUrl})`);
      }
    } catch (error) {
      onError2();
    }
  }
}
function convertCurrency(price, rate) {
  return (price * rate).toFixed(2);
}
const data = (t, priceRate = 1) => ({
  "1": { id: "1", name: t(`menu.1.name`), price: convertCurrency("2.23", priceRate), photo: burger1 },
  "2": { id: "2", name: t(`menu.2.name`), price: convertCurrency("5.58", priceRate), photo: burger2 },
  "3": { id: "3", name: t(`menu.3.name`), price: convertCurrency("20.08", priceRate), photo: burger3 }
});
const Menu$1 = createContext(data);
function MenuProvider({ children }) {
  return /* @__PURE__ */ jsxDEV(Menu$1.Provider, { value: data, children }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/menu/menuProvider.jsx",
    lineNumber: 8,
    columnNumber: 9
  }, this);
}
const LanguageContext = createContext(() => {
});
const detectLanguage = () => {
  const savedLanguage = typeof window !== "undefined" ? localStorage.getItem("language") : "en";
  if (savedLanguage) {
    changeBrowserLanguage(savedLanguage);
    return savedLanguage;
  } else {
    const language = (navigator.language || navigator.userLanguage)?.split("-")[0];
    let browserLanguage = "";
    if (language && resources[language]) {
      browserLanguage = language;
    } else {
      browserLanguage = "en";
    }
    changeBrowserLanguage(browserLanguage);
    return browserLanguage;
  }
};
const nav$2 = { "tabs": { "home": "home", "contact": "contact", "orders": "orders", "about": "about" } };
const footer$2 = { "logo": { "title": "Burger Shop", "description": "We are trying to give you the best taste possible.", "feedback": "We give attention to genuine feedback.", "rights": "All right received @burgershop" }, "social": { "title": "follow us" } };
const layout_EN = {
  nav: nav$2,
  footer: footer$2
};
const home$2 = { "hero": { "title": "Burger Shop", "description": "Give yourself a tasty burger.", "exploreMenu": "Explore Menu" }, "menu": { "title": "MENU", "buyNow": "Buy Now" }, "founder": { "name": "Nelson", "about": "Hey, Everyone I am Nelson, the founder of Burger Shop. Our aim is to create the most tasty burger on planet." } };
const about$2 = { "title": "About Us", "shop": { "title": "Burger Shop", "description": "This is Burger Shop. The place for most tasty burgers on the enitre earth.", "menuLinkDescription": "Explore the various type of food and burgers. Click below to see the menu" }, "founder": { "title": "Founder", "name": "Nelson", "about": "I am Nelson, the founder of Burger Shop. Affiliated to God Taste..." } };
const contact$2 = { "title": "Contact Us", "form": { "inputs": { "name": { "placeholder": "Name" }, "email": { "placeholder": "Email" }, "message": { "placeholder": "Message" } }, "submit": { "title": "send" } } };
const cart$2 = { "title": "Checkout", "calculation": { "subTotal": "Sub Total", "tax": "Tax", "shippingCharges": "Shipping Charges", "total": "total" }, "confirmButton": { "title": "Confirm" } };
const loading$2 = { "title": "Loading..." };
const shipping$2 = { "title": "Shipping Details", "form": { "inputs": { "homeNumber": { "label": "H.No", "placeholder": "House No." }, "city": { "label": "City", "placeholder": "City" }, "country": { "label": "Country", "placeholder": "Country" }, "state": { "label": "State", "placeholder": "State" }, "pinCode": { "label": "Pin Code", "placeholder": "Pin code" }, "phoneNumber": { "label": "Phone No.", "placeholder": "Phone No." } }, "submit": { "title": "Checkout in ", "loadingTitle": "Confirming Order" } } };
const myOrders$2 = { "ordersTable": { "header": { "orderId": "Order Id", "status": "Status", "totalPrice": "Total Price", "paymentMethod": "Payment Method", "action": "Action" } }, "status": { "processing": "Processing" }, "paymentMethods": { "card": "card" } };
const orderDetails$2 = { "title": "Order Details", "details": { "shipping": { "title": "Shipping", "items": { "address": "Address", "pinCode": "Pin Code" } }, "contact": { "title": "Contact", "items": { "phone": "Phone" } }, "status": { "title": "Status", "items": { "orderStatus": "Order Status" } }, "payment": { "title": "Payment", "items": { "paymentMethod": "Payment Method" } }, "amount": { "title": "Amount", "items": { "itemsTotal": "Items Total", "shippingCharges": "Shipping Charges", "tax": "Tax", "total": "Total" } }, "orderedItems": { "title": "Ordered Items" } } };
const pages_EN = {
  home: home$2,
  about: about$2,
  contact: contact$2,
  cart: cart$2,
  loading: loading$2,
  shipping: shipping$2,
  myOrders: myOrders$2,
  orderDetails: orderDetails$2
};
const menu$2 = { "1": { "name": "Cheese Burger" }, "2": { "name": "Veg Cheese Burger" }, "3": { "name": "Cheese Burger with French Fries" } };
const menu_EN = {
  menu: menu$2
};
const msgs$2 = { "cart": { "add": "added to cart successfully!", "exist": "is already in cart!", "empty": "cart is empty!", "zeroQuantity": "quantity is zero please add at lest 1!" }, "currency": { "convertError": "can't do currency convert operations" }, "forms": { "min": "%input% is too short (min %length% characters)", "max": "%input% is too long (max %length% characters)", "required": "%input% is required", "validation": "Invalid %input%", "securityCheck": "Complete the security check" }, "contact": { "success": "message sent successfully!", "failed": "can't send message, please try again!" }, "payment": { "failed": "payment error!" }, "orders": { "empty": "orders is empty!", "unKnownId": "unknown order id!" } };
const msgs_EN = {
  msgs: msgs$2
};
const SEO$3 = { "title": "Burger Shop", "description": "This is Burger Shop. The place for most tasty burgers on the entire earth. Explore the various type of food and burgers", "keywords": "Burger Shop, tasty burgers, food, Menu, Cheese Burger, Veg Cheese Burger, Cheese Burger with French Fries, delivery, contact, about, order", "LD_Json": { "servesCuisine": ["Egyptian", "English", "Indian"] } };
const SEO_EN = {
  SEO: SEO$3
};
const nav$1 = { "tabs": { "home": "الرئيسية", "contact": "التواصل", "orders": "الطلبات", "about": "من نحن" } };
const footer$1 = { "logo": { "title": "مطعم برجر", "description": "نحن نسعي لتوفير افضل مذاق ممكن", "feedback": "نحن نهتم بالتعليقات الحقيقية.", "rights": "جميع الحقوق محفوظة لدي @burgershop" }, "social": { "title": "تابعنا علي" } };
const layout_AR = {
  nav: nav$1,
  footer: footer$1
};
const home$1 = { "hero": { "title": "متجر برجر", "description": "أعطي نفسك برجر لذيذ.", "exploreMenu": "استكشاف القائمة" }, "menu": { "title": "القائمة", "buyNow": "شراء" }, "founder": { "name": "نيلسون", "about": "أهلاً بالجميع، أنا نيلسون، مؤسس برجر شوب. هدفنا هو تقديم ألذ برجر في العالم." } };
const about$1 = { "title": "معلومات عنا", "shop": { "title": "متجر برجر", "description": "هذا هو برجر شوب. المكان الأمثل لأشهى البرجر في العالم.", "menuLinkDescription": "استكشف مختلف أنواع الطعام والبرجر. انقر أدناه للاطلاع على القائمة." }, "founder": { "title": "مؤسس", "name": "نيلسون", "about": "أنا نيلسون، مؤسس برجر شوب. تابعٌ لمؤسسة جود تيست..." } };
const contact$1 = { "title": "اتصل بنا", "form": { "inputs": { "name": { "placeholder": "الأسم" }, "email": { "placeholder": "البريد الإلكتروني" }, "message": { "placeholder": "الرسالة" } }, "submit": { "title": "إرسال" } } };
const cart$1 = { "title": "الدفع", "calculation": { "subTotal": "الحساب", "tax": "ضريبة", "shippingCharges": "رسوم الشحن", "total": "المجموع" }, "confirmButton": { "title": "تأكيد" } };
const loading$1 = { "title": "تحميل الصفحة ..." };
const shipping$1 = { "title": "تفاصيل الشحن", "form": { "inputs": { "homeNumber": { "label": "رقم المنزل", "placeholder": "رقم المنزل" }, "city": { "label": "المدينة", "placeholder": " المدينة" }, "country": { "label": "الدولة", "placeholder": "الدولة" }, "state": { "label": "الولاية", "placeholder": "الولاية" }, "pinCode": { "label": "الرمز البريدي", "placeholder": "الرمز البريدي" }, "phoneNumber": { "label": "الهاتف", "placeholder": " رقم الهاتف" } }, "submit": { "title": "دفع بـ ", "loadingTitle": "جاري تأكيد الطلب" } } };
const myOrders$1 = { "ordersTable": { "header": { "orderId": "id", "status": "الحالة", "totalPrice": "الإجمالي", "paymentMethod": "طريقة الدفع", "action": "امر" } }, "status": { "processing": "جاري التوصيل" }, "paymentMethods": { "card": "بطاقة بنكية" } };
const orderDetails$1 = { "title": "تفاصيل الطلب", "details": { "shipping": { "title": "شحن", "items": { "address": "عنوان", "pinCode": "رقم بريدي" } }, "contact": { "title": "اتصال", "items": { "phone": "هاتف" } }, "status": { "title": "حالة", "items": { "orderStatus": "حالة الطلب" } }, "payment": { "title": "الدفع", "items": { "paymentMethod": "طريقة الدفع" } }, "amount": { "title": "السعر", "items": { "itemsTotal": "سعر الطلب", "shippingCharges": "رسوم الشحن", "tax": "ضريبة", "total": "الإجمالي" } }, "orderedItems": { "title": "الطلب" } } };
const pages_AR = {
  home: home$1,
  about: about$1,
  contact: contact$1,
  cart: cart$1,
  loading: loading$1,
  shipping: shipping$1,
  myOrders: myOrders$1,
  orderDetails: orderDetails$1
};
const menu$1 = { "1": { "name": "برجر بالجبن" }, "2": { "name": "برجر نباتي بالجبن" }, "3": { "name": "برجر بالجبن مع البطاطس المقلية" } };
const menu_AR = {
  menu: menu$1
};
const msgs$1 = { "cart": { "add": "تمت الإضافة", "exist": "موجود بالفعل", "empty": "العربة فارغة", "zeroQuantity": "الكمية صفر، يرجى إضافة 1 على الأقل" }, "currency": { "convertError": "لايمكن تنفيذ عمليات تحويل العملة" }, "forms": { "min": "%input% قصير جدًا (الحد الأدنى %length% حرف)", "max": "%input% طويل جدًا (الحد الأقصى %length% حرفًا)", "required": "%input% مطلوب", "validation": "%input% غير صالح", "securityCheck": "إكمال فحص الأمان" }, "contact": { "success": "تم الإرسال بنجاح", "failed": "لايمكن الإرسال حاول مرة أخري" }, "payment": { "failed": "خطأ في عملية الدفع" }, "orders": { "empty": "الطلبات فارغة!", "unKnownId": "الطلب غير معروف!" } };
const msgs_AR = {
  msgs: msgs$1
};
const SEO$2 = { "title": "محل برجر", "description": "هذا هو مطعم برجر شوب. المكان الأمثل لتناول ألذ أنواع البرجر في العالم. اكتشف تشكيلة واسعة من الأطعمة والبرجر.", "keywords": "محل برجر، برجر لذيذ، طعام، قائمة طعام، برجر بالجبنة، برجر بالجبنة نباتي، برجر بالجبنة مع بطاطا مقلية، خدمة توصيل، تواصل، نبذة عنا، اطلب الآن", "LD_Json": { "servesCuisine": ["مصري", "إنجليزي", "هندي"] } };
const SEO_AR = {
  SEO: SEO$2
};
const nav = { "tabs": { "home": "घर", "contact": "संपर्क", "orders": "आदेश", "about": "के बारे में" } };
const footer = { "logo": { "title": "बर्गर की दुकान", "description": "हम आपको सबसे अच्छा स्वाद देने की कोशिश कर रहे हैं।", "feedback": "हम असली फ़ीडबैक पर ध्यान देते हैं।", "rights": "सभी अधिकार प्राप्त @burgershop" }, "social": { "title": "हमारे पर का पालन करें" } };
const layout_HI = {
  nav,
  footer
};
const home = { "hero": { "title": "बर्गर की दुकान", "description": "अपने आप को एक स्वादिष्ट बर्गर दीजिए।", "exploreMenu": "मेनू एक्सप्लोर करें" }, "menu": { "title": "मेनू", "buyNow": "अभी खरीदें" }, "founder": { "name": "नेल्सन", "about": "हेलो दोस्तों, मैं नेल्सन हूँ, बर्गर शॉप का फाउंडर। हमारा मकसद दुनिया का सबसे टेस्टी बर्गर बनाना है।" } };
const about = { "title": "हमारे बारे में", "shop": { "title": "बर्गर की दुकान", "description": "यह बर्गर शॉप है। पूरी दुनिया में सबसे स्वादिष्ट बर्गर के लिए जगह।", "menuLinkDescription": "अलग-अलग तरह के खाने और बर्गर देखें। मेन्यू देखने के लिए नीचे क्लिक करें।" }, "founder": { "title": "संस्थापक", "name": "नेल्सन", "about": "मैं नेल्सन हूं, बर्गर शॉप का फाउंडर। गॉड टेस्ट से जुड़ा हुआ..." } };
const contact = { "title": "हमसे संपर्क करें", "form": { "inputs": { "name": { "placeholder": "नाम" }, "email": { "placeholder": "ईमेल" }, "message": { "placeholder": "संदेश" } }, "submit": { "title": "भेजना" } } };
const cart = { "title": "चेक आउट", "calculation": { "subTotal": "उप-योग", "tax": "कर", "shippingCharges": "शिपिंग शुल्क", "total": "कुल" }, "confirmButton": { "title": "पुष्टि करना" } };
const loading = { "title": "लोड हो रहा है..." };
const shipping = { "title": "शिपिंग की जानकारियां", "form": { "inputs": { "homeNumber": { "label": "मकान नंबर।", "placeholder": "मकान नंबर डालें" }, "city": { "label": "शहर", "placeholder": "शहर दर्ज करें" }, "country": { "label": "देश", "placeholder": "देश" }, "state": { "label": "राज्य", "placeholder": "राज्य" }, "pinCode": { "label": "पिन कोड", "placeholder": "पिन कोड डालें" }, "phoneNumber": { "label": "फ़ोन", "placeholder": "फ़ोन नंबर डालें" } }, "submit": { "title": "चेकआउट करें ", "loadingTitle": "ऑर्डर कन्फर्म हो रहा है" } } };
const myOrders = { "ordersTable": { "header": { "orderId": "Id", "status": "स्थिति", "totalPrice": "कुल कीमत", "paymentMethod": "भुगतान विधि", "action": "कार्रवाई" } }, "status": { "processing": "प्रसंस्करण" }, "paymentMethods": { "card": "डिलवरी पर नकदी" } };
const orderDetails = { "title": "ऑर्डर का विवरण", "details": { "shipping": { "title": "शिपिंग", "items": { "address": "पता", "pinCode": "पिन कोड" } }, "contact": { "title": "संपर्क", "items": { "phone": "फ़ोन" } }, "status": { "title": "स्थिति", "items": { "orderStatus": "आदेश की स्थिति" } }, "payment": { "title": "भुगतान", "items": { "paymentMethod": "भुगतान विधि" } }, "amount": { "title": "मात्रा", "items": { "itemsTotal": "कुल आइटम", "shippingCharges": "शिपिंग शुल्क", "tax": "कर", "total": "कुल" } }, "orderedItems": { "title": "ऑर्डर किए गए आइटम" } } };
const pages_HI = {
  home,
  about,
  contact,
  cart,
  loading,
  shipping,
  myOrders,
  orderDetails
};
const menu = { "1": { "name": "चीज़ बर्गर" }, "2": { "name": "वेज चीज़ बर्गर" }, "3": { "name": "फ्रेंच फ्राइज़ के साथ चीज़ बर्गर" } };
const menu_HI = {
  menu
};
const msgs = { "cart": { "add": "कार्ट में सफलतापूर्वक जोड़ा गया!", "exist": "पहले से ही कार्ट में है!", "empty": "कार्ट खाली है!", "zeroQuantity": "मात्रा ज़ीरो है, कृपया कम से कम 1 जोड़ें!" }, "currency": { "convertError": "मुद्रा बदलने का काम नहीं कर सकते" }, "forms": { "min": "%input% बहुत छोटा है (कम से कम %length% कैरेक्टर)", "max": "%input% बहुत लंबा है (अधिकतम %length% वर्ण)", "required": "%input% आवश्यक है", "validation": "अमान्य %input%", "securityCheck": "सिक्योरिटी चेक पूरा करें" }, "contact": { "success": "मैसेज सफलतापूर्वक भेजा गया!", "failed": "मैसेज नहीं भेज पा रहा हूँ, कृपया फिर से कोशिश करें!" }, "payment": { "failed": "पेमेंट में गलती!" }, "orders": { "empty": "ऑर्डर खाली हैं!", "unKnownId": "अनजान ऑर्डर!" } };
const msgs_HI = {
  msgs
};
const SEO$1 = { "title": "बर्गर की दुकान", "description": "यह बर्गर शॉप है। पूरी दुनिया में सबसे ज़्यादा टेस्टी बर्गर के लिए जगह। अलग-अलग तरह के खाने और बर्गर एक्सप्लोर करें।", "keywords": "बर्गर शॉप, टेस्टी बर्गर, खाना, मेन्यू, चीज़ बर्गर, वेज चीज़ बर्गर, फ्रेंच फ्राइज़ के साथ चीज़ बर्गर, डिलीवरी, कॉन्टैक्ट, अबाउट, ऑर्डर", "LD_Json": { "servesCuisine": ["मिस्र के", "अंग्रेज़ी", "भारतीय"] } };
const SEO_HI = {
  SEO: SEO$1
};
const resources = {
  en: { alias: "en", translation: { ...layout_EN, ...pages_EN, ...menu_EN, ...msgs_EN, ...SEO_EN } },
  ar: { alias: "ع", translation: { ...layout_AR, ...pages_AR, ...menu_AR, ...msgs_AR, ...SEO_AR } },
  hi: { alias: "ह", translation: { ...layout_HI, ...pages_HI, ...menu_HI, ...msgs_HI, ...SEO_HI } }
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false
  }
});
const changeLanguage = (language) => {
  i18n.changeLanguage(language);
  changeBrowserLanguage(language);
  typeof window !== "undefined" && localStorage.setItem("language", language);
};
function changeBrowserLanguage(language) {
  const locale = new Intl.Locale(language);
  const direction = locale.getTextInfo().direction;
  typeof document !== "undefined" && (document.documentElement.lang = language);
  typeof document !== "undefined" && (document.documentElement.dir = direction);
}
const LanguageProvider = ({ children }) => {
  return /* @__PURE__ */ jsxDEV(LanguageContext.Provider, { value: { changeLanguage }, children }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/language/languageProvider.jsx",
    lineNumber: 8,
    columnNumber: 5
  }, void 0);
};
const pageInfo = (t, i18n2) => ({
  title: t(`SEO.title`),
  description: t(`SEO.description`),
  icon: logo,
  image: logo,
  type: "Restaurant",
  url: "http://localhost:5173/",
  language: i18n2.language,
  keywords: t(`SEO.keywords`),
  LD_Json: {}
});
function useMenu() {
  const menuData = useContext(Menu$1);
  return menuData;
}
const detectCurrency = async () => {
  const savedCurrency = typeof window !== "undefined" ? localStorage.getItem("currency") : "USD";
  if (savedCurrency) {
    return savedCurrency;
  } else {
    let countryCode = "";
    const country = (navigator.language || navigator.userLanguage)?.split("-")[1];
    if (country) {
      countryCode = country;
    } else {
      try {
        const res = await axios.get("https://ipapi.co/json/");
        const { country: country2 } = res.data;
        countryCode = country2;
      } catch (error) {
        countryCode = "USA";
      }
    }
    const { currency } = Country.getCountryByCode(countryCode);
    typeof window !== "undefined" && localStorage.setItem("currency", currency);
    return currency;
  }
};
const useCurrentCurrency = create((set) => ({
  current: "USD",
  set: (payload) => set((state) => ({
    ...state,
    current: payload.current
  })),
  detect: async () => {
    const currency = await detectCurrency();
    set((state) => ({
      ...state,
      current: currency
    }));
  }
}));
const useCurrency = (base = "USD") => {
  return useQuery({
    queryKey: ["currency", base],
    queryFn: async () => {
      try {
        const res = await axios.get(`${"https://api.exchangerate-api.com/v4/latest/"}${base}`);
        return res.data;
      } catch (error) {
        return error.response || error;
      }
    }
  });
};
var TAG_NAMES = /* @__PURE__ */ ((TAG_NAMES2) => {
  TAG_NAMES2["BASE"] = "base";
  TAG_NAMES2["BODY"] = "body";
  TAG_NAMES2["HEAD"] = "head";
  TAG_NAMES2["HTML"] = "html";
  TAG_NAMES2["LINK"] = "link";
  TAG_NAMES2["META"] = "meta";
  TAG_NAMES2["NOSCRIPT"] = "noscript";
  TAG_NAMES2["SCRIPT"] = "script";
  TAG_NAMES2["STYLE"] = "style";
  TAG_NAMES2["TITLE"] = "title";
  TAG_NAMES2["FRAGMENT"] = "Symbol(react.fragment)";
  return TAG_NAMES2;
})(TAG_NAMES || {});
var SEO_PRIORITY_TAGS = {
  link: { rel: ["amphtml", "canonical", "alternate"] },
  script: { type: ["application/ld+json"] },
  meta: {
    charset: "",
    name: ["generator", "robots", "description"],
    property: [
      "og:type",
      "og:title",
      "og:url",
      "og:image",
      "og:image:alt",
      "og:description",
      "twitter:url",
      "twitter:title",
      "twitter:description",
      "twitter:image",
      "twitter:image:alt",
      "twitter:card",
      "twitter:site"
    ]
  }
};
var VALID_TAG_NAMES = Object.values(TAG_NAMES);
var REACT_TAG_MAP = {
  accesskey: "accessKey",
  charset: "charSet",
  class: "className",
  contenteditable: "contentEditable",
  contextmenu: "contextMenu",
  "http-equiv": "httpEquiv",
  itemprop: "itemProp",
  tabindex: "tabIndex"
};
var HTML_TAG_MAP = Object.entries(REACT_TAG_MAP).reduce(
  (carry, [key, value]) => {
    carry[value] = key;
    return carry;
  },
  {}
);
var HELMET_ATTRIBUTE = "data-rh";
var HELMET_PROPS = {
  DEFAULT_TITLE: "defaultTitle",
  DEFER: "defer",
  ENCODE_SPECIAL_CHARACTERS: "encodeSpecialCharacters",
  ON_CHANGE_CLIENT_STATE: "onChangeClientState",
  TITLE_TEMPLATE: "titleTemplate",
  PRIORITIZE_SEO_TAGS: "prioritizeSeoTags"
};
var getInnermostProperty = (propsList, property) => {
  for (let i = propsList.length - 1; i >= 0; i -= 1) {
    const props = propsList[i];
    if (Object.prototype.hasOwnProperty.call(props, property)) {
      return props[property];
    }
  }
  return null;
};
var getTitleFromPropsList = (propsList) => {
  let innermostTitle = getInnermostProperty(
    propsList,
    "title"
    /* TITLE */
  );
  const innermostTemplate = getInnermostProperty(propsList, HELMET_PROPS.TITLE_TEMPLATE);
  if (Array.isArray(innermostTitle)) {
    innermostTitle = innermostTitle.join("");
  }
  if (innermostTemplate && innermostTitle) {
    return innermostTemplate.replace(/%s/g, () => innermostTitle);
  }
  const innermostDefaultTitle = getInnermostProperty(propsList, HELMET_PROPS.DEFAULT_TITLE);
  return innermostTitle || innermostDefaultTitle || void 0;
};
var getOnChangeClientState = (propsList) => getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) || (() => {
});
var getAttributesFromPropsList = (tagType, propsList) => propsList.filter((props) => typeof props[tagType] !== "undefined").map((props) => props[tagType]).reduce((tagAttrs, current) => ({ ...tagAttrs, ...current }), {});
var getBaseTagFromPropsList = (primaryAttributes, propsList) => propsList.filter((props) => typeof props[
  "base"
  /* BASE */
] !== "undefined").map((props) => props[
  "base"
  /* BASE */
]).reverse().reduce((innermostBaseTag, tag) => {
  if (!innermostBaseTag.length) {
    const keys = Object.keys(tag);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const lowerCaseAttributeKey = attributeKey.toLowerCase();
      if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
        return innermostBaseTag.concat(tag);
      }
    }
  }
  return innermostBaseTag;
}, []);
var warn = (msg) => console && typeof console.warn === "function" && console.warn(msg);
var getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
  const approvedSeenTags = {};
  return propsList.filter((props) => {
    if (Array.isArray(props[tagName])) {
      return true;
    }
    if (typeof props[tagName] !== "undefined") {
      warn(
        `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[tagName]}"`
      );
    }
    return false;
  }).map((props) => props[tagName]).reverse().reduce((approvedTags, instanceTags) => {
    const instanceSeenTags = {};
    instanceTags.filter((tag) => {
      let primaryAttributeKey;
      const keys2 = Object.keys(tag);
      for (let i = 0; i < keys2.length; i += 1) {
        const attributeKey = keys2[i];
        const lowerCaseAttributeKey = attributeKey.toLowerCase();
        if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === "rel" && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === "rel" && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
          primaryAttributeKey = lowerCaseAttributeKey;
        }
        if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === "innerHTML" || attributeKey === "cssText" || attributeKey === "itemprop")) {
          primaryAttributeKey = attributeKey;
        }
      }
      if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
        return false;
      }
      const value = tag[primaryAttributeKey].toLowerCase();
      if (!approvedSeenTags[primaryAttributeKey]) {
        approvedSeenTags[primaryAttributeKey] = {};
      }
      if (!instanceSeenTags[primaryAttributeKey]) {
        instanceSeenTags[primaryAttributeKey] = {};
      }
      if (!approvedSeenTags[primaryAttributeKey][value]) {
        instanceSeenTags[primaryAttributeKey][value] = true;
        return true;
      }
      return false;
    }).reverse().forEach((tag) => approvedTags.push(tag));
    const keys = Object.keys(instanceSeenTags);
    for (let i = 0; i < keys.length; i += 1) {
      const attributeKey = keys[i];
      const tagUnion = {
        ...approvedSeenTags[attributeKey],
        ...instanceSeenTags[attributeKey]
      };
      approvedSeenTags[attributeKey] = tagUnion;
    }
    return approvedTags;
  }, []).reverse();
};
var getAnyTrueFromPropsList = (propsList, checkedTag) => {
  if (Array.isArray(propsList) && propsList.length) {
    for (let index = 0; index < propsList.length; index += 1) {
      const prop = propsList[index];
      if (prop[checkedTag]) {
        return true;
      }
    }
  }
  return false;
};
var reducePropsToState = (propsList) => ({
  baseTag: getBaseTagFromPropsList([
    "href"
    /* HREF */
  ], propsList),
  bodyAttributes: getAttributesFromPropsList("bodyAttributes", propsList),
  defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
  encode: getInnermostProperty(propsList, HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS),
  htmlAttributes: getAttributesFromPropsList("htmlAttributes", propsList),
  linkTags: getTagsFromPropsList(
    "link",
    [
      "rel",
      "href"
      /* HREF */
    ],
    propsList
  ),
  metaTags: getTagsFromPropsList(
    "meta",
    [
      "name",
      "charset",
      "http-equiv",
      "property",
      "itemprop"
      /* ITEM_PROP */
    ],
    propsList
  ),
  noscriptTags: getTagsFromPropsList("noscript", [
    "innerHTML"
    /* INNER_HTML */
  ], propsList),
  onChangeClientState: getOnChangeClientState(propsList),
  scriptTags: getTagsFromPropsList(
    "script",
    [
      "src",
      "innerHTML"
      /* INNER_HTML */
    ],
    propsList
  ),
  styleTags: getTagsFromPropsList("style", [
    "cssText"
    /* CSS_TEXT */
  ], propsList),
  title: getTitleFromPropsList(propsList),
  titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
  prioritizeSeoTags: getAnyTrueFromPropsList(propsList, HELMET_PROPS.PRIORITIZE_SEO_TAGS)
});
var flattenArray = (possibleArray) => Array.isArray(possibleArray) ? possibleArray.join("") : possibleArray;
var checkIfPropsMatch = (props, toMatch) => {
  const keys = Object.keys(props);
  for (let i = 0; i < keys.length; i += 1) {
    if (toMatch[keys[i]] && toMatch[keys[i]].includes(props[keys[i]])) {
      return true;
    }
  }
  return false;
};
var prioritizer = (elementsList, propsToMatch) => {
  if (Array.isArray(elementsList)) {
    return elementsList.reduce(
      (acc, elementAttrs) => {
        if (checkIfPropsMatch(elementAttrs, propsToMatch)) {
          acc.priority.push(elementAttrs);
        } else {
          acc.default.push(elementAttrs);
        }
        return acc;
      },
      { priority: [], default: [] }
    );
  }
  return { default: elementsList, priority: [] };
};
var without = (obj, key) => {
  return {
    ...obj,
    [key]: void 0
  };
};
var SELF_CLOSING_TAGS = [
  "noscript",
  "script",
  "style"
  /* STYLE */
];
var encodeSpecialCharacters = (str, encode = true) => {
  if (encode === false) {
    return String(str);
  }
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};
var generateElementAttributesAsString = (attributes) => Object.keys(attributes).reduce((str, key) => {
  const attr = typeof attributes[key] !== "undefined" ? `${key}="${attributes[key]}"` : `${key}`;
  return str ? `${str} ${attr}` : attr;
}, "");
var generateTitleAsString = (type, title, attributes, encode) => {
  const attributeString = generateElementAttributesAsString(attributes);
  const flattenedTitle = flattenArray(title);
  return attributeString ? `<${type} ${HELMET_ATTRIBUTE}="true" ${attributeString}>${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>` : `<${type} ${HELMET_ATTRIBUTE}="true">${encodeSpecialCharacters(
    flattenedTitle,
    encode
  )}</${type}>`;
};
var generateTagsAsString = (type, tags, encode = true) => tags.reduce((str, t) => {
  const tag = t;
  const attributeHtml = Object.keys(tag).filter(
    (attribute) => !(attribute === "innerHTML" || attribute === "cssText")
  ).reduce((string, attribute) => {
    const attr = typeof tag[attribute] === "undefined" ? attribute : `${attribute}="${encodeSpecialCharacters(tag[attribute], encode)}"`;
    return string ? `${string} ${attr}` : attr;
  }, "");
  const tagContent = tag.innerHTML || tag.cssText || "";
  const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;
  return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? `/>` : `>${tagContent}</${type}>`}`;
}, "");
var convertElementAttributesToReactProps = (attributes, initProps = {}) => Object.keys(attributes).reduce((obj, key) => {
  const mapped = REACT_TAG_MAP[key];
  obj[mapped || key] = attributes[key];
  return obj;
}, initProps);
var generateTitleAsReactComponent = (_type, title, attributes) => {
  const initProps = {
    key: title,
    [HELMET_ATTRIBUTE]: true
  };
  const props = convertElementAttributesToReactProps(attributes, initProps);
  return [React.createElement("title", props, title)];
};
var generateTagsAsReactComponent = (type, tags) => tags.map((tag, i) => {
  const mappedTag = {
    key: i,
    [HELMET_ATTRIBUTE]: true
  };
  Object.keys(tag).forEach((attribute) => {
    const mapped = REACT_TAG_MAP[attribute];
    const mappedAttribute = mapped || attribute;
    if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
      const content = tag.innerHTML || tag.cssText;
      mappedTag.dangerouslySetInnerHTML = { __html: content };
    } else {
      mappedTag[mappedAttribute] = tag[attribute];
    }
  });
  return React.createElement(type, mappedTag);
});
var getMethodsForTag = (type, tags, encode = true) => {
  switch (type) {
    case "title":
      return {
        toComponent: () => generateTitleAsReactComponent(type, tags.title, tags.titleAttributes),
        toString: () => generateTitleAsString(type, tags.title, tags.titleAttributes, encode)
      };
    case "bodyAttributes":
    case "htmlAttributes":
      return {
        toComponent: () => convertElementAttributesToReactProps(tags),
        toString: () => generateElementAttributesAsString(tags)
      };
    default:
      return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
      };
  }
};
var getPriorityMethods = ({ metaTags, linkTags, scriptTags, encode }) => {
  const meta = prioritizer(metaTags, SEO_PRIORITY_TAGS.meta);
  const link = prioritizer(linkTags, SEO_PRIORITY_TAGS.link);
  const script = prioritizer(scriptTags, SEO_PRIORITY_TAGS.script);
  const priorityMethods = {
    toComponent: () => [
      ...generateTagsAsReactComponent("meta", meta.priority),
      ...generateTagsAsReactComponent("link", link.priority),
      ...generateTagsAsReactComponent("script", script.priority)
    ],
    toString: () => (
      // generate all the tags as strings and concatenate them
      `${getMethodsForTag("meta", meta.priority, encode)} ${getMethodsForTag(
        "link",
        link.priority,
        encode
      )} ${getMethodsForTag("script", script.priority, encode)}`
    )
  };
  return {
    priorityMethods,
    metaTags: meta.default,
    linkTags: link.default,
    scriptTags: script.default
  };
};
var mapStateOnServer = (props) => {
  const {
    baseTag,
    bodyAttributes,
    encode = true,
    htmlAttributes,
    noscriptTags,
    styleTags,
    title = "",
    titleAttributes,
    prioritizeSeoTags
  } = props;
  let { linkTags, metaTags, scriptTags } = props;
  let priorityMethods = {
    toComponent: () => {
    },
    toString: () => ""
  };
  if (prioritizeSeoTags) {
    ({ priorityMethods, linkTags, metaTags, scriptTags } = getPriorityMethods(props));
  }
  return {
    priority: priorityMethods,
    base: getMethodsForTag("base", baseTag, encode),
    bodyAttributes: getMethodsForTag("bodyAttributes", bodyAttributes, encode),
    htmlAttributes: getMethodsForTag("htmlAttributes", htmlAttributes, encode),
    link: getMethodsForTag("link", linkTags, encode),
    meta: getMethodsForTag("meta", metaTags, encode),
    noscript: getMethodsForTag("noscript", noscriptTags, encode),
    script: getMethodsForTag("script", scriptTags, encode),
    style: getMethodsForTag("style", styleTags, encode),
    title: getMethodsForTag("title", { title, titleAttributes }, encode)
  };
};
var server_default = mapStateOnServer;
var instances = [];
var isDocument = !!(typeof window !== "undefined" && window.document && window.document.createElement);
var HelmetData = class {
  instances = [];
  canUseDOM = isDocument;
  context;
  value = {
    setHelmet: (serverState) => {
      this.context.helmet = serverState;
    },
    helmetInstances: {
      get: () => this.canUseDOM ? instances : this.instances,
      add: (instance) => {
        (this.canUseDOM ? instances : this.instances).push(instance);
      },
      remove: (instance) => {
        const index = (this.canUseDOM ? instances : this.instances).indexOf(instance);
        (this.canUseDOM ? instances : this.instances).splice(index, 1);
      }
    }
  };
  constructor(context, canUseDOM) {
    this.context = context;
    this.canUseDOM = canUseDOM || false;
    if (!canUseDOM) {
      context.helmet = server_default({
        baseTag: [],
        bodyAttributes: {},
        htmlAttributes: {},
        linkTags: [],
        metaTags: [],
        noscriptTags: [],
        scriptTags: [],
        styleTags: [],
        title: "",
        titleAttributes: {}
      });
    }
  }
};
var defaultValue = {};
var Context = React.createContext(defaultValue);
var HelmetProvider = class _HelmetProvider extends Component {
  static canUseDOM = isDocument;
  helmetData;
  constructor(props) {
    super(props);
    this.helmetData = new HelmetData(this.props.context || {}, _HelmetProvider.canUseDOM);
  }
  render() {
    return /* @__PURE__ */ React.createElement(Context.Provider, { value: this.helmetData.value }, this.props.children);
  }
};
var updateTags = (type, tags) => {
  const headElement = document.head || document.querySelector(
    "head"
    /* HEAD */
  );
  const tagNodes = headElement.querySelectorAll(`${type}[${HELMET_ATTRIBUTE}]`);
  const oldTags = [].slice.call(tagNodes);
  const newTags = [];
  let indexToDelete;
  if (tags && tags.length) {
    tags.forEach((tag) => {
      const newElement = document.createElement(type);
      for (const attribute in tag) {
        if (Object.prototype.hasOwnProperty.call(tag, attribute)) {
          if (attribute === "innerHTML") {
            newElement.innerHTML = tag.innerHTML;
          } else if (attribute === "cssText") {
            if (newElement.styleSheet) {
              newElement.styleSheet.cssText = tag.cssText;
            } else {
              newElement.appendChild(document.createTextNode(tag.cssText));
            }
          } else {
            const attr = attribute;
            const value = typeof tag[attr] === "undefined" ? "" : tag[attr];
            newElement.setAttribute(attribute, value);
          }
        }
      }
      newElement.setAttribute(HELMET_ATTRIBUTE, "true");
      if (oldTags.some((existingTag, index) => {
        indexToDelete = index;
        return newElement.isEqualNode(existingTag);
      })) {
        oldTags.splice(indexToDelete, 1);
      } else {
        newTags.push(newElement);
      }
    });
  }
  oldTags.forEach((tag) => tag.parentNode?.removeChild(tag));
  newTags.forEach((tag) => headElement.appendChild(tag));
  return {
    oldTags,
    newTags
  };
};
var updateAttributes = (tagName, attributes) => {
  const elementTag = document.getElementsByTagName(tagName)[0];
  if (!elementTag) {
    return;
  }
  const helmetAttributeString = elementTag.getAttribute(HELMET_ATTRIBUTE);
  const helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
  const attributesToRemove = [...helmetAttributes];
  const attributeKeys = Object.keys(attributes);
  for (const attribute of attributeKeys) {
    const value = attributes[attribute] || "";
    if (elementTag.getAttribute(attribute) !== value) {
      elementTag.setAttribute(attribute, value);
    }
    if (helmetAttributes.indexOf(attribute) === -1) {
      helmetAttributes.push(attribute);
    }
    const indexToSave = attributesToRemove.indexOf(attribute);
    if (indexToSave !== -1) {
      attributesToRemove.splice(indexToSave, 1);
    }
  }
  for (let i = attributesToRemove.length - 1; i >= 0; i -= 1) {
    elementTag.removeAttribute(attributesToRemove[i]);
  }
  if (helmetAttributes.length === attributesToRemove.length) {
    elementTag.removeAttribute(HELMET_ATTRIBUTE);
  } else if (elementTag.getAttribute(HELMET_ATTRIBUTE) !== attributeKeys.join(",")) {
    elementTag.setAttribute(HELMET_ATTRIBUTE, attributeKeys.join(","));
  }
};
var updateTitle = (title, attributes) => {
  if (typeof title !== "undefined" && document.title !== title) {
    document.title = flattenArray(title);
  }
  updateAttributes("title", attributes);
};
var commitTagChanges = (newState, cb) => {
  const {
    baseTag,
    bodyAttributes,
    htmlAttributes,
    linkTags,
    metaTags,
    noscriptTags,
    onChangeClientState,
    scriptTags,
    styleTags,
    title,
    titleAttributes
  } = newState;
  updateAttributes("body", bodyAttributes);
  updateAttributes("html", htmlAttributes);
  updateTitle(title, titleAttributes);
  const tagUpdates = {
    baseTag: updateTags("base", baseTag),
    linkTags: updateTags("link", linkTags),
    metaTags: updateTags("meta", metaTags),
    noscriptTags: updateTags("noscript", noscriptTags),
    scriptTags: updateTags("script", scriptTags),
    styleTags: updateTags("style", styleTags)
  };
  const addedTags = {};
  const removedTags = {};
  Object.keys(tagUpdates).forEach((tagType) => {
    const { newTags, oldTags } = tagUpdates[tagType];
    if (newTags.length) {
      addedTags[tagType] = newTags;
    }
    if (oldTags.length) {
      removedTags[tagType] = tagUpdates[tagType].oldTags;
    }
  });
  if (cb) {
    cb();
  }
  onChangeClientState(newState, addedTags, removedTags);
};
var _helmetCallback = null;
var handleStateChangeOnClient = (newState) => {
  if (_helmetCallback) {
    cancelAnimationFrame(_helmetCallback);
  }
  if (newState.defer) {
    _helmetCallback = requestAnimationFrame(() => {
      commitTagChanges(newState, () => {
        _helmetCallback = null;
      });
    });
  } else {
    commitTagChanges(newState);
    _helmetCallback = null;
  }
};
var client_default = handleStateChangeOnClient;
var HelmetDispatcher = class extends Component {
  rendered = false;
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(nextProps, this.props);
  }
  componentDidUpdate() {
    this.emitChange();
  }
  componentWillUnmount() {
    const { helmetInstances } = this.props.context;
    helmetInstances.remove(this);
    this.emitChange();
  }
  emitChange() {
    const { helmetInstances, setHelmet } = this.props.context;
    let serverState = null;
    const state = reducePropsToState(
      helmetInstances.get().map((instance) => {
        const props = { ...instance.props };
        delete props.context;
        return props;
      })
    );
    if (HelmetProvider.canUseDOM) {
      client_default(state);
    } else if (server_default) {
      serverState = server_default(state);
    }
    setHelmet(serverState);
  }
  // componentWillMount will be deprecated
  // for SSR, initialize on first render
  // constructor is also unsafe in StrictMode
  init() {
    if (this.rendered) {
      return;
    }
    this.rendered = true;
    const { helmetInstances } = this.props.context;
    helmetInstances.add(this);
    this.emitChange();
  }
  render() {
    this.init();
    return null;
  }
};
var Helmet = class extends Component {
  static defaultProps = {
    defer: true,
    encodeSpecialCharacters: true,
    prioritizeSeoTags: false
  };
  shouldComponentUpdate(nextProps) {
    return !fastCompare(without(this.props, "helmetData"), without(nextProps, "helmetData"));
  }
  mapNestedChildrenToProps(child, nestedChildren) {
    if (!nestedChildren) {
      return null;
    }
    switch (child.type) {
      case "script":
      case "noscript":
        return {
          innerHTML: nestedChildren
        };
      case "style":
        return {
          cssText: nestedChildren
        };
      default:
        throw new Error(
          `<${child.type} /> elements are self-closing and can not contain children. Refer to our API for more information.`
        );
    }
  }
  flattenArrayTypeChildren(child, arrayTypeChildren, newChildProps, nestedChildren) {
    return {
      ...arrayTypeChildren,
      [child.type]: [
        ...arrayTypeChildren[child.type] || [],
        {
          ...newChildProps,
          ...this.mapNestedChildrenToProps(child, nestedChildren)
        }
      ]
    };
  }
  mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren) {
    switch (child.type) {
      case "title":
        return {
          ...newProps,
          [child.type]: nestedChildren,
          titleAttributes: { ...newChildProps }
        };
      case "body":
        return {
          ...newProps,
          bodyAttributes: { ...newChildProps }
        };
      case "html":
        return {
          ...newProps,
          htmlAttributes: { ...newChildProps }
        };
      default:
        return {
          ...newProps,
          [child.type]: { ...newChildProps }
        };
    }
  }
  mapArrayTypeChildrenToProps(arrayTypeChildren, newProps) {
    let newFlattenedProps = { ...newProps };
    Object.keys(arrayTypeChildren).forEach((arrayChildName) => {
      newFlattenedProps = {
        ...newFlattenedProps,
        [arrayChildName]: arrayTypeChildren[arrayChildName]
      };
    });
    return newFlattenedProps;
  }
  warnOnInvalidChildren(child, nestedChildren) {
    invariant(
      VALID_TAG_NAMES.some((name2) => child.type === name2),
      typeof child.type === "function" ? `You may be attempting to nest <Helmet> components within each other, which is not allowed. Refer to our API for more information.` : `Only elements types ${VALID_TAG_NAMES.join(
        ", "
      )} are allowed. Helmet does not support rendering <${child.type}> elements. Refer to our API for more information.`
    );
    invariant(
      !nestedChildren || typeof nestedChildren === "string" || Array.isArray(nestedChildren) && !nestedChildren.some((nestedChild) => typeof nestedChild !== "string"),
      `Helmet expects a string as a child of <${child.type}>. Did you forget to wrap your children in braces? ( <${child.type}>{\`\`}</${child.type}> ) Refer to our API for more information.`
    );
    return true;
  }
  mapChildrenToProps(children, newProps) {
    let arrayTypeChildren = {};
    React.Children.forEach(children, (child) => {
      if (!child || !child.props) {
        return;
      }
      const { children: nestedChildren, ...childProps } = child.props;
      const newChildProps = Object.keys(childProps).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = childProps[key];
        return obj;
      }, {});
      let { type } = child;
      if (typeof type === "symbol") {
        type = type.toString();
      } else {
        this.warnOnInvalidChildren(child, nestedChildren);
      }
      switch (type) {
        case "Symbol(react.fragment)":
          newProps = this.mapChildrenToProps(nestedChildren, newProps);
          break;
        case "link":
        case "meta":
        case "noscript":
        case "script":
        case "style":
          arrayTypeChildren = this.flattenArrayTypeChildren(
            child,
            arrayTypeChildren,
            newChildProps,
            nestedChildren
          );
          break;
        default:
          newProps = this.mapObjectTypeChildren(child, newProps, newChildProps, nestedChildren);
          break;
      }
    });
    return this.mapArrayTypeChildrenToProps(arrayTypeChildren, newProps);
  }
  render() {
    const { children, ...props } = this.props;
    let newProps = { ...props };
    let { helmetData } = props;
    if (children) {
      newProps = this.mapChildrenToProps(children, newProps);
    }
    if (helmetData && !(helmetData instanceof HelmetData)) {
      const data2 = helmetData;
      helmetData = new HelmetData(data2.context, true);
      delete newProps.helmetData;
    }
    return helmetData ? /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context: helmetData.value }) : /* @__PURE__ */ React.createElement(Context.Consumer, null, (context) => /* @__PURE__ */ React.createElement(HelmetDispatcher, { ...newProps, context }));
  }
};
function SEO() {
  const { t, i18n: i18n2 } = useTranslation();
  const location = useLocation();
  const { title, description, image, icon, type, language, keywords, LD_Json } = pageInfo(t, i18n2);
  const pageTitle = pageInfo(t, i18n2).title;
  const menu2 = useMenu();
  const { data: currency, isSuccess: currencyIsSuccess } = useCurrency();
  const currentCurrency = useCurrentCurrency((state) => state.current);
  const LD_Json_Schema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "url": "http://localhost:5173/",
    "logo": image,
    "description": description,
    "servesCuisine": t(`SEO.LD_Json.servesCuisine`),
    "hasMenu": {
      "@type": "Menu",
      "name": "Main Menu",
      "url": "http://localhost:5173//#menu"
    },
    "hasDeliveryMethod": {
      "@type": "FoodEstablishmentDelivery",
      "name": "Restaurant Delivery Service",
      "url": "http://localhost:5173/"
    },
    "makesOffer": currencyIsSuccess && [...Object.values(menu2(t, currency.rates[currentCurrency])).map((item) => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "MenuItem",
        "name": item.name,
        "image": "http://localhost:5173/" + item.photo
      },
      "price": item.price,
      "priceCurrency": currentCurrency,
      "availability": "https://schema.org/InStock"
    }))],
    ...LD_Json
  };
  return /* @__PURE__ */ jsxDEV(Helmet, { children: [
    /* @__PURE__ */ jsxDEV("meta", { charset: "UTF-8" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 60,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "application-name", content: title }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 61,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "description", content: description }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 62,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "keywords", content: keywords }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 63,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "generator", content: "React-dom" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 64,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "author", content: title }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 65,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 66,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { property: "og:title", content: title }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 68,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { property: "og:site_name", content: title }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 69,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { property: "og:description", content: description }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 70,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { property: "og:type", content: type }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 71,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { property: "og:image", content: "http://localhost:5173/" + image }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 72,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { property: "og:image:alt", content: title }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 73,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { property: "og:url", content: "http://localhost:5173/" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 74,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { property: "og:locale", content: language }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 75,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "twitter:card", content: "summary_large_image" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 77,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "twitter:site", content: "@BurgerShop" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 78,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "twitter:creator", content: "@BurgerShop" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 79,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "twitter:title", content: title }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 80,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "twitter:description", content: description }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 81,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "twitter:image", content: "http://localhost:5173/" + image }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 82,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("meta", { name: "twitter:image:alt", content: title }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 83,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "canonical", href: "http://localhost:5173/" + location.pathname }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 86,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "author", href: "http://localhost:5173/" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 87,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/en/", hreflang: "en" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 89,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/ar/", hreflang: "ar" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 90,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/hi/", hreflang: "hi" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 91,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/en/about", hreflang: "en" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 93,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/ar/about", hreflang: "ar" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 94,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/hi/about", hreflang: "hi" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 95,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/en/contact", hreflang: "en" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 97,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/ar/contact", hreflang: "ar" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 98,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "alternate", href: "http://localhost:5173/hi/contact", hreflang: "hi" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 99,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("link", { rel: "icon", type: "image/svg+xml", href: "http://localhost:5173/" + icon }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 101,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV("script", { type: "application/ld+json", children: JSON.stringify(LD_Json_Schema) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 104,
      columnNumber: 13
    }, this),
    pageTitle && /* @__PURE__ */ jsxDEV("title", { children: pageTitle }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
      lineNumber: 109,
      columnNumber: 28
    }, this)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/SEO/SEO.jsx",
    lineNumber: 58,
    columnNumber: 9
  }, this);
}
var DefaultContext = {
  color: void 0,
  size: void 0,
  className: void 0,
  style: void 0,
  attr: void 0
};
var IconContext = React.createContext && React.createContext(DefaultContext);
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};
function Tree2Element(tree) {
  return tree && tree.map(function(node, i) {
    return React.createElement(node.tag, __assign({
      key: i
    }, node.attr), Tree2Element(node.child));
  });
}
function GenIcon(data2) {
  return function(props) {
    return React.createElement(IconBase, __assign({
      attr: __assign({}, data2.attr)
    }, props), Tree2Element(data2.child));
  };
}
function IconBase(props) {
  var elem = function(conf) {
    var attr = props.attr, size = props.size, title = props.title, svgProps = __rest(props, ["attr", "size", "title"]);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return React.createElement("svg", __assign({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className,
      style: __assign(__assign({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && React.createElement("title", null, title), props.children);
  };
  return IconContext !== void 0 ? React.createElement(IconContext.Consumer, null, function(conf) {
    return elem(conf);
  }) : elem(DefaultContext);
}
function IoFastFoodOutline(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 512 512" }, "child": [{ "tag": "path", "attr": { "fill": "none", "strokeLinecap": "round", "strokeMiterlimit": "10", "strokeWidth": "32", "d": "M322 416c0 35.35-20.65 64-56 64H134c-35.35 0-56-28.65-56-64m258-80c17.67 0 32 17.91 32 40h0c0 22.09-14.33 40-32 40H64c-17.67 0-32-17.91-32-40h0c0-22.09 14.33-40 32-40" } }, { "tag": "path", "attr": { "fill": "none", "strokeLinecap": "round", "strokeMiterlimit": "10", "strokeWidth": "32", "d": "M344 336H179.31a8 8 0 00-5.65 2.34l-26.83 26.83a4 4 0 01-5.66 0l-26.83-26.83a8 8 0 00-5.65-2.34H56a24 24 0 01-24-24h0a24 24 0 0124-24h288a24 24 0 0124 24h0a24 24 0 01-24 24zM64 276v-.22c0-55 45-83.78 100-83.78h72c55 0 100 29 100 84v-.22M241 112l7.44 63.97" } }, { "tag": "path", "attr": { "fill": "none", "strokeLinecap": "round", "strokeMiterlimit": "10", "strokeWidth": "32", "d": "M256 480h139.31a32 32 0 0031.91-29.61L463 112" } }, { "tag": "path", "attr": { "fill": "none", "strokeLinecap": "round", "strokeLinejoin": "round", "strokeWidth": "32", "d": "M368 112l16-64 47-16" } }, { "tag": "path", "attr": { "fill": "none", "strokeLinecap": "round", "strokeMiterlimit": "10", "strokeWidth": "32", "d": "M224 112h256" } }] })(props);
}
function FiShoppingCart(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none", "stroke": "currentColor", "strokeWidth": "2", "strokeLinecap": "round", "strokeLinejoin": "round" }, "child": [{ "tag": "circle", "attr": { "cx": "9", "cy": "21", "r": "1" } }, { "tag": "circle", "attr": { "cx": "20", "cy": "21", "r": "1" } }, { "tag": "path", "attr": { "d": "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" } }] })(props);
}
const rightIn = (delay = 0, triggerAt = "whileInView") => ({
  initial: {
    x: "-100%",
    opacity: 0
  },
  [triggerAt]: {
    x: 0,
    opacity: 1
  },
  viewport: {
    once: true,
    amount: 0
  },
  transition: {
    delay
  }
});
const useCart = create((set) => ({
  cart: {},
  add: (payload) => set((state) => {
    if (state.cart[payload.id]) {
      return state;
    } else {
      return {
        ...state,
        success: { state: true, item: payload },
        cart: {
          ...state.cart,
          [payload.id]: { quantity: 1 }
        }
      };
    }
  }),
  INCQuantity: (payload) => set((state) => {
    if (state.cart[payload.id].quantity < 10) {
      return {
        ...state,
        ...state.success,
        cart: {
          ...state.cart,
          [payload.id]: {
            quantity: state.cart[payload.id].quantity + 1
          }
        }
      };
    } else {
      return state;
    }
  }),
  DECQuantity: (payload) => set((state) => {
    if (state.cart[payload.id].quantity > 0) {
      return {
        ...state,
        ...state.success,
        cart: {
          ...state.cart,
          [payload.id]: {
            quantity: state.cart[payload.id].quantity - 1
          }
        }
      };
    } else {
      return state;
    }
  }),
  empty: () => set(
    (state) => ({
      ...state,
      cart: {}
    })
  )
}));
function useLanguage() {
  const languageControl = useContext(LanguageContext);
  return languageControl;
}
function setCurrentCurrency(currency) {
  typeof window !== "undefined" && localStorage.setItem("currency", currency);
  useCurrentCurrency.getState().set({ current: currency });
}
function MdMenu(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "d": "M0 0h24v24H0z" } }, { "tag": "path", "attr": { "d": "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" } }] })(props);
}
function CgCloseR(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none" }, "child": [{ "tag": "path", "attr": { "d": "M16.3956 7.75734C16.7862 8.14786 16.7862 8.78103 16.3956 9.17155L13.4142 12.153L16.0896 14.8284C16.4802 15.2189 16.4802 15.8521 16.0896 16.2426C15.6991 16.6331 15.0659 16.6331 14.6754 16.2426L12 13.5672L9.32458 16.2426C8.93405 16.6331 8.30089 16.6331 7.91036 16.2426C7.51984 15.8521 7.51984 15.2189 7.91036 14.8284L10.5858 12.153L7.60436 9.17155C7.21383 8.78103 7.21383 8.14786 7.60436 7.75734C7.99488 7.36681 8.62805 7.36681 9.01857 7.75734L12 10.7388L14.9814 7.75734C15.372 7.36681 16.0051 7.36681 16.3956 7.75734Z", "fill": "currentColor" } }, { "tag": "path", "attr": { "fillRule": "evenodd", "clipRule": "evenodd", "d": "M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3Z", "fill": "currentColor" } }] })(props);
}
function CgDarkMode(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24", "fill": "none" }, "child": [{ "tag": "path", "attr": { "d": "M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8V16Z", "fill": "currentColor" } }, { "tag": "path", "attr": { "fillRule": "evenodd", "clipRule": "evenodd", "d": "M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4V8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z", "fill": "currentColor" } }] })(props);
}
const navMenu = {
  collapsed: {
    height: "5rem",
    transition: { duration: 0 }
  },
  expanded: {
    height: 420,
    paddingTop: 20,
    alignItems: "flex-start",
    transition: { duration: 0.3 }
  }
};
const menuTabs = {
  visible: {
    display: "flex"
  },
  menuCollapsed: {
    display: "none"
  },
  menuExpanded: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    rowGap: "22px",
    padding: "15px 40px"
  }
};
const Theme = createContext({});
function useTheme() {
  const themeControl = useContext(Theme);
  return themeControl;
}
const dark = { "value": "dark" };
const light = { "value": "light" };
const themes = {
  dark,
  light
};
function ThemeToggler() {
  const { changeTheme: changeTheme2, currentTheme } = useTheme();
  function toggleTheme() {
    if (currentTheme == themes.dark.value) {
      changeTheme2(themes.light.value);
    } else {
      changeTheme2(themes.dark.value);
    }
  }
  return /* @__PURE__ */ jsxDEV(CgDarkMode, { className: "themeToggler", onClick: () => toggleTheme(), "data-testid": "themeToggleTest" }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/themeToggler/themeToggler.jsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}
const Header = () => {
  const location = useLocation();
  const { t, i18n: i18n2 } = useTranslation();
  const { changeLanguage: changeLanguage2 } = useLanguage();
  const cartItems = useCart((state) => state.cart);
  const { data: currency, isSuccess: currencyIsSuccess } = useCurrency();
  const currentCurrency = useCurrentCurrency((state) => state.current);
  const [openMenu, setOpenMenu] = useState(false);
  const isMd = useMediaQuery({ query: "(max-width: 800px)" });
  const selectLanguageId = useId();
  const selectCurrencyId = useId();
  return /* @__PURE__ */ jsxDEV(motion.nav, { variants: navMenu, initial: "collapsed", animate: isMd ? openMenu ? "expanded" : "collapsed" : "collapsed", className: "navMenuExpand", "data-testid": "headerTest", children: [
    /* @__PURE__ */ jsxDEV(motion.div, { ...rightIn(0), children: /* @__PURE__ */ jsxDEV(IoFastFoodOutline, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
      lineNumber: 41,
      columnNumber: 17
    }, void 0) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
      lineNumber: 40,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV(motion.div, { variants: menuTabs, initial: "visible", animate: isMd ? openMenu ? "menuExpanded" : "menuCollapsed" : "visible", className: "navTabs", children: [
      /* @__PURE__ */ jsxDEV(NavLink, { to: "/", children: t(`nav.tabs.home`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 44,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV(NavLink, { to: "/contact", children: t(`nav.tabs.contact`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 45,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV(NavLink, { to: "/myorders", state: { from: location.pathname }, children: t(`nav.tabs.orders`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 46,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV(NavLink, { to: "/about", children: t(`nav.tabs.about`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 47,
        columnNumber: 17
      }, void 0),
      currencyIsSuccess && /* @__PURE__ */ jsxDEV(NavLink, { to: "/cart", state: { from: location.pathname }, className: "cartLink", "aria-label": "View cart", children: [
        /* @__PURE__ */ jsxDEV(FiShoppingCart, {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
          lineNumber: 49,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { className: "cartItemsCount", "data-testid": "cartIconTest", children: Object.keys(cartItems).length }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
          lineNumber: 50,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { children: "cart" }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
          lineNumber: 53,
          columnNumber: 21
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 48,
        columnNumber: 40
      }, void 0),
      /* @__PURE__ */ jsxDEV(ThemeToggler, {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 55,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("label", { htmlFor: selectLanguageId, className: "LanguageLabel", children: "Language" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 56,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("select", { id: selectLanguageId, name: "language", onChange: (e) => {
        changeLanguage2(e.currentTarget.value);
      }, value: i18n2.language, "data-testid": "languageSelectTest", children: i18n2?.services?.resourceStore?.data && Object.keys(i18n2.services.resourceStore.data).map((language, inx) => {
        return /* @__PURE__ */ jsxDEV("option", { value: language, children: i18n2.services.resourceStore.data[language].alias }, inx, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
          lineNumber: 59,
          columnNumber: 32
        }, void 0);
      }) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 57,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("label", { htmlFor: selectCurrencyId, className: "CurrencyLabel", children: "Currency" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 62,
        columnNumber: 17
      }, void 0),
      currencyIsSuccess && /* @__PURE__ */ jsxDEV("select", { id: selectCurrencyId, name: "currency", onChange: (e) => {
        setCurrentCurrency(e.target.value);
      }, value: currentCurrency, "data-testid": "currencySelectTest", children: Object.keys(currency.rates).map((currency2, inx) => {
        return /* @__PURE__ */ jsxDEV("option", { value: currency2, children: currency2 }, inx, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
          lineNumber: 65,
          columnNumber: 32
        }, void 0);
      }) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
        lineNumber: 63,
        columnNumber: 40
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
      lineNumber: 43,
      columnNumber: 13
    }, void 0),
    isMd ? !openMenu ? /* @__PURE__ */ jsxDEV(MdMenu, { className: "navMenuButton", onClick: () => setOpenMenu(true) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
      lineNumber: 72,
      columnNumber: 25
    }, void 0) : /* @__PURE__ */ jsxDEV(CgCloseR, { className: "navMenuButton", onClick: () => setOpenMenu(false) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
      lineNumber: 74,
      columnNumber: 25
    }, void 0) : /* @__PURE__ */ jsxDEV(Fragment, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
      lineNumber: 76,
      columnNumber: 21
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Header.jsx",
    lineNumber: 39,
    columnNumber: 9
  }, void 0);
};
function AiFillGithub(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 1024 1024" }, "child": [{ "tag": "path", "attr": { "d": "M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9a127.5 127.5 0 0 1 38.1 91v112.5c.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" } }] })(props);
}
function AiFillInstagram(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 1024 1024" }, "child": [{ "tag": "path", "attr": { "d": "M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z" } }] })(props);
}
function AiFillYoutube(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 1024 1024" }, "child": [{ "tag": "path", "attr": { "d": "M941.3 296.1a112.3 112.3 0 0 0-79.2-79.3C792.2 198 512 198 512 198s-280.2 0-350.1 18.7A112.12 112.12 0 0 0 82.7 296C64 366 64 512 64 512s0 146 18.7 215.9c10.3 38.6 40.7 69 79.2 79.3C231.8 826 512 826 512 826s280.2 0 350.1-18.8c38.6-10.3 68.9-40.7 79.2-79.3C960 658 960 512 960 512s0-146-18.7-215.9zM423 646V378l232 133-232 135z" } }] })(props);
}
function AiOutlineEye(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 1024 1024" }, "child": [{ "tag": "path", "attr": { "d": "M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z" } }] })(props);
}
const Footer = () => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxDEV("footer", { "data-testid": "footerTest", children: [
    /* @__PURE__ */ jsxDEV("aside", { className: "side1", children: [
      /* @__PURE__ */ jsxDEV("h2", { children: t(`footer.logo.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 11,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: t(`footer.logo.description`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 12,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 13,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("em", { children: t(`footer.logo.feedback`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 14,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("strong", { children: t(`footer.logo.rights`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 15,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
      lineNumber: 10,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("aside", { className: "side2", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: t(`footer.social.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 18,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("a", { href: "https://youtube.com", title: "youtube", children: [
        /* @__PURE__ */ jsxDEV(AiFillYoutube, {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
          lineNumber: 20,
          columnNumber: 21
        }, void 0),
        " youtube"
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 19,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("a", { href: "https://instagram.com", title: "instagram", children: [
        /* @__PURE__ */ jsxDEV(AiFillInstagram, {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
          lineNumber: 23,
          columnNumber: 21
        }, void 0),
        " instagram"
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 22,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("a", { href: "https://github.com", title: "github", children: [
        /* @__PURE__ */ jsxDEV(AiFillGithub, {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
          lineNumber: 26,
          columnNumber: 21
        }, void 0),
        " github"
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
        lineNumber: 25,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
      lineNumber: 17,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/layout/Footer.jsx",
    lineNumber: 9,
    columnNumber: 9
  }, void 0);
};
const ScrollFollow = memo(({ currentPath = "", target = "", icon = /* @__PURE__ */ jsxDEV(Fragment, {}, void 0, false, {
  fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
  lineNumber: 5,
  columnNumber: 68
}, void 0), children }) => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const link = useRef("");
  const [linkType, setLinkType] = useState("Link");
  useEffect(() => {
    if (location.pathname == currentPath) {
      link.current = target;
      setLinkType("a");
    } else {
      link.current = currentPath + target;
      setLinkType("link");
    }
  }, [location.pathname, currentPath, target]);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(LinkTag, { type: linkType, link: link.current, title: "back to menu", "aria-label": "go to section", children: [
      /* @__PURE__ */ jsxDEV("span", { children: target.replace("#", "").replaceAll("/", " ") }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
        lineNumber: 26,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { className: "scrollFollow", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "scrollFollowIcon", children: icon }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
          lineNumber: 28,
          columnNumber: 21
        }, void 0),
        /* @__PURE__ */ jsxDEV("svg", { viewBox: "0 0 100 100", className: "scrollFollowProgress", children: /* @__PURE__ */ jsxDEV(motion.circle, { cx: "50", cy: "50", r: "30", pathLength: "1", className: "scrollFollowProgressCircle", style: { pathLength: scrollYProgress } }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
          lineNumber: 32,
          columnNumber: 25
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
          lineNumber: 31,
          columnNumber: 21
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
        lineNumber: 27,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
      lineNumber: 25,
      columnNumber: 13
    }, void 0),
    children
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
    lineNumber: 24,
    columnNumber: 9
  }, void 0);
});
function LinkTag({ type, link, children }) {
  if (type == "a") {
    return /* @__PURE__ */ jsxDEV("a", { href: link, children }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
      lineNumber: 46,
      columnNumber: 16
    }, this);
  } else if (type == "link") {
    return /* @__PURE__ */ jsxDEV(Link, { to: link, children }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/scrollFollow/scrollFollow.jsx",
      lineNumber: 48,
      columnNumber: 16
    }, this);
  }
}
const upIn = (delay = 0, triggerAt = "whileInView") => ({
  initial: {
    y: "100%",
    opacity: 0
  },
  [triggerAt]: {
    y: 0,
    opacity: 1
  },
  viewport: {
    once: true,
    amount: 0
  },
  transition: {
    delay
  }
});
const Founder = () => {
  const ownerBackground = useRef();
  const ownerImg = useRef();
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const isLg = useMediaQuery({ query: "(max-width: 992px)" });
  const bgSizeValue = useTransform(scrollYProgress, [0, 1], isLg ? ["auto 120%", "auto 100%"] : ["150% 150%", "100% 100%"]);
  const scaleValue = useTransform(scrollYProgress, [0, 1], [0, 1]);
  useEffect(() => {
    loadMainImage(founderBackground, ownerBackground, { type: "background" });
    loadMainImage(owner, ownerImg, { type: "img" });
  }, []);
  return /* @__PURE__ */ jsxDEV(motion.section, { ref: ownerBackground, "data-testid": "founderTest", className: "founder", style: { backgroundSize: bgSizeValue }, children: /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV(motion.article, { style: { scale: scaleValue }, children: [
    /* @__PURE__ */ jsxDEV(motion.img, { ref: ownerImg, src: owner, alt: "Nelson", height: "200px", width: "200px", loading: "lazy", ...rightIn(0.4) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Founder.jsx",
      lineNumber: 32,
      columnNumber: 11
    }, void 0),
    /* @__PURE__ */ jsxDEV(motion.h2, { ...upIn(0.2), children: t(`home.founder.name`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Founder.jsx",
      lineNumber: 33,
      columnNumber: 11
    }, void 0),
    /* @__PURE__ */ jsxDEV(motion.p, { ...upIn(0.6), children: t(`home.founder.about`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Founder.jsx",
      lineNumber: 34,
      columnNumber: 11
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Founder.jsx",
    lineNumber: 31,
    columnNumber: 9
  }, void 0) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Founder.jsx",
    lineNumber: 30,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Founder.jsx",
    lineNumber: 29,
    columnNumber: 5
  }, void 0);
};
function CurrencyIcon({ currency }) {
  const [symbol, setSymbol] = useState(icons[currency]?.symbol);
  useEffect(() => {
    let symbol2 = icons[currency]?.symbol;
    if (symbol2) {
      setSymbol(symbol2);
    } else {
      setSymbol(currency);
    }
  }, [currency]);
  return /* @__PURE__ */ jsxDEV("b", { children: symbol }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/currencyIcon/currencyIcon.jsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}
function Counter({ from = 0, to, animationOptions, children = /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
  fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/counter/counter.jsx",
  lineNumber: 4,
  columnNumber: 63
}, this) }) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const numberShape = Number.isAllInteger(from, to) ? (value = 0) => value.toFixed(0) : (value = 0, count = 3) => value.toFixed(count);
    const controls = animate(parseFloat(from), parseFloat(to), {
      duration: 1,
      ...animationOptions,
      onUpdate(value) {
        if (nodeRef.current)
          nodeRef.current.textContent = numberShape(value, 3);
      },
      onComplete() {
        if (nodeRef.current)
          nodeRef.current.textContent = to.toString();
      }
    });
    return () => controls.stop();
  }, [from, to, animationOptions]);
  return Children.map(Children.toArray(children), (child, inx) => {
    if (inx === 0 && child && typeof child === "object" && "type" in child) {
      return cloneElement(child, { ref: nodeRef });
    }
    return child;
  });
}
function BsFillCartCheckFill(props) {
  return GenIcon({ "attr": { "fill": "currentColor", "viewBox": "0 0 16 16" }, "child": [{ "tag": "path", "attr": { "d": "M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1.646-7.646-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708z" } }] })(props);
}
const MenuCard = memo(({ id, photo, price, name: name2, currency, delay = 0, inCart = false, onClick = () => {
} }) => {
  const MenuCardImg = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    loadMainImage(photo, MenuCardImg, { type: "img" });
  }, []);
  return /* @__PURE__ */ jsxDEV(motion.section, { ...upIn(delay), className: "menuCard", children: [
    /* @__PURE__ */ jsxDEV("img", { ref: MenuCardImg, src: photo, alt: name2, loading: "lazy" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
      lineNumber: 23,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDEV("h3", { children: /* @__PURE__ */ jsxDEV("bdi", { children: [
      /* @__PURE__ */ jsxDEV(Counter, { from: 0, to: price, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
        lineNumber: 24,
        columnNumber: 49
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
        lineNumber: 24,
        columnNumber: 16
      }, void 0),
      " ",
      /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
        lineNumber: 24,
        columnNumber: 73
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
      lineNumber: 24,
      columnNumber: 11
    }, void 0) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
      lineNumber: 24,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDEV("p", { children: name2 }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
      lineNumber: 25,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDEV("button", { className: inCart ? "menuCardinCartButton" : "", onClick: () => onClick(id, name2, inCart), "data-testid": `menuItemBtnTest${id}`, children: inCart ? /* @__PURE__ */ jsxDEV(BsFillCartCheckFill, { size: 20 }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
      lineNumber: 27,
      columnNumber: 20
    }, void 0) : t(`home.menu.buyNow`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
      lineNumber: 26,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/MenuCard.jsx",
    lineNumber: 22,
    columnNumber: 5
  }, void 0);
});
function Loading() {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxDEV("div", { className: "loading", children: [
    /* @__PURE__ */ jsxDEV("img", { src: loading$3, alt: "loading", loading: "lazy", width: "100px", height: "100px" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/loading/loading.jsx",
      lineNumber: 9,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("h3", { children: t(`loading.title`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/loading/loading.jsx",
      lineNumber: 10,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/loading/loading.jsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
function BiSolidErrorAlt(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M16.707 2.293A.996.996 0 0 0 16 2H8a.996.996 0 0 0-.707.293l-5 5A.996.996 0 0 0 2 8v8c0 .266.105.52.293.707l5 5A.996.996 0 0 0 8 22h8c.266 0 .52-.105.707-.293l5-5A.996.996 0 0 0 22 16V8a.996.996 0 0 0-.293-.707l-5-5zM13 17h-2v-2h2v2zm0-4h-2V7h2v6z" } }] })(props);
}
function BiSolidFoodMenu(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M3 2h2v20H3zm16 0H6v20h13c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2zm-1 10H9v-2h9v2zm0-4H9V6h9v2z" } }] })(props);
}
function AlertError({ title }) {
  return /* @__PURE__ */ jsxDEV("div", { className: "menuAlert", children: [
    /* @__PURE__ */ jsxDEV(BiSolidErrorAlt, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/alertError/alertError.jsx",
      lineNumber: 7,
      columnNumber: 31
    }, this),
    " ",
    title
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/alertError/alertError.jsx",
    lineNumber: 7,
    columnNumber: 4
  }, this);
}
const Menu = () => {
  const { t, i18n: i18n2 } = useTranslation();
  const { data: currency, isFetching: currencyIsFetching, isSuccess: currencyIsSuccess, isError: currencyIsError } = useCurrency();
  const currentCurrency = useCurrentCurrency((state) => state.current);
  const menu2 = useMenu();
  const cart2 = useCart((state) => state.cart);
  const addItemToCart = useCart((state) => state.add);
  const add = useCallback((id, name2, inCart) => {
    if (inCart)
      toast.info(`" ${name2} " ${t(`msgs.cart.exist`)}`);
    else {
      addItemToCart({ id });
      toast.success(t(`msgs.cart.add`));
    }
  }, [i18n2.language]);
  return /* @__PURE__ */ jsxDEV("section", { id: "menu", className: "menuContainer", "data-testid": "menuTest", children: [
    /* @__PURE__ */ jsxDEV("h2", { children: t(`home.menu.title`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Menu.jsx",
      lineNumber: 36,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV("section", { className: "menuItems", children: currencyIsSuccess && Object.values(menu2(t, currency?.rates[currentCurrency])).map((item, inx) => /* @__PURE__ */ jsxDEV(
      MenuCard,
      {
        id: item.id,
        photo: item.photo,
        name: item.name,
        price: item.price,
        currency: currentCurrency,
        delay: inx * 0.3,
        onClick: add,
        inCart: cart2[item.id]
      },
      inx,
      false,
      {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Menu.jsx",
        lineNumber: 39,
        columnNumber: 21
      },
      void 0
    )) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Menu.jsx",
      lineNumber: 37,
      columnNumber: 13
    }, void 0),
    currencyIsFetching && /* @__PURE__ */ jsxDEV(Loading, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Menu.jsx",
      lineNumber: 52,
      columnNumber: 37
    }, void 0),
    currencyIsError && /* @__PURE__ */ jsxDEV(AlertError, { title: t(`msgs.currency.convertError`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Menu.jsx",
      lineNumber: 53,
      columnNumber: 34
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Menu.jsx",
    lineNumber: 35,
    columnNumber: 9
  }, void 0);
};
const downIn = (delay = 0, triggerAt = "whileInView") => ({
  initial: {
    y: "-100%",
    opacity: 0
  },
  [triggerAt]: {
    y: 0,
    opacity: 1
  },
  viewport: {
    once: true,
    amount: 0.1
  },
  transition: {
    delay
  }
});
function Hero() {
  const heroBackground = useRef();
  const { t } = useTranslation();
  const { scrollYProgress } = useScroll();
  const backdropBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(20px)"]);
  useEffect(() => {
    loadMainImage(homeBackground, heroBackground, { type: "background" });
  }, []);
  return /* @__PURE__ */ jsxDEV("section", { ref: heroBackground, "data-testid": "heroTest", className: "home", children: /* @__PURE__ */ jsxDEV(motion.div, { style: { backdropFilter: backdropBlur, WebkitBackdropFilter: backdropBlur }, children: /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("article", { children: [
    /* @__PURE__ */ jsxDEV(motion.h1, { ...rightIn(0), children: t(`home.hero.title`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Hero.jsx",
      lineNumber: 27,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ jsxDEV(motion.p, { ...rightIn(0.5), children: t(`home.hero.description`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Hero.jsx",
      lineNumber: 28,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ jsxDEV(motion.a, { href: "#menu", ...downIn(0.5), children: t(`home.hero.exploreMenu`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Hero.jsx",
      lineNumber: 29,
      columnNumber: 25
    }, this)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Hero.jsx",
    lineNumber: 26,
    columnNumber: 21
  }, this) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Hero.jsx",
    lineNumber: 25,
    columnNumber: 17
  }, this) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Hero.jsx",
    lineNumber: 24,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Hero.jsx",
    lineNumber: 23,
    columnNumber: 9
  }, this);
}
const Home = () => {
  return /* @__PURE__ */ jsxDEV("main", { children: [
    /* @__PURE__ */ jsxDEV(Hero, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Home.jsx",
      lineNumber: 10,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV(Menu, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Home.jsx",
      lineNumber: 11,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV(Founder, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Home.jsx",
      lineNumber: 12,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/home/Home.jsx",
    lineNumber: 9,
    columnNumber: 9
  }, void 0);
};
function RiFindReplaceLine(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "d": "M18.0326 16.6184L22.3137 20.8995L20.8995 22.3137L16.6184 18.0326C15.0789 19.2639 13.1258 20 11 20C7.46456 20 4.40684 17.964 2.93475 15H6H9L7.69597 17.1734C8.67997 17.7009 9.80489 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 10.305 17.8988 9.63365 17.7104 9H19.7772C19.923 9.64318 20 10.3126 20 11C20 13.1258 19.2639 15.0789 18.0326 16.6184ZM19.0652 7H13L14.304 4.82662C13.32 4.29912 12.1951 4 11 4C7.1325 4 4 7.1325 4 11C4 11.695 4.10117 12.3663 4.2896 13H2.22279C2.07698 12.3568 2 11.6874 2 11C2 6.0275 6.0275 2 11 2C14.5354 2 17.5932 4.03597 19.0652 7Z" } }] })(props);
}
const About = () => {
  const ownerImg = useRef();
  const ownerBackground = useRef();
  const { t } = useTranslation();
  useEffect(() => {
    loadMainImage(owner, ownerImg, { type: "img" });
    loadMainImage(founderBackground, ownerBackground, { type: "background" });
  }, []);
  return /* @__PURE__ */ jsxDEV("main", { ref: ownerBackground, className: "about", children: /* @__PURE__ */ jsxDEV("section", { className: "aboutContent", children: [
    /* @__PURE__ */ jsxDEV(motion.h1, { ...upIn(0), className: "aboutTitle", children: t(`about.title`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
      lineNumber: 25,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV(motion.article, { ...upIn(0), className: "aboutShop", children: [
      /* @__PURE__ */ jsxDEV("h4", { children: t(`about.shop.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
        lineNumber: 27,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: t(`about.shop.description`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
        lineNumber: 28,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: t(`about.shop.menuLinkDescription`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
        lineNumber: 29,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV(Link, { to: "/#menu", children: /* @__PURE__ */ jsxDEV(RiFindReplaceLine, {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
        lineNumber: 30,
        columnNumber: 39
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
        lineNumber: 30,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
      lineNumber: 26,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV(motion.article, { ...downIn(0), className: "aboutFounder", children: [
      /* @__PURE__ */ jsxDEV("h2", { children: t(`about.founder.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
        lineNumber: 33,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("article", { children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("img", { ref: ownerImg, src: owner, alt: "Founder" }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
            lineNumber: 36,
            columnNumber: 29
          }, void 0),
          /* @__PURE__ */ jsxDEV("h3", { children: t(`about.founder.name`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
            lineNumber: 37,
            columnNumber: 29
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
          lineNumber: 35,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("p", { children: t(`about.founder.about`) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
          lineNumber: 39,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
        lineNumber: 34,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
      lineNumber: 32,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
    lineNumber: 24,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/about/About.jsx",
    lineNumber: 23,
    columnNumber: 9
  }, void 0);
};
const name = {
  max: 50,
  min: 2
};
const message = {
  min: 10
};
const pinCode = {
  pattern: /^[0-9]+$/,
  min: 5
};
const phoneNumber = {
  pattern: /^[0-9]+$/,
  min: 10
};
const createMsg = (t, msg, page, input, length) => {
  return t(`msgs.forms.${msg}`).replace("%input%", t(`${page}.form.inputs.${input}.placeholder`)).replace("%length%", length);
};
const contactSchema = (t) => Yup.object({
  name: Yup.string().min(name.min, createMsg(t, "min", "contact", "name", name.min)).max(name.max, createMsg(t, "max", "contact", "name", name.max)).required(createMsg(t, "required", "contact", "name")),
  email: Yup.string().email(createMsg(t, "validation", "contact", "email")).required(createMsg(t, "required", "contact", "email")),
  message: Yup.string().min(message.min, createMsg(t, "min", "contact", "message", message.min)).required(createMsg(t, "required", "contact", "message")),
  "cf-turnstile-response": Yup.string().required(createMsg(t, "securityCheck"))
});
function useEmail() {
  return (data2, onSuccess, onFailed) => {
    const service = "service_mcnapbc";
    const template = "template_qdty5ve";
    emailjs.send(service, template, data2).then(() => {
      onSuccess();
    }).catch(() => {
      onFailed();
    });
  };
}
const Contact = () => {
  const contactBackground = useRef();
  const sideImg = useRef();
  const [clientTurnstile, setClientTurnstile] = useState(/* @__PURE__ */ jsxDEV(Fragment, {}, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
    lineNumber: 19,
    columnNumber: 60
  }, void 0));
  const { t, i18n: i18n2 } = useTranslation();
  const { currentTheme } = useTheme();
  const turnstile = useTurnstile();
  const email = useEmail();
  const formik = useFormik({
    initialValues: initialValues$1,
    validationSchema: contactSchema(t),
    onSubmit: (data2, { resetForm }) => {
      data2.subject = "burger shop";
      delete data2["cf-turnstile-response"];
      email(data2, () => toast.success(t(`msgs.contact.success`)), () => toast.error(t(`msgs.contact.failed`)));
      resetForm();
    },
    onReset: () => {
      turnstile.reset();
    }
  });
  useEffect(() => {
    formik.validateForm();
    setClientTurnstile(/* @__PURE__ */ jsxDEV(Turnstile, { sitekey: "0x4AAAAAACBur-_XZ3aaa1GZ", action: "contact", theme: currentTheme, language: i18n2.language, onVerify: handleOnVerify }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
      lineNumber: 45,
      columnNumber: 28
    }, void 0));
  }, [i18n2.language, currentTheme]);
  useEffect(() => {
    loadMainImage(burger2, sideImg, { type: "img" });
    loadMainImage(gradientBackground, contactBackground, { type: "background" });
  }, []);
  const handleOnVerify = (token) => {
    formik.setFieldValue("cf-turnstile-response", token);
    if (formik.errors["cf-turnstile-response"]) {
      formik.setFieldError("cf-turnstile-response", "");
    }
  };
  return /* @__PURE__ */ jsxDEV("main", { ref: contactBackground, className: "contact", children: [
    /* @__PURE__ */ jsxDEV(motion.form, { onSubmit: formik.handleSubmit, ...rightIn(0), "data-testid": "contactFormTest", children: [
      /* @__PURE__ */ jsxDEV("h1", { children: t(`contact.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 63,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("input", { type: "text", name: "name", placeholder: t(`contact.form.inputs.name.placeholder`), onChange: formik.handleChange, onBlur: formik.handleBlur, value: formik.values.name, "data-testid": "contactFormNameTest" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 64,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { children: formik.errors.name }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 65,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("input", { type: "email", name: "email", placeholder: t(`contact.form.inputs.email.placeholder`), onChange: formik.handleChange, onBlur: formik.handleBlur, value: formik.values.email, "data-testid": "contactFormEmailTest" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 66,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { children: formik.errors.email }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 67,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("textarea", { name: "message", placeholder: t(`contact.form.inputs.message.placeholder`), cols: "30", rows: "10", onChange: formik.handleChange, onBlur: formik.handleBlur, value: formik.values.message, "data-testid": "contactFormMessageTest" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 68,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("span", { children: formik.errors.message }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 69,
        columnNumber: 17
      }, void 0),
      clientTurnstile,
      /* @__PURE__ */ jsxDEV("span", { children: formik.errors["cf-turnstile-response"] }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 71,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("button", { type: "submit", disabled: formik.isSubmitting, "data-testid": "contactFormSubmitTest", children: formik.isSubmitting ? "Sending..." : "Send" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
        lineNumber: 72,
        columnNumber: 17
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
      lineNumber: 62,
      columnNumber: 13
    }, void 0),
    /* @__PURE__ */ jsxDEV(motion.div, { className: "side", ...downIn(0), viewport: { once: true }, children: /* @__PURE__ */ jsxDEV("img", { ref: sideImg, src: burger2, alt: "Burger" }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
      lineNumber: 75,
      columnNumber: 17
    }, void 0) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
      lineNumber: 74,
      columnNumber: 13
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/contact/Contact.jsx",
    lineNumber: 61,
    columnNumber: 9
  }, void 0);
};
const initialValues$1 = {
  name: "",
  email: "",
  message: "",
  "cf-turnstile-response": ""
};
const CartItem = memo(({ id, title, price, currency, quantity, photo, increment, decrement }) => {
  const itemImg = useRef();
  useEffect(() => {
    loadMainImage(photo, itemImg, { type: "img" });
  }, []);
  return /* @__PURE__ */ jsxDEV("div", { className: "cartItem", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "itemInfo", children: [
      /* @__PURE__ */ jsxDEV("h3", { "data-testid": `cardItemNameTest${id}`, children: title }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
        lineNumber: 18,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDEV("img", { ref: itemImg, src: photo, alt: title, "data-testid": `cardItemPhotoTest${id}` }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
        lineNumber: 19,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
      lineNumber: 17,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "orderInfo", children: /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h4", { "data-testid": `cardItemPriceTest${id}`, children: /* @__PURE__ */ jsxDEV("bdi", { children: [
        /* @__PURE__ */ jsxDEV(Counter, { to: price, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
          lineNumber: 24,
          columnNumber: 35
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
          lineNumber: 24,
          columnNumber: 13
        }, void 0),
        " ",
        /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
          lineNumber: 24,
          columnNumber: 59
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
        lineNumber: 23,
        columnNumber: 56
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
        lineNumber: 23,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDEV("button", { onClick: () => {
        decrement(id);
      }, "data-testid": `cardItemDECTest${id}`, children: "-" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
        lineNumber: 26,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDEV("input", { type: "number", readOnly: true, value: quantity, "data-testid": `cardItemQuantityTest${id}` }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
        lineNumber: 27,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDEV("button", { onClick: () => {
        increment(id);
      }, "data-testid": `cardItemINCTest${id}`, children: "+" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
        lineNumber: 28,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, void 0) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
      lineNumber: 21,
      columnNumber: 7
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/cartItem.jsx",
    lineNumber: 16,
    columnNumber: 5
  }, void 0);
});
function checkout(menu2, cart2, priceRate = 1) {
  let subtotal = 0;
  for (const id in cart2) {
    const menuItem = menu2(i18n.t, priceRate)[id];
    subtotal += parseFloat(menuItem.price) * parseInt(cart2[id].quantity);
  }
  subtotal = parseFloat(subtotal.toFixed(2));
  const tax = parseFloat((subtotal * 0.1).toFixed(2));
  const shipping2 = parseFloat(convertCurrency(2.24, priceRate));
  const total = parseFloat((subtotal === 0 ? 0 : subtotal + tax + shipping2).toFixed(2));
  return { subtotal, tax, shipping: shipping2, total };
}
const Cart = () => {
  const goTo = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const menu2 = useMenu();
  const { cart: cart2, currentCurrency, currency: { data: currency, isSuccess: currencyIsSuccess } } = useOutletContext();
  const INCQuantity = useCart((state) => state.INCQuantity);
  const DECQuantity = useCart((state) => state.DECQuantity);
  const handleIncrement = useCallback((id) => {
    INCQuantity({ id });
  }, [INCQuantity]);
  const handleDecrement = useCallback((id) => {
    DECQuantity({ id });
  }, [DECQuantity]);
  const calculateCheckout = useMemo(() => currencyIsSuccess ? checkout(menu2, cart2, currency.rates[currentCurrency]) : {}, [menu2, cart2, currency, currentCurrency, currencyIsSuccess]);
  const handleConfirm = () => {
    goTo("/cart/shipping", { state: { from: location.pathname } });
  };
  return /* @__PURE__ */ jsxDEV("main", { className: "cart", children: /* @__PURE__ */ jsxDEV(motion.section, { ...upIn(0, "animate"), className: "cartContainer", children: [
    /* @__PURE__ */ jsxDEV("h1", { className: "cartTitle", children: t(`cart.title`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
      lineNumber: 44,
      columnNumber: 9
    }, void 0),
    /* @__PURE__ */ jsxDEV("section", { className: "cartContent", children: [
      currencyIsSuccess && Object.keys(cart2).map((id, inx) => {
        const menuItem = menu2(t, currency.rates[currentCurrency])[id];
        return /* @__PURE__ */ jsxDEV(CartItem, { id: menuItem.id, title: menuItem.name, photo: menuItem.photo, price: menuItem.price, currency: currentCurrency, quantity: cart2[id].quantity, increment: handleIncrement, decrement: handleDecrement }, inx, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
          lineNumber: 50,
          columnNumber: 22
        }, void 0);
      }),
      /* @__PURE__ */ jsxDEV("article", { className: "cartCalculation", children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { children: t(`cart.calculation.subTotal`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 56,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { "data-testid": "subTotalTest", children: /* @__PURE__ */ jsxDEV("bdi", { children: [
            /* @__PURE__ */ jsxDEV(Counter, { to: calculateCheckout?.subtotal || 0, animationOptions: { duration: 0.5 }, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 58,
              columnNumber: 105
            }, void 0) }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 58,
              columnNumber: 17
            }, void 0),
            " ",
            /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 58,
              columnNumber: 129
            }, void 0)
          ] }, void 0, true, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 57,
            columnNumber: 45
          }, void 0) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 57,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { children: t(`cart.calculation.tax`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 62,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { "data-testid": "taxTest", children: /* @__PURE__ */ jsxDEV("bdi", { children: [
            /* @__PURE__ */ jsxDEV(Counter, { to: calculateCheckout?.tax || 0, animationOptions: { duration: 0.5 }, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 64,
              columnNumber: 100
            }, void 0) }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 64,
              columnNumber: 17
            }, void 0),
            " ",
            /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 64,
              columnNumber: 124
            }, void 0)
          ] }, void 0, true, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 63,
            columnNumber: 40
          }, void 0) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 63,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
          lineNumber: 61,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { children: t(`cart.calculation.shippingCharges`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 68,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { "data-testid": "shippingTest", children: /* @__PURE__ */ jsxDEV("bdi", { children: [
            /* @__PURE__ */ jsxDEV(Counter, { to: calculateCheckout?.shipping || 0, animationOptions: { duration: 0.5 }, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 70,
              columnNumber: 105
            }, void 0) }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 70,
              columnNumber: 17
            }, void 0),
            " ",
            /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 70,
              columnNumber: 129
            }, void 0)
          ] }, void 0, true, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 69,
            columnNumber: 45
          }, void 0) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 69,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
          lineNumber: 67,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h3", { children: t(`cart.calculation.total`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 74,
            columnNumber: 15
          }, void 0),
          /* @__PURE__ */ jsxDEV("p", { "data-testid": "TotalTest", children: /* @__PURE__ */ jsxDEV("bdi", { children: [
            /* @__PURE__ */ jsxDEV(Counter, { to: calculateCheckout?.total || 0, animationOptions: { duration: 0.5 }, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 76,
              columnNumber: 102
            }, void 0) }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 76,
              columnNumber: 17
            }, void 0),
            " ",
            /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
              lineNumber: 76,
              columnNumber: 126
            }, void 0)
          ] }, void 0, true, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 75,
            columnNumber: 42
          }, void 0) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
            lineNumber: 75,
            columnNumber: 15
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
          lineNumber: 73,
          columnNumber: 13
        }, void 0),
        /* @__PURE__ */ jsxDEV("button", { onClick: handleConfirm, "data-testid": "confirmTest", children: t(`cart.confirmButton.title`) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
          lineNumber: 79,
          columnNumber: 13
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
        lineNumber: 54,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
      lineNumber: 45,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
    lineNumber: 43,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Cart.jsx",
    lineNumber: 42,
    columnNumber: 5
  }, void 0);
};
function routeValidation() {
  return Array.from(arguments).every((state) => {
    if (!state.value && state?.message) {
      state.message();
    }
    return state.value;
  });
}
function CartWrapper() {
  const goto = useNavigate();
  const location = useLocation();
  const prevPage = location.state?.from || "/";
  const cartPage = useMatch("/cart");
  const shippingPage = useMatch("/cart/shipping");
  const { t } = useTranslation();
  const currency = useCurrency();
  const currentCurrency = useCurrentCurrency((state) => state.current);
  const cart2 = useCart((state) => state.cart);
  const [validationState, setValidationState] = useState("loading");
  useEffect(() => {
    if (currency.isLoading) {
      setValidationState("loading");
    } else if (currency.isError) {
      toast.error(t(`msgs.currency.convertError`));
      setValidationState("invalid");
    } else if (currency.isSuccess) {
      const mainValidation = [
        {
          value: Object.keys(cart2).length > 0,
          message: () => toast.error(t(`msgs.cart.empty`))
        }
      ];
      const cartPageValidation = [];
      const shippingPageValidation = [
        {
          value: Object.values(cart2).some((item) => item.quantity > 0),
          message: () => toast.error(t(`msgs.cart.zeroQuantity`))
        }
      ];
      if (routeValidation(...mainValidation)) {
        if (cartPage) {
          if (routeValidation(...cartPageValidation)) {
            setValidationState("valid");
          } else {
            setValidationState("invalid");
          }
        } else if (shippingPage) {
          if (routeValidation(...shippingPageValidation)) {
            setValidationState("valid");
          } else {
            goto("/cart", { replace: true });
          }
        }
      } else {
        setValidationState("invalid");
      }
    }
  }, [cartPage, shippingPage, cart2, currency.isLoading, currency.isError, currency.isSuccess]);
  if (validationState == "loading") {
    return /* @__PURE__ */ jsxDEV(Loading, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/guard/cartWrapper.jsx",
      lineNumber: 82,
      columnNumber: 16
    }, this);
  } else if (validationState == "valid") {
    return /* @__PURE__ */ jsxDEV(Outlet, { context: { cart: cart2, currentCurrency, currency } }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/guard/cartWrapper.jsx",
      lineNumber: 84,
      columnNumber: 16
    }, this);
  } else if (validationState == "invalid") {
    goto(prevPage, { replace: true });
  }
}
const ShippingSchema = (t) => Yup.object({
  homeNumber: Yup.string().required(createMsg(t, "required", "shipping", "homeNumber")),
  city: Yup.string().required(createMsg(t, "required", "shipping", "city")),
  country: Yup.string().required(createMsg(t, "required", "shipping", "country")),
  state: Yup.string().required(createMsg(t, "required", "shipping", "state")),
  pinCode: Yup.string().matches(pinCode.pattern, createMsg(t, "validation", "shipping", "pinCode")).min(pinCode.min, createMsg(t, "min", "shipping", "pinCode", pinCode.min)).required(createMsg(t, "required", "shipping", "pinCode")),
  phoneNumber: Yup.string().matches(phoneNumber.pattern, createMsg(t, "validation", "shipping", "phoneNumber")).min(phoneNumber.min, createMsg(t, "min", "shipping", "phoneNumber", phoneNumber.min)).required(createMsg(t, "required", "shipping", "phoneNumber")),
  "cf-turnstile-response": Yup.string().required(createMsg(t, "securityCheck", "shipping"))
});
const useOrder = create((set) => ({
  order: {},
  add: (payload) => set((state) => ({
    ...state,
    order: {
      ...state.order,
      [payload.orderCode]: { ...payload }
    }
  }))
}));
const createOrder = (cart2, orderId, orderInfo) => {
  const cartClone = { ...cart2 };
  for (let i in cartClone) {
    if (cartClone[i].quantity <= 0)
      delete cartClone[i];
  }
  return {
    order: cartClone,
    orderCode: orderId,
    orderInfo: {
      HNo: orderInfo.homeNumber,
      city: orderInfo.city,
      country: orderInfo.country,
      state: orderInfo.state,
      pinCode: orderInfo.pinCode,
      phoneNo: orderInfo.phoneNumber,
      status: "processing",
      paymentMethod: "card"
    }
  };
};
function usePayment() {
  return useMutation({
    mutationFn: async (data2) => {
      const res = await axios.post("https://accept.paymob.com/v1/intention/", data2, {
        headers: {
          Authorization: `Token ${"egy_sk_test_8825f4e83f2d6d647e9e50961d42951a0029744b66cc3f473fb2acfd8b804100"}`
        }
      });
      return res.data;
    }
  });
}
function replaceAllKeys(items, oldKeys, newKeys) {
  let newItem = {};
  const safeItems = [];
  for (let item of items) {
    for (let key in item) {
      for (let i = 0; i < oldKeys.length; i++) {
        const oldKey = oldKeys[i];
        if (oldKey == key) {
          newItem = { ...item, [newKeys[i]]: item[oldKey] };
          delete newItem[oldKey];
        }
      }
    }
    safeItems.push(newItem);
  }
  return safeItems;
}
function getCurrencyMultiplier(currencyCode) {
  const formatter = new Intl.NumberFormat("en", {
    style: "currency",
    currency: currencyCode,
    currencyDisplay: "code"
  });
  const minorUnits = formatter.resolvedOptions().minimumFractionDigits;
  return Math.pow(10, minorUnits);
}
function convertToCents(currencyCode, amount) {
  const multiplier = getCurrencyMultiplier(currencyCode);
  const convertedAmount = parseFloat(amount) * multiplier;
  return Math.round(convertedAmount);
}
function itemsToCents(items, currencyCode) {
  for (let item of items) {
    const amount = item.amount;
    const toCents = convertToCents(currencyCode, amount);
    item.amount = toCents;
  }
  return items;
}
const first_name = "Burger";
const last_name = "Shop";
const phone_number = "123456789";
const billingData = {
  first_name,
  last_name,
  phone_number
};
const paymentMethods = [
  5407955
];
function useRequestPayment() {
  const { t } = useTranslation();
  const menu2 = useMenu();
  const { cart: cart2, currentCurrency, currency: { data: currency, isSuccess: currencyIsSuccess, isError: currencyIsError } } = useOutletContext();
  const { data: paymentData, mutate: paymentMutate, isSuccess: paymentIsSuccess, isError: paymentIsError } = usePayment();
  const requestPayment = () => {
    if (currencyIsSuccess) {
      const calculateCheckout = checkout(menu2, cart2, currency.rates[currentCurrency]);
      const cartClone = { ...cart2 };
      for (let i in cartClone) {
        if (cartClone[i].quantity <= 0)
          delete cartClone[i];
      }
      const itemsArr = Object.merge(cartClone, menu2(t, currency.rates[currentCurrency]));
      const safeItems = replaceAllKeys(itemsArr, ["title", "price"], ["name", "amount"]);
      const items = itemsToCents(safeItems, currentCurrency);
      items.push({ "name": "Tax", "amount": convertToCents(currentCurrency, calculateCheckout.tax), "quantity": 1 });
      items.push({ "name": "Shipping", "amount": convertToCents(currentCurrency, calculateCheckout.shipping), "quantity": 1 });
      paymentMutate({
        billing_data: billingData,
        amount: convertToCents(currentCurrency, calculateCheckout.total),
        currency: currentCurrency,
        payment_methods: paymentMethods,
        items
      });
    }
  };
  return { paymentData, status: { paymentIsSuccess, paymentIsError, currencyIsSuccess, currencyIsError }, requestPayment, currentCurrency, currency };
}
const Shipping = () => {
  const [clientTurnstile, setClientTurnstile] = useState(/* @__PURE__ */ jsxDEV(Fragment, {}, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
    lineNumber: 19,
    columnNumber: 58
  }, void 0));
  const goto = useNavigate();
  const { t, i18n: i18n2 } = useTranslation();
  const { currentTheme } = useTheme();
  const { cart: cart2 } = useOutletContext();
  const emptyCart = useCart((state) => state.empty);
  const addOrder = useOrder((state) => state.add);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const orderInfoTemp = useRef({});
  const { paymentData, status, requestPayment, currentCurrency } = useRequestPayment();
  const homeNumberId = useId();
  const cityId = useId();
  const countryId = useId();
  const stateId = useId();
  const pinCodeId = useId();
  const phoneNumberId = useId();
  const onUnmount = useRef(() => {
  });
  useEffect(() => {
    Country && setCountries(Country.getAllCountries().map((i, inx) => /* @__PURE__ */ jsxDEV("option", { value: i.isoCode, children: i.name }, inx, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
      lineNumber: 52,
      columnNumber: 7
    }, void 0)));
    State && setStates(State.getStatesOfCountry("IN").map((i, inx) => /* @__PURE__ */ jsxDEV("option", { value: i.isoCode, children: i.name }, inx, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
      lineNumber: 58,
      columnNumber: 7
    }, void 0)));
  }, []);
  const turnstile = useTurnstile();
  const formik = useFormik({
    initialValues,
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
    setClientTurnstile(/* @__PURE__ */ jsxDEV(Turnstile, { sitekey: "0x4AAAAAACBur-_XZ3aaa1GZ", action: "shipping", theme: currentTheme, language: i18n2.language, onVerify: handleOnVerify, style: { justifyContent: "center" } }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
      lineNumber: 81,
      columnNumber: 24
    }, void 0));
  }, [i18n2.language, currentTheme]);
  useEffect(() => {
    if (status.paymentIsSuccess) {
      const order = createOrder(cart2, paymentData?.intention_order_id, orderInfoTemp.current);
      addOrder(order);
      onUnmount.current = () => {
        emptyCart();
      };
      window.open("https://accept.paymob.com/unifiedcheckout/?publicKey=egy_pk_test_zsW3wyBbLm7MhdBUQgdTvoN1SvjhjJp1&clientSecret=" + paymentData?.client_secret, "_blank", "width=1200,height=800,resizable=yes,scrollbars=yes,status=yes");
      goto("/myorders");
    } else if (status.paymentIsError) {
      toast.error(t(`msgs.payment.failed`));
    }
    if (status.currencyIsError) {
      toast.error(t(`msgs.currency.convertError`));
    }
  }, [paymentData, status]);
  useEffect(() => () => {
    onUnmount.current();
  }, [onUnmount.current]);
  const handleOnVerify = (token) => {
    formik.setFieldValue("cf-turnstile-response", token);
    if (formik.errors["cf-turnstile-response"]) {
      formik.setFieldError("cf-turnstile-response", "");
    }
  };
  return /* @__PURE__ */ jsxDEV("main", { className: "shipping", children: [
    /* @__PURE__ */ jsxDEV(motion.section, { ...upIn(0, "animate"), className: "shippingContainer", children: [
      /* @__PURE__ */ jsxDEV("h1", { className: "shippingTitle", children: t(`shipping.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
        lineNumber: 121,
        columnNumber: 9
      }, void 0),
      /* @__PURE__ */ jsxDEV("form", { onSubmit: formik.handleSubmit, children: [
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: homeNumberId, children: t(`shipping.form.inputs.homeNumber.label`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 124,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDEV("input", { type: "text", id: homeNumberId, name: "homeNumber", placeholder: t(`shipping.form.inputs.homeNumber.placeholder`), value: formik.values.homeNumber, onChange: formik.handleChange, onBlur: formik.handleBlur, onReset: formik.handleReset, "data-testid": "homeNumberTest" }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 125,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 123,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { children: formik.errors.homeNumber }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 127,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: cityId, children: t(`shipping.form.inputs.city.label`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 130,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDEV("input", { type: "text", id: cityId, name: "city", placeholder: t(`shipping.form.inputs.city.placeholder`), value: formik.values.city, onChange: formik.handleChange, onBlur: formik.handleBlur, onReset: formik.handleReset, "data-testid": "cityTest" }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 131,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 129,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { children: formik.errors.city }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 133,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: countryId, children: t(`shipping.form.inputs.country.label`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 136,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDEV("select", { id: countryId, name: "country", value: formik.values.country, onChange: formik.handleChange, onBlur: formik.handleBlur, onReset: formik.handleReset, "data-testid": "countryTest", children: [
            /* @__PURE__ */ jsxDEV("option", { value: "", children: t(`shipping.form.inputs.country.placeholder`) }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
              lineNumber: 138,
              columnNumber: 15
            }, void 0),
            countries
          ] }, void 0, true, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 137,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 135,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { children: formik.errors.country }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 142,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: stateId, children: t(`shipping.form.inputs.state.label`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 145,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDEV("select", { id: stateId, name: "state", value: formik.values.state, onChange: formik.handleChange, onBlur: formik.handleBlur, onReset: formik.handleReset, "data-testid": "stateTest", children: [
            /* @__PURE__ */ jsxDEV("option", { value: "", children: t(`shipping.form.inputs.state.placeholder`) }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
              lineNumber: 147,
              columnNumber: 15
            }, void 0),
            states
          ] }, void 0, true, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 146,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 144,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { children: formik.errors.state }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 151,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: pinCodeId, children: t(`shipping.form.inputs.pinCode.label`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 154,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDEV("input", { type: "number", id: pinCodeId, name: "pinCode", placeholder: t(`shipping.form.inputs.pinCode.placeholder`), value: formik.values.pinCode, onChange: formik.handleChange, onBlur: formik.handleBlur, onReset: formik.handleReset, "data-testid": "pinCodeTest" }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 155,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 153,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { children: formik.errors.pinCode }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 157,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("label", { htmlFor: phoneNumberId, children: t(`shipping.form.inputs.phoneNumber.label`) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 160,
            columnNumber: 13
          }, void 0),
          /* @__PURE__ */ jsxDEV("input", { type: "number", id: phoneNumberId, name: "phoneNumber", placeholder: t(`shipping.form.inputs.phoneNumber.placeholder`), value: formik.values.phoneNumber, onChange: formik.handleChange, onBlur: formik.handleBlur, onReset: formik.handleReset, "data-testid": "phoneNumberTest" }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
            lineNumber: 161,
            columnNumber: 13
          }, void 0)
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 159,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("span", { children: formik.errors.phoneNumber }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 163,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 165,
          columnNumber: 11
        }, void 0),
        clientTurnstile,
        /* @__PURE__ */ jsxDEV("span", { children: formik.errors["cf-turnstile-response"] }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 167,
          columnNumber: 11
        }, void 0),
        /* @__PURE__ */ jsxDEV("button", { type: "submit", disabled: formik.isSubmitting, className: "link", style: { outLine: "none", border: "none" }, "data-testid": "checkoutTest", children: [
          " ",
          formik.isSubmitting ? t(`shipping.form.submit.loadingTitle`) : t(`shipping.form.submit.title`) + currentCurrency,
          " "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
          lineNumber: 169,
          columnNumber: 11
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
        lineNumber: 122,
        columnNumber: 9
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
      lineNumber: 120,
      columnNumber: 7
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { style: { position: "fixed", bottom: 0, right: 0, color: "#000000" }, children: [
      /* @__PURE__ */ jsxDEV("bdi", { children: "استخدم العملة المصرية EGP عند الدفع لان بوابة الدفع في وضع اللإختبار لا تقبل إلا العملة المصرية" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
        lineNumber: 176,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
        lineNumber: 177,
        columnNumber: 11
      }, void 0),
      /* @__PURE__ */ jsxDEV("bdi", { children: "use egypt currency because payment get way apply EGP only in test mode" }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
        lineNumber: 178,
        columnNumber: 11
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
      lineNumber: 175,
      columnNumber: 9
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/cart/Shipping.jsx",
    lineNumber: 119,
    columnNumber: 5
  }, void 0);
};
const initialValues = {
  homeNumber: "",
  city: "",
  country: "",
  state: "",
  pinCode: "",
  phoneNumber: "",
  "cf-turnstile-response": ""
};
function OrderWrapper() {
  const goto = useNavigate();
  const location = useLocation();
  const prevPage = location.state?.from || "/";
  const { id: orderId } = useParams();
  const myOrders2 = useMatch("/myorders");
  const orderDetails2 = useMatch("/myorders/:id");
  const { t } = useTranslation();
  const currency = useCurrency();
  const currentCurrency = useCurrentCurrency((state) => state.current);
  const order = useOrder((state) => state.order);
  const [validationState, setValidationState] = useState("loading");
  useEffect(() => {
    if (currency.isLoading) {
      setValidationState("loading");
    } else if (currency.isError) {
      toast.error(t(`msgs.currency.convertError`));
      setValidationState("invalid");
    } else if (currency.isSuccess) {
      const mainValidation = [
        {
          value: Object.keys(order).length > 0,
          message: () => toast.error(t(`msgs.orders.empty`))
        }
      ];
      const myOrdersPageValidation = [];
      const orderDetailsPageValidation = [
        {
          value: order[orderId],
          message: () => toast.error(t(`msgs.orders.unKnownId`))
        }
      ];
      if (routeValidation(...mainValidation)) {
        if (myOrders2) {
          if (routeValidation(...myOrdersPageValidation)) {
            setValidationState("valid");
          } else {
            setValidationState("invalid");
          }
        } else if (orderDetails2) {
          if (routeValidation(...orderDetailsPageValidation)) {
            setValidationState("valid");
          } else {
            goto("/myorders", { replace: true });
          }
        }
      } else {
        setValidationState("invalid");
      }
    }
  }, [myOrders2, orderDetails2, orderId, order, currency.isError, currency.isLoading, currency.isSuccess]);
  if (validationState == "loading") {
    return /* @__PURE__ */ jsxDEV(Loading, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/guard/orderWrapper.jsx",
      lineNumber: 82,
      columnNumber: 16
    }, this);
  } else if (validationState == "valid") {
    return /* @__PURE__ */ jsxDEV(Outlet, { context: { order, currentCurrency, currency } }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/guard/orderWrapper.jsx",
      lineNumber: 84,
      columnNumber: 16
    }, this);
  } else if (validationState == "invalid") {
    goto(prevPage, { replace: true });
  }
}
const MyOrders = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { order, currentCurrency, currency: { data: currency, isSuccess: currencyIsSuccess } } = useOutletContext();
  const menu2 = useMenu();
  return /* @__PURE__ */ jsxDEV("section", { className: "tableClass", children: /* @__PURE__ */ jsxDEV(motion.section, { ...upIn(0, "animate"), children: /* @__PURE__ */ jsxDEV("table", { children: [
    /* @__PURE__ */ jsxDEV("thead", { children: /* @__PURE__ */ jsxDEV("tr", { children: [
      /* @__PURE__ */ jsxDEV("th", { children: t(`myOrders.ordersTable.header.orderId`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 27,
        columnNumber: 15
      }, void 0),
      /* @__PURE__ */ jsxDEV("th", { children: t(`myOrders.ordersTable.header.status`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 28,
        columnNumber: 15
      }, void 0),
      /* @__PURE__ */ jsxDEV("th", { children: t(`myOrders.ordersTable.header.totalPrice`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 29,
        columnNumber: 15
      }, void 0),
      /* @__PURE__ */ jsxDEV("th", { children: t(`myOrders.ordersTable.header.paymentMethod`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 30,
        columnNumber: 15
      }, void 0),
      /* @__PURE__ */ jsxDEV("th", { children: t(`myOrders.ordersTable.header.action`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 31,
        columnNumber: 15
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
      lineNumber: 26,
      columnNumber: 13
    }, void 0) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
      lineNumber: 25,
      columnNumber: 11
    }, void 0),
    /* @__PURE__ */ jsxDEV("tbody", { children: Object.values(order).map((item, inx) => /* @__PURE__ */ jsxDEV("tr", { children: [
      /* @__PURE__ */ jsxDEV("td", { children: item.orderCode }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 37,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("td", { children: t(`myOrders.status.${item.orderInfo.status}`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 38,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("td", { children: currencyIsSuccess && /* @__PURE__ */ jsxDEV("bdi", { children: [
        checkout(menu2, item.order, currency.rates[currentCurrency]).total,
        " ",
        /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
          lineNumber: 39,
          columnNumber: 119
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 39,
        columnNumber: 44
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 39,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("td", { children: t(`myOrders.paymentMethods.${item.orderInfo.paymentMethod}`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 40,
        columnNumber: 17
      }, void 0),
      /* @__PURE__ */ jsxDEV("td", { children: /* @__PURE__ */ jsxDEV(Link, { to: `/myorders/${item.orderCode}`, state: { from: location.pathname }, children: /* @__PURE__ */ jsxDEV(AiOutlineEye, {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 43,
        columnNumber: 21
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 42,
        columnNumber: 19
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
        lineNumber: 41,
        columnNumber: 17
      }, void 0)
    ] }, inx, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
      lineNumber: 36,
      columnNumber: 15
    }, void 0)) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
      lineNumber: 34,
      columnNumber: 11
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
    lineNumber: 24,
    columnNumber: 9
  }, void 0) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
    lineNumber: 23,
    columnNumber: 7
  }, void 0) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/MyOrders.jsx",
    lineNumber: 22,
    columnNumber: 5
  }, void 0);
};
function GrPrint(props) {
  return GenIcon({ "attr": { "viewBox": "0 0 24 24" }, "child": [{ "tag": "path", "attr": { "fill": "none", "strokeWidth": "2", "d": "M6,19 L1,19 L1,7 L23,7 L23,19 L18,19 M3,16 L21,16 M6,16 L6,23 L6,23 L18,23 L18,16 M18,7 L18,1 L6,1 L6,7 L6,7 M17,12 L19,12 L19,11 L17,11 L17,12 Z" } }] })(props);
}
const OrderDetails = () => {
  const { id: orderId } = useParams();
  const { t } = useTranslation();
  const { order: Orders, currentCurrency, currency: { data: currency, isSuccess: currencyIsSuccess } } = useOutletContext();
  const order = Orders[orderId];
  const menu2 = useMenu();
  const calculateCheckout = useMemo(() => currencyIsSuccess ? checkout(menu2, order.order, currency.rates[currentCurrency]) : {}, [currentCurrency, currency, menu2, currencyIsSuccess, order.order]);
  return /* @__PURE__ */ jsxDEV("main", { className: "orderDetails", children: /* @__PURE__ */ jsxDEV("section", { className: "orderDetailsContainer", children: [
    /* @__PURE__ */ jsxDEV("span", { className: "printButton", onClick: () => {
      window.print();
    }, children: /* @__PURE__ */ jsxDEV(GrPrint, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 29,
      columnNumber: 78
    }, void 0) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 29,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("h1", { className: "orderDetailsTitle", children: t(`orderDetails.title`) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 30,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { children: t(`orderDetails.details.shipping.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 32,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: [
        /* @__PURE__ */ jsxDEV("b", { children: [
          t(`orderDetails.details.shipping.items.address`),
          " : "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 34,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("i", { children: order.orderInfo.country + " " + order.orderInfo.state + " " + order.orderInfo.city + " " + order.orderInfo.HNo }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 35,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 33,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: [
        /* @__PURE__ */ jsxDEV("b", { children: [
          t(`orderDetails.details.shipping.items.pinCode`),
          " : "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 38,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("i", { children: order.orderInfo.pinCode }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 39,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 37,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 31,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { children: t(`orderDetails.details.contact.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 43,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: [
        /* @__PURE__ */ jsxDEV("b", { children: [
          t(`orderDetails.details.contact.items.phone`),
          " : "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 45,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("i", { children: order.orderInfo.phoneNo }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 46,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 44,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 42,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { children: t(`orderDetails.details.status.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 50,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: [
        /* @__PURE__ */ jsxDEV("b", { children: [
          t(`orderDetails.details.status.items.orderStatus`),
          " : "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 52,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("i", { children: t(`myOrders.status.${order.orderInfo.status}`) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 53,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 51,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 49,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { children: t(`orderDetails.details.payment.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 57,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: [
        /* @__PURE__ */ jsxDEV("b", { children: [
          t(`orderDetails.details.payment.items.paymentMethod`),
          " : "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 59,
          columnNumber: 25
        }, void 0),
        /* @__PURE__ */ jsxDEV("i", { children: t(`myOrders.paymentMethods.${order.orderInfo.paymentMethod}`) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 60,
          columnNumber: 25
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 58,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 56,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { children: [
      /* @__PURE__ */ jsxDEV("h2", { children: t(`orderDetails.details.amount.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 64,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: /* @__PURE__ */ jsxDEV("bdi", { children: [
        /* @__PURE__ */ jsxDEV("b", { children: [
          t(`orderDetails.details.amount.items.itemsTotal`),
          " : "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 66,
          columnNumber: 30
        }, void 0),
        /* @__PURE__ */ jsxDEV("i", { children: /* @__PURE__ */ jsxDEV(Counter, { to: calculateCheckout?.subtotal, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 66,
          columnNumber: 140
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 66,
          columnNumber: 96
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 66,
          columnNumber: 93
        }, void 0),
        " ",
        /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 66,
          columnNumber: 168
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 66,
        columnNumber: 25
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 65,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: /* @__PURE__ */ jsxDEV("bdi", { children: [
        /* @__PURE__ */ jsxDEV("b", { children: [
          t(`orderDetails.details.amount.items.shippingCharges`),
          " : "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 69,
          columnNumber: 30
        }, void 0),
        /* @__PURE__ */ jsxDEV("i", { children: /* @__PURE__ */ jsxDEV(Counter, { to: calculateCheckout?.shipping, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 69,
          columnNumber: 145
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 69,
          columnNumber: 101
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 69,
          columnNumber: 98
        }, void 0),
        " ",
        /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 69,
          columnNumber: 173
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 69,
        columnNumber: 25
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 68,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("p", { children: /* @__PURE__ */ jsxDEV("bdi", { children: [
        /* @__PURE__ */ jsxDEV("b", { children: [
          t(`orderDetails.details.amount.items.tax`),
          " : "
        ] }, void 0, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 72,
          columnNumber: 30
        }, void 0),
        /* @__PURE__ */ jsxDEV("i", { children: /* @__PURE__ */ jsxDEV(Counter, { to: calculateCheckout?.tax, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 72,
          columnNumber: 128
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 72,
          columnNumber: 89
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 72,
          columnNumber: 86
        }, void 0),
        " ",
        /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 72,
          columnNumber: 156
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 72,
        columnNumber: 25
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 71,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 63,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("div", { className: "total", children: [
      /* @__PURE__ */ jsxDEV("h3", { children: t(`orderDetails.details.amount.items.total`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 76,
        columnNumber: 21
      }, void 0),
      /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("bdi", { children: [
        /* @__PURE__ */ jsxDEV(Counter, { to: calculateCheckout?.total, children: /* @__PURE__ */ jsxDEV("span", {}, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 78,
          columnNumber: 71
        }, void 0) }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 78,
          columnNumber: 30
        }, void 0),
        " ",
        /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 78,
          columnNumber: 95
        }, void 0)
      ] }, void 0, true, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 78,
        columnNumber: 25
      }, void 0) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 77,
        columnNumber: 21
      }, void 0)
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 75,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 81,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("br", {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 82,
      columnNumber: 17
    }, void 0),
    /* @__PURE__ */ jsxDEV("article", { children: [
      /* @__PURE__ */ jsxDEV("h2", { children: t(`orderDetails.details.orderedItems.title`) }, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
        lineNumber: 84,
        columnNumber: 21
      }, void 0),
      currencyIsSuccess && Object.keys(order.order).map((id, inx) => {
        const menuItem = menu2(t, currency.rates[currentCurrency])[id];
        return /* @__PURE__ */ jsxDEV("div", { children: [
          /* @__PURE__ */ jsxDEV("h4", { children: menuItem.name }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
            lineNumber: 90,
            columnNumber: 33
          }, void 0),
          /* @__PURE__ */ jsxDEV("div", { children: /* @__PURE__ */ jsxDEV("bdi", { children: [
            /* @__PURE__ */ jsxDEV("span", { children: order.order[id].quantity }, void 0, false, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
              lineNumber: 91,
              columnNumber: 43
            }, void 0),
            " x ",
            /* @__PURE__ */ jsxDEV("span", { children: [
              menuItem.price,
              " ",
              /* @__PURE__ */ jsxDEV(CurrencyIcon, { currency: currentCurrency }, void 0, false, {
                fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
                lineNumber: 91,
                columnNumber: 112
              }, void 0)
            ] }, void 0, true, {
              fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
              lineNumber: 91,
              columnNumber: 87
            }, void 0)
          ] }, void 0, true, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
            lineNumber: 91,
            columnNumber: 38
          }, void 0) }, void 0, false, {
            fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
            lineNumber: 91,
            columnNumber: 33
          }, void 0)
        ] }, inx, true, {
          fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
          lineNumber: 89,
          columnNumber: 29
        }, void 0);
      })
    ] }, void 0, true, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
      lineNumber: 83,
      columnNumber: 17
    }, void 0)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
    lineNumber: 28,
    columnNumber: 13
  }, void 0) }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/components/myOrders/OrderDetails.jsx",
    lineNumber: 26,
    columnNumber: 9
  }, void 0);
};
const routesArray = [
  { path: "/:language?", element: /* @__PURE__ */ jsxDEV(Home, {}, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
    lineNumber: 15,
    columnNumber: 37
  }, void 0) },
  { path: ":language?/about", element: /* @__PURE__ */ jsxDEV(About, {}, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
    lineNumber: 16,
    columnNumber: 42
  }, void 0) },
  {
    path: ":language?/cart",
    element: /* @__PURE__ */ jsxDEV(CartWrapper, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
      lineNumber: 19,
      columnNumber: 18
    }, void 0),
    children: [
      { index: true, element: /* @__PURE__ */ jsxDEV(Cart, {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
        lineNumber: 21,
        columnNumber: 37
      }, void 0) },
      { path: "shipping", element: /* @__PURE__ */ jsxDEV(Shipping, {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
        lineNumber: 22,
        columnNumber: 42
      }, void 0) }
    ]
  },
  {
    path: ":language?/myorders",
    element: /* @__PURE__ */ jsxDEV(OrderWrapper, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
      lineNumber: 27,
      columnNumber: 18
    }, void 0),
    children: [
      { index: true, element: /* @__PURE__ */ jsxDEV(MyOrders, {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
        lineNumber: 29,
        columnNumber: 37
      }, void 0) },
      { path: ":id", element: /* @__PURE__ */ jsxDEV(OrderDetails, {}, void 0, false, {
        fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
        lineNumber: 30,
        columnNumber: 37
      }, void 0) }
    ]
  },
  { path: ":language?/contact", element: /* @__PURE__ */ jsxDEV(Contact, {}, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
    lineNumber: 33,
    columnNumber: 44
  }, void 0) },
  { path: "*", element: /* @__PURE__ */ jsxDEV(Fragment, { children: "notFound" }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/routes/routes.jsx",
    lineNumber: 34,
    columnNumber: 27
  }, void 0) }
];
function Routes() {
  return useRoutes(routesArray);
}
emailjs.init("xQJRC_Iq9E2ioCsqa");
function App() {
  const detectCurrentCurrency = useCurrentCurrency((state) => state.detect);
  useEffect(() => {
    const isBot = /bot|crawler|spider|crawling|googlebot|bingbot|yandex/i.test(navigator.userAgent);
    !isBot && i18n.changeLanguage(detectLanguage());
    detectCurrentCurrency();
  }, []);
  return /* @__PURE__ */ jsxDEV(Fragment, { children: [
    /* @__PURE__ */ jsxDEV(SEO, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/App.jsx",
      lineNumber: 60,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Header, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/App.jsx",
      lineNumber: 61,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(ToastContainer, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/App.jsx",
      lineNumber: 62,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(ScrollFollow, { currentPath: "/", target: "#menu", icon: /* @__PURE__ */ jsxDEV(BiSolidFoodMenu, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/App.jsx",
      lineNumber: 63,
      columnNumber: 62
    }, this), children: /* @__PURE__ */ jsxDEV(Routes, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/App.jsx",
      lineNumber: 64,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/App.jsx",
      lineNumber: 63,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(Footer, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/App.jsx",
      lineNumber: 66,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/App.jsx",
    lineNumber: 59,
    columnNumber: 5
  }, this);
}
const changeTheme = (theme) => {
  typeof document !== "undefined" && document.documentElement.setAttribute("data-theme", theme);
  typeof window !== "undefined" && localStorage.setItem("theme", theme);
};
const detectTheme = () => {
  const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : "dark";
  if (savedTheme) {
    typeof document !== "undefined" && document.documentElement.setAttribute("data-theme", savedTheme);
    return savedTheme;
  } else {
    const browserTheme = window.matchMedia && window.matchMedia(`(prefers-color-scheme: ${themes.dark.value})`).matches;
    const theme = browserTheme ? themes.dark.value : themes.light.value;
    changeTheme(theme);
    return theme;
  }
};
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(detectTheme());
  function handleChangeTheme(theme2) {
    changeTheme(theme2);
    setTheme(detectTheme());
  }
  return /* @__PURE__ */ jsxDEV(Theme.Provider, { value: { changeTheme: handleChangeTheme, currentTheme: theme }, children }, void 0, false, {
    fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/theme/themeProvider.jsx",
    lineNumber: 15,
    columnNumber: 9
  }, this);
}
function isAllInteger() {
  Number.isAllInteger = (...numbers) => {
    for (const i of [...numbers]) {
      if (!Number.isInteger(i))
        return false;
    }
    return true;
  };
}
function objectMerge() {
  Object.merge = merge;
  function merge(obj1, obj2, options = { type: Array }) {
    let temp = {};
    let output = new options.type();
    for (let key in obj1) {
      if (options.type == Array) {
        temp = { ...obj1[key], ...obj2[key] };
        output.push(temp);
      } else if (options.type == Object) {
        temp = { [key]: { ...obj1[key], ...obj2[key] } };
        output = { ...output, ...temp };
      }
      temp = {};
    }
    return output;
  }
}
function renderInServer(url, language) {
  i18n.changeLanguage(language);
  objectMerge();
  isAllInteger();
  const client = new QueryClient();
  const helmetContext = {};
  const html = renderToString(
    /* @__PURE__ */ jsxDEV(LanguageProvider, { children: /* @__PURE__ */ jsxDEV(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsxDEV(ThemeProvider, { children: /* @__PURE__ */ jsxDEV(QueryClientProvider, { client, children: /* @__PURE__ */ jsxDEV(MenuProvider, { children: /* @__PURE__ */ jsxDEV(StaticRouter, { location: url, children: /* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/serverEntry.jsx",
      lineNumber: 33,
      columnNumber: 33
    }, this) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/serverEntry.jsx",
      lineNumber: 32,
      columnNumber: 29
    }, this) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/serverEntry.jsx",
      lineNumber: 31,
      columnNumber: 25
    }, this) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/serverEntry.jsx",
      lineNumber: 30,
      columnNumber: 21
    }, this) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/serverEntry.jsx",
      lineNumber: 29,
      columnNumber: 17
    }, this) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/serverEntry.jsx",
      lineNumber: 28,
      columnNumber: 13
    }, this) }, void 0, false, {
      fileName: "I:/Mohamed/19--web/CV projects/Burger-Shop/Burger-Shop - Copy/FrontEnd/src/serverEntry.jsx",
      lineNumber: 27,
      columnNumber: 9
    }, this)
  );
  return { html, helmet: helmetContext.helmet };
}
export {
  renderInServer as default
};
