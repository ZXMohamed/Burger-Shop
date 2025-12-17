import { Outlet, useRoutes } from "react-router";
import Home from "../components/home/Home";
import About from "../components/about/About";
import Contact from "../components/contact/Contact";
import Cart from "../components/cart/Cart";
import CartWrapper from "../components/templates/cartWrapper";

const routesArray = [
    { path: '/:language?', element: <Home /> },
    { path: ':language?/about', element: <About/> },
    {
        path: ':language?/cart',
        element: <CartWrapper/>,
        children: [
            { index: true, element: <Cart/> },
            { path: 'shipping', element: <>shipping</> }
        ]
    },
    {
        path: ':language?/myorders',
        element: <Outlet />,
        children: [
            { index: true, element: <>my orders</> },
            { path: 'order/:id', element: <>order</> }
        ]
    },
    { path: ':language?/contact', element: <Contact/> },
    { path: '*', element: <>notFound</> }
];

function Routes() {
    return useRoutes(routesArray);
}

export default Routes;