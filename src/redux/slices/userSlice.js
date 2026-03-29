import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  name: "",
  email: "",
  phoneNo: "",
  role: "",
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Destructuring action.payload for a clean update
      const { _id, name, email, phoneNo, role } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      state.phoneNo = phoneNo;
      state.role = role;
      state.isAuth = true;
    },
    // Resetting to initialState is cleaner than manual clearing
    removeUser: () => initialState,
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
