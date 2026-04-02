"use client" 

import {configureStore} from "@reduxjs/toolkit"
import menuPropertiesReducer from './redux/menuProperties'


const store = configureStore({
    reducer: { menuproperties: menuPropertiesReducer },
});

export {store}