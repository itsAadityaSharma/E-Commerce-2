import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, incrementAsync, selectCount } from "../UserSlice";
import { selectLoggedInUser } from "../../auth/AuthSlice";

export function UserProfile() {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  const handleEdit = () => {};

  const handleRemove = () => {};

  return (
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

          <div className="border-t text-left border-gray-200 px-4 py-6 sm:px-6">
            <p className="text-sm text-left leading-6 text-gray-900">
              Your Addresses :
            </p>
            {user.addresses.map((address) => (
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

                <button
                  onClick={(e) => handleEdit(e, address.id)}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleRemove(e, address.id)}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
