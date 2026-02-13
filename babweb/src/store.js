"use client" 

// babweb/src/store.js
// Persisting Redux Store with redux-persist
// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
// https://geekyants.com/blog/unlocking-the-power-of-redux-persistence-benefits-and-example

import {configureStore} from "@reduxjs/toolkit"
import menuPropertiesReducer from './redux/menuProperties'

import { persistReducer, persistStore,
            FLUSH,
            REHYDRATE,
            PAUSE,
            PERSIST,
            PURGE,
            REGISTER,
        } from 'redux-persist';
import storageEngine from './redux/storageEngine';

const persistConfig = {
  key: 'root',
  storage: storageEngine,
};
const persistedReducer = persistReducer(persistConfig, menuPropertiesReducer);

const store = configureStore({
    reducer: { menuproperties: persistedReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

const persistor = persistStore(store);
export {store, persistor}