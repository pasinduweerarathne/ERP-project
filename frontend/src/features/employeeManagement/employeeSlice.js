import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEmployeesContent = createAsyncThunk(
  "/employees/content",
  async () => {
    const response = await axios.get("/api/users?page=2", {});
    return response.data;
  }
);

export const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    isLoading: false,
    employees: [],
  },
  reducers: {
    addNewEmployee: (state, action) => {
      let { newEmployeeObj } = action.payload;
      state.employees = [...state.employees, newEmployeeObj];
    },

    deleteEmployee: (state, action) => {
      let { index } = action.payload;
      state.employees.splice(index, 1);
    },
  },

  extraReducers: {
    [getEmployeesContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmployeesContent.fulfilled]: (state, action) => {
      console.log(action.payload.data);
      state.employees = action.payload.data;
      state.isLoading = false;
    },
    [getEmployeesContent.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewEmployee, deleteEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
