import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    packages: []
};


export const packageSlice = createSlice({
    name: 'count',
    initialState,
    reducers: {
        getData(state, actions){
           state.packages = actions.payload

        }
    }
});

export default packageSlice.reducer;