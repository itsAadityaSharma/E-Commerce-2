import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  deleteCartItemAsync,
  selectCartProduct,
  updateCartByIdAsync,
} from "../features/cart/CartSlice";
import { useForm } from "react-hook-form";
import {
  selectLoggedInUser,
  updateUserAsync,
} from "../features/auth/AuthSlice";
import { createOrderAsync } from "../features/order/orderSlice";

const Checkout = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const user = useSelector(selectLoggedInUser);

  const [open, setOpen] = useState(true);
  const products = useSelector(selectCartProduct);
  const totalAmount = products.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = products.reduce((total, item) => item.quantity + total, 0);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const handleAddress = (e) => {
    console.log(e.target.value);
    setSelectedAddress(user.addresses[e.target.value]);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
    console.log(e.target.value);
  };

  const handleOrder = (e) => {
    const order = {
      products,
      totalAmount,
      user,
      paymentMethod,
      selectedAddress,
    };
    dispatch(createOrderAsync(order));
    //TODO:redirect to order-success page
    //TODO:clear cart after order
    //TODO : on server change the stock number of items
  };

  const handleQuantity = (e, product) => {
    dispatch(updateCartByIdAsync({ ...product, quantity: +e.target.value }));
  };

  const handleRemove = (e, id) => {
    dispatch(deleteCartItemAsync(id));
  };

  useEffect(() => {}, [dispatch]);

  return (
    <>
      {products.length === 0 && <Navigate to="/" replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 text-left">
          <div className="lg:col-span-3">
            <form
              className="bg-white px-5 py-10 mt-12"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                dispatch(
                  updateUserAsync({
                    ...user,
                    addresses: [...user.addresses, data],
                  })
                );
                reset();
                console.log(data);
              })}
            >
              <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">
                  <h2 class="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                      <label
                        for="first-name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required",
                          })}
                          id="first-name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-4">
                      <label
                        for="email"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div class="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          type="email"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-3">
                      <label
                        for="phone"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div class="mt-2">
                        <input
                          type="tel"
                          {...register("phone", {
                            required: "phone is required",
                          })}
                          id="phone"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="col-span-full">
                      <label
                        for="street-address"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "name is required",
                          })}
                          id="street"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2 sm:col-start-1">
                      <label
                        for="city"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required",
                          })}
                          id="city"
                          autocomplete="address-level2"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label
                        for="state"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required",
                          })}
                          id="state"
                          autocomplete="address-level1"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label
                        for="pincode"
                        class="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div class="mt-2">
                        <input
                          type="text"
                          {...register("pincode", {
                            required: "pincode is required",
                          })}
                          id="pincode"
                          autocomplete="postal-code"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="button"
                    class="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                  <h2 class="text-base font-semibold leading-7 text-gray-900">
                    Address
                  </h2>
                  <p class="mt-1 text-sm leading-6 text-gray-600">
                    Choose from Existing address
                  </p>

                  <ul role="list">
                    {user.addresses.map((addresses, index) => (
                      <li
                        key={index}
                        className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5"
                      >
                        <div className="flex min-w-0 gap-x-4 ">
                          <input
                            onChange={(e) => handleAddress(e)}
                            id="address"
                            name="address"
                            type="radio"
                            value={index}
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {addresses.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {addresses.street}
                            </p>
                            <p className="text-sm leading-6 text-gray-900">
                              {addresses.pinCode}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          <p className="text-sm leading-6 text-gray-900">
                            Phone : {addresses.phone}
                          </p>
                          <p className="text-sm leading-6 text-gray-900">
                            {addresses.city}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div class="mt-10 space-y-10">
                    <fieldset>
                      <legend class="text-sm font-semibold leading-6 text-gray-900">
                        Payment Methods
                      </legend>
                      <p class="mt-1 text-sm leading-6 text-gray-600">
                        Choose One
                      </p>
                      <div class="mt-6 space-y-6">
                        <div class="flex items-center gap-x-3">
                          <input
                            onChange={(e) => handlePayment(e)}
                            id="cash"
                            name="payments"
                            type="radio"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            for="cash"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div class="flex items-center gap-x-3">
                          <input
                            onChange={handlePayment}
                            id="card"
                            name="payments"
                            type="radio"
                            value="card"
                            checked={paymentMethod === "card"}
                            class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            for="push-email"
                            class="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card payment
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-24 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
              <h1 className="text-4xl font-bold tracking-tight text-left text-gray-900">
                All Products
              </h1>{" "}
              <div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {products.map((product) => (
                        <li key={product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.images[0]}
                              alt={product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.href}>{product.title}</a>
                                </h3>
                                <p className="ml-4">$ {product.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-left text-gray-500">
                                {product.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty
                                  </label>
                                  <select
                                    onChange={(e) => handleQuantity(e, product)}
                                  >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                  </select>
                                </div>
                              </p>

                              <div className="flex">
                                <button
                                  onClick={(e) => handleRemove(e, product.id)}
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$ {totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Count</p>
                    <p>{totalItems}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 text-left">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <div
                      onClick={handleOrder}
                      className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Order and Pay
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <Link to="/">
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          onClick={() => setOpen(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
