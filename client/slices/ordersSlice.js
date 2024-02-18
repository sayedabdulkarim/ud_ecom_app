import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    // addToCart: (state, action) => {
    //   const existingItemIndex = state.cartItems.findIndex(
    //     (item) => item.id === action.payload.id
    //   );
    //   if (existingItemIndex >= 0) {
    //     state.cartItems[existingItemIndex].quantity += 1; // Assuming you add one item at a time
    //   } else {
    //     state.cartItems.push({ ...action.payload, quantity: 1 }); // Add new item with quantity 1
    //   }
    // },
    addToCart: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload._id
      );
      if (existingItemIndex === -1) {
        // Item is not in cart, add it with quantity of 1
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity += 1; // Increase quantity by 1
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      if (itemIndex !== -1 && state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1; // Decrease quantity by 1
      } else if (
        itemIndex !== -1 &&
        state.cartItems[itemIndex].quantity === 1
      ) {
        // Optionally remove the item if its quantity goes to 0
        state.cartItems.splice(itemIndex, 1);
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = orderSlice.actions;

export default orderSlice.reducer;
