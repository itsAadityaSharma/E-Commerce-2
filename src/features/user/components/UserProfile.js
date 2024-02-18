import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  incrementAsync,
  selectCount,
  selectUserInfo,
  updateUserAsync,
} from "../UserSlice";
import { useForm } from "react-hook-form";

export function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);

  const [selectedEditIndex, setSelectedEditIndex] = useState(-1);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1, addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  };

  const handleRemove = (e, index) => {
    const newUser = { ...user, addresses: [...user.addresses] };
    newUser.addresses.splice(index, 1);
    dispatch(updateUserAsync(newUser));
  };

  const handleAdd = (address) => {
    const newUser = { ...user, addresses: [...user.addresses, address] };
    dispatch(updateUserAsync(newUser));
    setShowAddAddressForm(false);
  };

  const handleEditFrom = (index) => {
    setSelectedEditIndex(index);
    const address = user.addresses[index];
    setValue("name", address.name);
    setValue("email", address.email);
    setValue("phone", address.phone);
    setValue("street", address.street);
    setValue("city", address.city);
    setValue("state", address.state);
    setValue("pincode", address.pincode);
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  return (
    //Add addresses functionality on profile page
    <div>
      <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold tracking-tight text-left text-gray-900">
          Name : {user.name ? user.name : "New user"}
        </h1>{" "}
        <h3 className="text-xl font-bold tracking-tight text-left text-red-900">
          Email Address : {user.email}
        </h3>
        <div>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6"></div>

          <div className="text-left my-4">
            <button
              onClick={(e) => {
                setShowAddAddressForm(true);
                setSelectedEditIndex(-1);
              }}
              type="submit"
              class="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add new address
            </button>
          </div>
          {showAddAddressForm ? (
            <form
              flex
              className="bg-white px-5 py-10 mt-12 text-left"
              noValidate
              onSubmit={handleSubmit((data) => {
                console.log(data);
                handleAdd(data);
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
                    onClick={(e) => setShowAddAddressForm(false)}
                    type="submit"
                    class="rounded-md  px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-1000 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancle
                  </button>
                  <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                  <div class="mt-10 space-y-10">
                    <fieldset></fieldset>
                  </div>
                </div>
              </div>
            </form>
          ) : null}
          <div className="border-t text-left border-gray-200 px-4 py-6 sm:px-6">
            <p className="text-sm text-left leading-6 text-gray-900">
              Your Addresses :
            </p>
            {user.addresses.map((address, index) => (
              <div>
                {selectedEditIndex === index ? (
                  <form
                    className="bg-white px-5 py-10 mt-12"
                    noValidate
                    onSubmit={handleSubmit((data) => {
                      console.log(data);
                      handleEdit(data, index);
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
                          onClick={(e) => setSelectedEditIndex(-1)}
                          type="submit"
                          class="rounded-md  px-3 py-2 text-sm font-semibold text-grey shadow-sm hover:bg-grey-1000 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Cancle
                        </button>
                        <button
                          type="submit"
                          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Edit Address
                        </button>
                      </div>

                      <div class="border-b border-gray-900/10 pb-12">
                        <div class="mt-10 space-y-10">
                          <fieldset></fieldset>
                        </div>
                      </div>
                    </div>
                  </form>
                ) : null}
                <div className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5">
                  <div className="flex min-w-0 gap-x-4 ">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {address.name}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {address.street}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {address.pincode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone : {address.phone}
                    </p>
                    <p className="text-sm leading-6 text-gray-900">
                      {address.city}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={(e) => {
                        handleEditFrom(index);
                        setShowAddAddressForm(false);
                      }}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleRemove(e, index)}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
