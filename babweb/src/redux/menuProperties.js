import { createSlice } from "@reduxjs/toolkit"
import Logger from "@/classes/logger";

const initialState =      
    {
        logged : false,
        useremail : "",
        menustatus: true,   // used to manage menu pop up on phones
        activebreakpoint: "unknown"
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
            },
            disconnectUser: (state, action) => {           
                state.logged = false;
                state.useremail = "";
            },
            toggleMenuStatus: (state, action) => {
                console.log(`*********** Menu visibility : ${action.payload.menuvisible}`);                
                state.menustatus = action.payload.menuvisible;
            },
            setActiveBreakpoint: (state, action) => {
                // console.log(`*********** tailwind mode :  ${action.payload.activebreakpoint}`);                
                state.activebreakpoint = action.payload.activebreakpoint;
            }
        }
    }
)
export const { loginUser, disconnectUser, toggleMenuStatus, setActiveBreakpoint } = menuSlice.actions;
export default menuSlice.reducer;

