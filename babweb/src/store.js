import {configureStore} from "@reduxjs/toolkit"
import menuProperties from './redux/menuProperties'

export const store = configureStore({
    reducer: {
        menuProperties
    }
})

