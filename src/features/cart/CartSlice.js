import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchItemByUserId } from "./CartAPI";

const initialState = {
  value: 0,
  status: "idle",
  item: [],
  products: [],
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);
export const fetchItemByUserIdAsync = createAsyncThunk(
  "cart/fetchItemByUserId",
  async (id) => {
    const response = await fetchItemByUserId(id);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.item.push(action.payload);
      })
      .addCase(fetchItemByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectCartProduct = (state) => state.cart.products;
export const selectLatestItems = (state) => state.cart.item;

export default cartSlice.reducer;
