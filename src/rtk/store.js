import { configureStore } from "@reduxjs/toolkit";
import ProductReducer from './slices/products-slice';
import CartReducer from './slices/cart-slice';
import LocalStorge from './slices/localstorge-slice';

const store = configureStore({
    reducer: {
        products: ProductReducer,
        cart: CartReducer,
        localST: LocalStorge
    }
})

export default store;