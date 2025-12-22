import OrderWrapper from "../components/guard/orderWrapper";
import MyOrders from "../components/myOrders/MyOrders";
import { Outlet, useRoutes } from "react-router";

const routesArray = [
    { path: '/:language?', element: <>home</> },
    { path: ':language?/about', element: <>about</> },
    {
        path: ':language?/cart',
        element: <Outlet />,
        children: [
            { index: true, element: <>cart</> },
            { path: 'shipping', element: <>shipping</> }
        ]
    },
    {
        path: ':language?/myorders',
        element: <OrderWrapper/>,
        children: [
            { index: true, element: <MyOrders/> },
            { path: ':id', element: <>order</> }
        ]
    },
    { path: ':language?/contact', element: <>contact</> },
    { path: '*', element: <>notFound</> }
];

function Routes() {
    return useRoutes(routesArray);
}

export default Routes;