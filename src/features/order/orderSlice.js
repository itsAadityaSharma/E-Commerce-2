import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchAllOrders, fetchCount } from "./orderAPI";

const initialState = {
  status: "idle",
  orders: [],
  currentOrder: null,
  adminOrders: [],
  totalOrders: 0,
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    return response.data;
  }
);
export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async (pagination) => {
    const response = await fetchAllOrders(pagination);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.adminOrders = action.payload.data;
        state.totalOrders = action.payload.items;
      });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrder = (state) => state.order.adminOrders;
export const selectTotalOrder = (state) => state.order.totalOrders;

export default orderSlice.reducer;
