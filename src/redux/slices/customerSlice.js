import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderId: "",
  customerName: "",
  customerPhone: "",
  customerEmail: "",
  guests: 0,
  table: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      const { name, phone, guests, email } = action.payload;
      state.orderId = `${Date.now() % 10000}`.padStart(4, "0");
      state.customerName = name;
      state.customerPhone = phone;
      state.customerEmail = email || "";
      state.guests = guests;
    },

    removeCustomer: (state) => {
      state.customerName = "";
      state.customerPhone = "";
      state.customerEmail = "";
      state.guests = 0;
      state.table = null;
    },

    updateTable: (state, action) => {
      state.table = action.payload.table;
    },
  },
});

export const { setCustomer, removeCustomer, updateTable } =
  customerSlice.actions;
export default customerSlice.reducer;
