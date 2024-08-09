import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    employee: [],
    status: 'idle',
    error: null
}
const getAllEmployees = createAsyncThunk(
    "employee/getAll",
    async(thunkAPI) => {
        try {
            const response = await axios.get()
        } catch (error) {
            
        }
    }
)
const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{

    }
})
export default employeeSlice.reducer