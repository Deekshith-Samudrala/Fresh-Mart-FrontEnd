import { createSlice } from '@reduxjs/toolkit';

const adminDetailsSlice = createSlice({
    name : "adminDetails",
    initialState : {
        isAuthenticated: false,
        adminInfo: null,
        accessToken: null,
      },
    reducers : {
        adminLogin(state,action){
            state.isAuthenticated = true;
            state.adminInfo = action.payload.adminInfo;
            state.accessToken = action.payload.accessToken;
          },
        adminLogout(state,action){
            state.isAuthenticated = false;
            state.adminInfo = null;
            state.accessToken = null;
          }
    }
})

export default adminDetailsSlice.reducer;
export let {adminLogin,adminLogout} = adminDetailsSlice.actions;