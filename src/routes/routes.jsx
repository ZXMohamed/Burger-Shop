import { Outlet, useRoutes } from "react-router";
import Home from "../components/home/Home";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Cart from "../components/cart/Cart";
import CartWrapper from "../components/guard/cartWrapper";
import Shipping from "../components/cart/Shipping";
import OrderWrapper from "../components/guard/orderWrapper";
import MyOrders from "../components/myOrders/MyOrders";
import OrderDetails from "../components/myOrders/OrderDetails";

//*language param for SEO only

const routesArray = [
    { path: '/:language?', element: <Home /> },
    { path: ':language?/about', element: <About/> },
    {
        path: ':language?/cart',
        element: <CartWrapper/>,
        children: [
            { index: true, element: <Cart/> },
            { path: 'shipping', element: <Shipping/> }
        ]
    },
    {
        path: ':language?/myorders',
        element: <OrderWrapper/>,
        children: [
            { index: true, element: <MyOrders/> },
            { path: ':id', element: <OrderDetails/>}
        ]
    },
    { path: ':language?/contact', element: <Contact/> },
    { path: '*', element: <>notFound</> }
];

function Routes() {
    return useRoutes(routesArray);
}

export default Routes;