import { Outlet, useRoutes } from "react-router";
import OrderWrapper from "../components/templates/orderWrapper";
import OrderDetails from "../components/myOrders/OrderDetails";

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
            { index: true, element: <>my orders</> },
            { path: ':id', element: <OrderDetails/> }
        ]
    },
    { path: ':language?/contact', element: <>contact</> },
    { path: '*', element: <>notFound</> }
];

function Routes() {
    return useRoutes(routesArray);
}

export default Routes;