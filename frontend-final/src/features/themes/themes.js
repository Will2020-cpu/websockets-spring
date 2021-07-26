import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    theme:{
        main:'#1DA1F2',
        body:'#fff',
        colorBody:'#000',
        colorBox: '#F7F9F9'
    }
}


const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        changeColor(state,action){
            state.theme.body = action.payload.body
            state.theme.colorBody = action.payload.color
            state.theme.colorBox = action.payload.colorBox
        },
        changeColorBubble(state,action){
           state.theme.main = action.payload.color;
        }
    }
})


export const { changeColor,changeColorBubble } = themeSlice.actions;
export const selectTheme = (state) => state.theme.theme;



export default themeSlice.reducer;
