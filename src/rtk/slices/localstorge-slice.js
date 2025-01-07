import { createSlice } from "@reduxjs/toolkit";

const localStorageSlice = createSlice({
    initialState: JSON.parse(localStorage.getItem("productsInCart")) || [],
    name: 'localStorageSlice',
    reducers: {
        addToLS: (state, action) => {
            const currPrd = state.find((product) => product.id == action.payload.id);
            if(currPrd) {
                currPrd.quantity += 1;
            } else {
                const prd = { ...action.payload, quantity: 1 };
                state.push(prd);
            }
            localStorage.setItem("productsInCart", JSON.stringify(state));
        },
        removeFromLS: (state, action) => {

            const updateState = state.filter((prd) => prd.id !== action.payload.id);
            localStorage.setItem("productsInCart", JSON.stringify(updateState));
            return updateState;
        },
        clearLS: (state, action) => {
            localStorage.clear()
        }
    }
})

export const {addToLS, removeFromLS, clearLS} = localStorageSlice.actions;
export default localStorageSlice.reducer;