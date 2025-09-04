import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlices";
import sellerReducer from "./slices/sellerSlices"
import { persistReducer, persistStore } from "redux-persist"

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "seller"]
};
const rootReducer = combineReducers({
    user: userReducer,
    seller: sellerReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"]
            }
        })

})

export const persistor = persistStore(store)
export default store