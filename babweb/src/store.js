"use client" 

// babweb/src/store.js
// Persisting Redux Store with redux-persist
// https://blog.logrocket.com/persist-state-redux-persist-redux-toolkit-react/
// https://geekyants.com/blog/unlocking-the-power-of-redux-persistence-benefits-and-example

import {configureStore} from "@reduxjs/toolkit"
import menuPropertiesReducer from './redux/menuProperties'

const store = configureStore({
    reducer: {
        menuproperties: menuPropertiesReducer,
    },
})

export {store}
