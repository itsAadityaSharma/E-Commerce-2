//06:05:00
import React, { useEffect } from "react";
import "./App.css";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage.js";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import CartPage from "./pages/CartPage.js";
import Checkout from "./pages/Checkout.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import Protected from "./features/auth/components/Protected.js";
import Navbar from "./features/Navbar/Navbar.js";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/AuthSlice.js";
import {
  fetchItemByUserIdAsync,
  selectCartProduct,
  selectLatestItems,
} from "./features/cart/CartSlice.js";
import PageNotFound from "./pages/404.js";
import OrderSuccessPage from "./pages/order-success.js";
import UserOrder from "./features/user/components/UserOrder.js";
import UserOrderPage from "./pages/UserOrderPage.js";
import { UserProfile } from "./features/user/components/UserProfile.js";
import UrseProfilePage from "./pages/UrseProfilePage.js";
import { fetchLoggedInUserAsync } from "./features/user/UserSlice.js";
import LogOut from "./features/auth/components/LogOut.js";
import ForgotPasswordPage from "./pages/forgotPasswordPage.js";
import AdminHome from "./pages/AdminHome.js";
import AdminProductDetailPage from "./pages/AdminProductDetailPage.js";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin.js";
import ProductForm from "./features/admin/component/ProductForm.js";
import AdminProductFormPage from "./pages/AdminProductFormPage.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignUpPage></SignUpPage>,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage></CartPage>
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout></Checkout>
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage></ProductDetailPage>
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/orders",
    element: <UserOrderPage></UserOrderPage>,
  },
  {
    path: "/profile",
    element: <UrseProfilePage></UrseProfilePage>,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>,
  },
  {
    path: "/logout",
    element: <LogOut></LogOut>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const item = useSelector(selectLatestItems);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user, item]);

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* Link must be inside the Provider */}
    </div>
  );
}

export default App;
