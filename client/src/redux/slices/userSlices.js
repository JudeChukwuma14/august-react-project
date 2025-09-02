import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      (state.user = action.payload.user), (state.token = action.payload.token);
    },
    setUserLogout: (state) => {
      (state.user = null), (state.token = null);
    },
  },
});

export const { setUserLogin, setUserLogout } = userSlice.actions;
export default userSlice.reducer;
