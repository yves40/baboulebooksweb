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
              console.log('User login');              
            },
            logoutUser: (state, action) => {           
              console.log('User logout');              
            },
        }
    }
)

export default menuSlice.reducer;

