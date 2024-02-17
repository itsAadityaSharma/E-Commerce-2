//4:19:00
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
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const item = useSelector(selectLatestItems);

  useEffect(() => {
    if (user) dispatch(fetchItemByUserIdAsync(user.id));
  }, [dispatch, user, item]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
