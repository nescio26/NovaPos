import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addItems: (state, action) => {
      state.push(action.payload);
    },
    removeItem: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearCart: () => [],
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const getTotalPrice = (state) =>
  state.cart.reduce(
    (total, item) => total + item.pricePerQuantity * item.quantity,
    0,
  );

export const { addItems, removeItem, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
