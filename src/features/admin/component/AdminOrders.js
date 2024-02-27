import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectAllOrder,
  updateOrderAsync,
} from "../../order/orderSlice";

import { XMarkIcon, EyeIcon, PencilIcon } from "@heroicons/react/24/outline";
import { discountedPrice } from "../../../app/comstants";

const AdminOrders = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [editableOrderID, setEditableOrderId] = useState(-1);

  useEffect(() => {
    const pagination = { _page: page };
    dispatch(fetchAllOrdersAsync(pagination));
  }, [dispatch, page]);

  const orders = useSelector(selectAllOrder);
  console.log(orders);

  const handleShow = () => {};

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
        <div className="w-full">
          <div className="bg-white shadow-md rounded my-6">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Order Number</th>
                  <th className="py-3 px-6 text-left">Items</th>
                  <th className="py-3 px-6 text-center">Total Amount</th>
                  <th className="py-3 px-6 text-center">Address</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {orders.map((order) => (
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="mr-2"></div>
                        <span className="font-medium">{order.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left">
                      {order.products.map((item) => (
                        <div className="flex items-center">
                          <div className="mr-2">
                            <img
                              className="w-6 h-6 rounded-full"
                              src={item.thumbnail}
                            />
                          </div>
                          <span>
                            {item.title} - #{item.quantity} - $
                            {discountedPrice(item)}
                          </span>
                        </div>
                      ))}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center">
                        ${order.totalAmount}
                      </div>
                    </td>
                    <td className="flex flex-wrap py-3 px-6 text-center">
                      <div className="">
                        <div>
                          <strong>{order.selectedAddress.name}</strong>,
                        </div>
                        <div>{order.selectedAddress.street},</div>
                        <div>{order.selectedAddress.city},</div>
                        <div>{order.selectedAddress.state},</div>
                        <div>{order.selectedAddress.pincode},</div>
                        <div>{order.selectedAddress.phone},</div>
                      </div>
                    </td>

                    <td className="py-3 px-6 text-center">
                      {order.id === editableOrderID ? (
                        <select onChange={(e) => handleUpdate(e, order)}>
                          <option>--Select Status--</option>
                          <option value="pending">Pending</option>
                          <option value="dispatched">Dispatched</option>
                          <option value="cancelled">Cancelled</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      ) : (
                        <span className="bg-purple-200 text-purple-600 py-1 px-3 rounded-full text-xs">
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <div className="flex item-center justify-center">
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <EyeIcon onClick={(e) => handleShow(order)}></EyeIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110">
                          <PencilIcon
                            onClick={(e) => handleEdit(order)}
                          ></PencilIcon>
                        </div>
                        <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-110"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
