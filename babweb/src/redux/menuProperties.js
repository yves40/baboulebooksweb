import { createSlice } from "@reduxjs/toolkit"
import Logger from "@/classes/logger";

const initialState =      
    {
        logged : false,
        useremail : "",
    }

const logger = new Logger();
const menuSlice = createSlice(
    {
        name: "menuProperties",
        initialState,
        reducers: 
        {
            loginUser: (state, action) => {       
              state.logged = true;
              state.useremail = action.payload.useremail;    
              logger.info('Redux slice : User login');              
            },
            disconnectUser: (state, action) => {           
              state.logged = false;
              state.useremail = "";
              logger.info('Redux slice : User logout');              
            },
        }
    }
)
export const { loginUser, disconnectUser } = menuSlice.actions;
export default menuSlice.reducer;

