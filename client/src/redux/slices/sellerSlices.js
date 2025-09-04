import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  seller: null,
  token: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    setSellerLogin: (state, action) => {
      (state.seller = action.payload.seller), (state.token = action.payload.token);
    },
    setSellerLogout: (state) => {
      (state.seller = null), (state.token = null);
    },
  },
});

export const { setSellerLogin, setSellerLogout } = sellerSlice.actions;
export default sellerSlice.reducer;
