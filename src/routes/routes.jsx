import CartWrapper from "../components/templates/cartWrapper";
import Shipping from "../components/cart/Shipping";
import { Outlet, useRoutes } from "react-router";

const routesArray = [
    { path: '/:language?', element: <>home</> },
    { path: ':language?/about', element: <>about</> },
    {
        path: ':language?/cart',
        element: <CartWrapper/>,
        children: [
            { index: true, element: <>cart</> },
            { path: 'shipping', element: <Shipping/> }
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
    { path: ':language?/contact', element: <>contact</> },
    { path: '*', element: <>notFound</> }
];

function Routes() {
    return useRoutes(routesArray);
}

export default Routes;