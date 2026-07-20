import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch the initial cart from the API
export const fetchInitialCart = createAsyncThunk(
    "cart/fetchInitialCart",
    async () => {
        try {
            const res = await fetch("https://fakestoreapi.com/carts/1");
            const data = await res.json();

            // We must also fetch the product details
            const products = await Promise.all(
                data.products.map(async (p) => {
                    const prodRes = await fetch(`https://fakestoreapi.com/products/${p.productId}`);
                    const prodData = await prodRes.json();
                    return { ...prodData, quantity: p.quantity };
                })
            );
            return products;
        } catch (error) {
            console.error("Failed to fetch initial cart:", error);
            return []; // Return empty on error
        }
    }
);

const initialState = {
    items: [], // This will hold our products: [{...product, quantity: 1}, ...]
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    // Reducers here are for *synchronous* actions
    reducers: {
        // Action to add an item
        addToCart: (state, action) => {
            const product = action.payload;
            const existingItem = state.items.find((item) => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
            // Note: We won't sync with the API here to avoid its limitations
        },
        // Action to remove an item
        removeFromCart: (state, action) => {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.id !== productId);
        },
        // Action to update quantity
        updateQuantity: (state, action) => {
            const { id, newQuantity } = action.payload;
            if (newQuantity <= 0) {
                // Remove if quantity is 0 or less
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                const itemToUpdate = state.items.find((item) => item.id === id);
                if (itemToUpdate) {
                    itemToUpdate.quantity = newQuantity;
                }
            }
        },
    },
    // Extra reducers here are for *asynchronous* actions (like fetch)
    extraReducers: (builder) => {
        builder
            .addCase(fetchInitialCart.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchInitialCart.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload;
            })
            .addCase(fetchInitialCart.rejected, (state) => {
                state.status = "failed";
            });
    },
});

// Export the actions
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// Export selectors to easily get data in components
export const selectCartItems = (state) => state.cart.items;
export const selectCartStatus = (state) => state.cart.status;

// Export the reducer
export default cartSlice.reducer;