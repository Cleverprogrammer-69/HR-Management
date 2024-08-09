import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  sideBarOpen: true,
  hideComponents: false
};
const sideBarSlice = createSlice({
    name: "client",
    initialState,
    reducers:{
        toggleSideBar: (state)=>{
            state.sideBarOpen = !state.sideBarOpen;
        },
        setHideComponents: (state, action) => {
            state.hideComponents = action.payload
        }
    }
})
export const { toggleSideBar, setHideComponents } = sideBarSlice.actions;
export default sideBarSlice.reducer;