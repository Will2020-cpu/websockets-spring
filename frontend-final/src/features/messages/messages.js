import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    messages: [],
}


const messagesSlice = createSlice({
    name:"message",
    initialState,
    reducers:{
        setMessages:(state,action) =>{
            state.messages = action.payload;
        },
        addMessage:(state,action) =>{
            state.messages.push(action.payload);
        }
    }
})


export const { setMessages,addMessage } = messagesSlice.actions;
export const selectMessages =(state)=>state.message.messages
export default messagesSlice.reducer;
