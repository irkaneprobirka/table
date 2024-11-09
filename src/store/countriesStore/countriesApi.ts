import { createAsyncThunk } from "@reduxjs/toolkit";
import { Country } from "../../types/types";
import axios from "axios";


export const getCountries = createAsyncThunk<Country[]>('countries/getCountries', async () => {
    const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
    return response.data.slice(0, 50); 
  });
  