import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/user';
import contactoReducer from '../features/contactos/contactoSlice'
import messageReducer from '../features/messages/messages'

export const store = configureStore({
    reducer:{
        user:userReducer,
        contacto:contactoReducer,
        message:messageReducer
    }
});
