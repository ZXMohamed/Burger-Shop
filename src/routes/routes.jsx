import Home from "../components/home/Home"
import { Outlet, useRoutes } from "react-router";

const routesArray = [
    { path: '/', element: <Home /> },
    { path: 'about', element: <>about</> },
    {
        path: 'cart',
        element: <Outlet />,
        children: [
            { index: true, element: <>cart</> },
            { path: 'shipping', element: <>shipping</> }
        ]
    },
    {
        path: 'myorders',
        element: <Outlet />,
        children: [
            { index: true, element: <>my orders</> },
            { path: 'order/:id', element: <>order</> }
        ]
    },
    { path: 'contact', element: <>contact</> },
    { path: '*', element: <>notFound</> }
];

function Routes() {
    return useRoutes(routesArray);
}

export default Routes;