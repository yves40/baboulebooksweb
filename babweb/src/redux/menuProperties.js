import { createSlice } from "@reduxjs/toolkit"

const initialState = [        
        {
            logged : false,
            useremail : "",
        },
    ]

const menuSlice = createSlice(
    {
        name: "menuProperties",
        initialState,
        reducers: 
        {
            loginUser: (state, action) => {       
              state.logged = true;
              state.useremail = action.payload.useremail;    
              console.log('User login');              
            },
            logoutUser: (state, action) => {           
              state.logged = false;
              state.useremail = "";
              console.log('User logout');              
            },
        }
    }
)
export const { loginUser, logoutUser } = menuSlice.actions;
export default menuSlice.reducer;

