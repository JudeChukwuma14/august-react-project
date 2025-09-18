import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of items, each with id, name, price, image, seller, and quantity
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        // Increment quantity if item exists
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        // Add new item with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    // Optional: Add reducer to remove or decrease quantity if needed
    removeItem: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
  },
});

export const { addItem, removeItem, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;