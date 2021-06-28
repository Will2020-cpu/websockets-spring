import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name :"",
    email : "",
    picture :""
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.picture = action.payload.picture;
        },
        setUserRemove: (state) => {
            state.name = null;
            state.email = null;
            state.picture = null
        }
    }
})

export const { setUser, setUserRemove } = userSlice.actions;
export const selectUserName = (state) => state.user.name;
export const selectUserEmail = (state) => state.user.email;
export const selectPicture = (state) => state.user.picture;


export default userSlice.reducer;