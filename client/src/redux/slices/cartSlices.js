import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  sessionId: localStorage.getItem('sessionId') || null,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.items = action.payload.items || [];
      if (action.payload.sessionId) {
        state.sessionId = action.payload.sessionId;
        localStorage.setItem('sessionId', action.payload.sessionId);
      }
      state.status = 'succeeded';
      state.error = null;
    },
    addItem: (state, action) => {
      // 🔄 UPDATED: safe check if productId is object or string
      const incomingId =
        typeof action.payload.productId === "object"
          ? action.payload.productId._id
          : action.payload.productId;

      const existingItem = state.items.find((item) => {
        const itemId =
          typeof item.productId === "object" ? item.productId._id : item.productId;
        return itemId === incomingId;
      });

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    updateItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      // 🔄 UPDATED: same safe check
      const item = state.items.find((item) => {
        const itemId =
          typeof item.productId === "object" ? item.productId._id : item.productId;
        return itemId === productId;
      });

      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action) => {
      const productId = action.payload;

      // 🔄 UPDATED: same safe check
      state.items = state.items.filter((item) => {
        const itemId =
          typeof item.productId === "object" ? item.productId._id : item.productId;
        return itemId !== productId;
      });
    },
    setSessionId: (state, action) => {
      state.sessionId = action.payload;
      localStorage.setItem('sessionId', action.payload);
    },
    clearCart: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
    setCartStatus: (state, action) => {
      state.status = action.payload.status;
      state.error = action.payload.error || null;
    },
    decreaseQuantity: (state, action) => {
      const productId = action.payload;

      const item = state.items.find((item) => {
        const itemId =
          typeof item.productId === "object" ? item.productId._id : item.productId;
        return itemId === productId;
      });

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          // if quantity goes below 1, remove it
          state.items = state.items.filter((i) => {
            const iId =
              typeof i.productId === "object" ? i.productId._id : i.productId;
            return iId !== productId;
          });
        }
      }
    },

  },
});

export const {
  setCart,
  addItem,
  updateItemQuantity,
  removeItem,
  setSessionId,
  clearCart,
  setCartStatus,
  decreaseQuantity
} = cartSlice.actions;

export default cartSlice.reducer;
