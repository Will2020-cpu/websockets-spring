import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    contactos: []
}


const contactoSlice = createSlice({
    name: "contacto",
    initialState,
    reducers: {
        setContacto: (state, action) => {
            state.contactos = action.payload
        },
        addContacto:(state,action) =>{
            state.contactos.concat(action.payload)
        }
    }
})


export const { setContacto } = contactoSlice.actions;
export const { addContacto } = contactoSlice.actions
export const selectContacto = (state) => state.contacto.contactos;


export default contactoSlice.reducer;