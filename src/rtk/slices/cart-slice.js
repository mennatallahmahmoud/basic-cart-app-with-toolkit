import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    initialState: JSON.parse(localStorage.getItem("productsInCart")) || [],
    name: 'cartSlice',
    reducers: {
        addToCart: (state, action) => {
            if(state) {
                const currPrd = state.find((prd) => prd.id === action.payload.id);            
                if (currPrd) {
                    currPrd.quantity += 1;
                } else {
                    const prdClone = {...action.payload, quantity: 1}
                    state.push(prdClone)
                }
            }
        },
        deleteFromCart: (state, action) => {
            return state.filter((prd) => prd.id !== action.payload.id)
        },
        clearCart: (state, action) => {
            return []
        },
    }
})

export const {addToCart, deleteFromCart, clearCart} = cartSlice.actions;
export default cartSlice.reducer;