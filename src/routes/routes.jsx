import CartWrapper from "../components/guard/cartWrapper";
import Cart from "../components/cart/Cart";
import { Outlet, useRoutes } from "react-router";

const routesArray = [
    { path: '/:language?', element: <>home</> },
    { path: ':language?/about', element: <>about</> },
    {
        path: ':language?/cart',
        element: <CartWrapper/>,
        children: [
            { index: true, element: <Cart/>},
            { path: 'shipping', element: <>shipping</> }
        ]
    },
    {
        path: ':language?/myorders',
        element: <Outlet />,
        children: [
            { index: true, element: <>my orders</> },
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