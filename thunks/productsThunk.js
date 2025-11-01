
import { setCategories } from "../slices/categoriesSlice";

export const getCategories = ( data ) => {
    return async( dispatch, getState) => {
              console.log('sa', data)
        dispatch( setCategories({ categoriesData: data }));
    }
}
