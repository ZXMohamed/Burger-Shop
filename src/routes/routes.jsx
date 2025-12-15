import Home from "../components/home/Home"
import { Outlet, useRoutes } from "react-router";

const routesArray = [
    { path: '/:language?', element: <Home /> },
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