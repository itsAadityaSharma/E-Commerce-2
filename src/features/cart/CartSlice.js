import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  deleteCartItem,
  fetchItemByUserId,
  resetCart,
  updateCart,
} from "./CartAPI";

const initialState = {
  value: 0,
  status: "idle",
  item: [],
  products: [],
  cartLoaded: false,
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
  async () => {
    const response = await fetchItemByUserId();
    return response.data;
  }
);
export const deleteCartItemAsync = createAsyncThunk(
  "cart/deleteCartItem",
  async (id) => {
    const response = await deleteCartItem(id);
    return response.data;
  }
);
export const updateCartByIdAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk("cart/resetCart", async () => {
  const response = await resetCart();
  return response.data;
});

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
        state.cartLoaded = true;
      })
      .addCase(fetchItemByUserIdAsync.rejected, (state, action) => {
        state.status = "idle";
        state.cartLoaded = true;
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products.splice(index, 1);
      })
      .addCase(updateCartByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartByIdAsync.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (item) => item.id === action.payload.id
        );
        state.products[index] = action.payload;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.item = [];
      });
  },
});

export const { increment } = cartSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectCartProduct = (state) => state.cart.products;
export const selectLatestItems = (state) => state.cart.item;
export const selectCartLoaded = (state) => state.cart.cartLoaded;

export default cartSlice.reducer;
