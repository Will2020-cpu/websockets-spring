import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    theme:{
        main:'#34aadc'
    }
}




const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        changeColorPurple(state){
            state.theme.main = '#5856d6'
        }
    }
})


export const { changeColorPurple } = themeSlice.actions;
export const selectTheme = (state) => state.theme.theme;


export default themeSlice.reducer;
