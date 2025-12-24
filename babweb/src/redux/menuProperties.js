import { createSlice } from "@reduxjs/toolkit"
import Logger from "@/classes/logger";

const initialState =      
    {
        logged : false,
        useremail : "",
        menustatus: false   // used to manage menu pop up on phones
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
            toggleMenuStatus: (state, action) => {
                state.menustatus = state.menuvisible;
                logger.info(`Redux slice : ToggleMenu status ${action.payload.menuvisible}`);              
            }
        }
    }
)
export const { loginUser, disconnectUser, toggleMenuStatus } = menuSlice.actions;
export default menuSlice.reducer;

