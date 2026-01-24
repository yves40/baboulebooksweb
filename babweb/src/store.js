"use client" 

// babweb/src/store.js
// Persisting Redux Store with redux-persist
// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
// https://geekyants.com/blog/unlocking-the-power-of-redux-persistence-benefits-and-example

import {configureStore} from "@reduxjs/toolkit"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage for web
import menuProperties from './redux/menuProperties'

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["menuProperties"], // only menuProperties will be persisted
  timeout: 1000
};

const persistedReducer = persistReducer(persistConfig, menuProperties);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }), 
})

export const persistor = persistStore(store);
