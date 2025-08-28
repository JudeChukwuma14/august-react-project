import { lazy, Suspense } from "react";
import { Spinner } from "../components/common/Spinner";
import { createBrowserRouter } from "react-router-dom";
import { WebLayout } from "../layouts/WebLayout";
import { SellerLayout } from "../layouts/Seller";
// import { Dashboard } from "../Seller/pages/Dashboard";
// import { Product } from "../Seller/pages/Product";
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const Shop = lazy(() => import("../pages/Shop"));
const Signup = lazy(() => import("../components/auth/Signup"));
const Login = lazy(() => import("../components/auth/Signin"));
const SignupSeller = lazy(() => import("../components/auth/SignupSeller"));
const LoginSeller = lazy(() => import("../components/auth/LoginSeller"));
const Selectpath = lazy(() => import("../components/auth/Selectpath"));

// seller pages
const Dashboard = lazy(()=>import("../Seller/pages/Dashboard"))
const Product = lazy(() => import("../Seller/pages/Product"));
const withSuspense = (Component) => (
  <Suspense fallback={<Spinner />}>
    <Component />
  </Suspense>
);

const rotuerConfig = [
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        index: true,
        element: withSuspense(Home),
      },
      {
        path: "about",
        element: withSuspense(About),
      },
      {
        path: "contact",
        element: withSuspense(Contact),
      },
      {
        path: "shop",
        element: withSuspense(Shop),
      },
    ],
  },
  {
    path: "/seller",
    element: <SellerLayout />,
    children: [
     {
      index: true,
      element: withSuspense(Dashboard)
     },
     {
        path: "post-product",
        element: withSuspense(Product),
      },
    ],
  },

  { path: "/signup", element: withSuspense(Signup) },
  { path: "/login", element: withSuspense(Login) },

  { path: "/seller-signup", element: withSuspense(SignupSeller) },
  { path: "/seller-login", element: withSuspense(LoginSeller) },
  { path: "/selectpath", element: withSuspense(Selectpath) },
];

export const mainRouter = createBrowserRouter(rotuerConfig);
