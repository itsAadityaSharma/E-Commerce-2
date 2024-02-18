import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../auth/AuthSlice";
import { fetchLoggedInUserOrdersAsync, selectUserOrders } from "../UserSlice";

const UserOrder = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const order = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);

  return (
    <div>
      {order.map((order) => (
        <div>
          <div>
            <div className="mx-auto mt-24 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-4xl font-bold tracking-tight text-left text-gray-900">
                Order Id : {order.id}
              </h1>{" "}
              <h3 className="text-xl font-bold tracking-tight text-left text-red-900">
                Order status : {order.status}
              </h3>
              <div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.products.map((product) => (
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
                                    Qty : {product.quantity}
                                  </label>
                                </div>
                              </p>
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
                    <p>$ {order.totalAmount}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Total Count</p>
                    <p>{order.totalItems}</p>
                  </div>
                  <p className="text-sm text-left leading-6 text-gray-900">
                    Shipping Address :
                  </p>
                  <div className="flex justify-between gap-x-6 py-5 border-solid border-2 border-gray-200 px-5">
                    <div className="flex min-w-0 gap-x-4 ">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.selectedAddress.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {order.selectedAddress.street}
                        </p>
                        <p className="text-sm leading-6 text-gray-900">
                          {order.selectedAddress.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone : {order.selectedAddress.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {order.selectedAddress.city}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrder;
