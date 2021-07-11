import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user:{
        name:"",
        username:"",
        picture:""
    },
    selectUSer:"",
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user.name = action.payload.name;
            state.user.username = action.payload.username;
            state.user.picture = action.payload.picture;
        },
        setUserRemove: (state) => {
            state.user.name = null;
            state.user.username = null;
            state.user.picture = null
        },
        setSelectUser:(state,action) =>{
            state.selectUSer = action.payload;
        }
    }
})

export const { setUser, setUserRemove,setSelectUser } = userSlice.actions;
export const selectUserName = (state) => state.user.user.name;
export const selectUserUsername = (state) => state.user.user.username;
export const selectPicture = (state) => state.user.user.picture;
export const selectUser = (state) => state.user.selectUSer;

export default userSlice.reducer;