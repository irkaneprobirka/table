import { createSlice } from "@reduxjs/toolkit";
import { CountriesState } from "../../types/types";
import { getCountries } from "./countriesApi";

const initialState : CountriesState = {
    coutries : [],
    loading : false,
    error : null,
    activeColumns : ['name', 'languages', 'region', 'population', 'status', 'startOfWeek']
}

const countriesSlice = createSlice({
    name : 'countries',
    initialState,
    reducers : {
    },
    extraReducers : (builder) => {
        builder
        .addCase(getCountries.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
            state.coutries = action.payload;
        })
        .addCase(getCountries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'error';
        })
    }
})

export default countriesSlice.reducer;