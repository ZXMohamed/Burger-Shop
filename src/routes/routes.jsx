import About from "../components/about/About";
import { Outlet, useRoutes } from "react-router";

const routesArray = [
    { path: '/:language?', element: <>home</> },
    { path: ':language?/about', element: <About/> },
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