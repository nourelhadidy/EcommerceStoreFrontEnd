import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    password: "",
    isLoggedIn: false
  },
  reducers: {
    login: (state, action) => {
      const { name, email, password } = action.payload;
      state.name = name;
      state.email = email;
      state.password = password;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
