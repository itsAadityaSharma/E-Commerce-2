import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder, fetchCount } from "./orderAPI";

const initialState = {
  value: 0,
  status: "idle",
  orders: [],
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
      });
  },
});

// export const { increment } = counterSlice.actions;

export const selectOrders = (state) => state.order.orders;

export default orderSlice.reducer;
