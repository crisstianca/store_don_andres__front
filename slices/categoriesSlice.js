
import { createSlice } from '@reduxjs/toolkit';

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categoriesData: [], 
    },
    reducers: {
        setCategories: ( state, action ) => {
            console.log('jajaj', action.payload)
            state.categoriesData = action.payload;
        }
    }
});

export const { setCategories } = categoriesSlice.actions;