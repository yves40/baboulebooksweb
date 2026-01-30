import { createSlice } from "@reduxjs/toolkit"

const initialState =      
    {
        logged : false,
        useremail : "",
        menustatus: true,   // used to manage menu pop up on phones
        appstatus: "mainmenu", // public, user, admin, admindetails, adminbooks, adminusers, ...
        activebreakpoint: "unknown",        
    }
    
    const menuSlice = createSlice(
    {
        name: "menuproperties",
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
                state.menustatus = action.payload.menuvisible;
            },
            setActiveBreakpoint: (state, action) => {
                state.activebreakpoint = action.payload.activebreakpoint;
            },
            setAppStatus: (state, action) => {
                state.appstatus = action.payload.appstatus;
            }
        }
    }
)
export const { loginUser, disconnectUser, toggleMenuStatus, setActiveBreakpoint, setAppStatus } = menuSlice.actions;
export default menuSlice.reducer;

