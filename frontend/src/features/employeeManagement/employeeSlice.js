import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getEmployeesContent = createAsyncThunk(
  "/employees/fetchEmployees",
  async () => {
    const response = await axios.get("http://localhost:4000/api/employees", {});
    return response.data;
  }
);

export const addEmployee = createAsyncThunk(
  "/employees/addEmployee",
  async ({ name, nic, address, salary }) => {
    const res = await axios.post("http://localhost:4000/api/employees", {
      name,
      nic,
      address,
      salary,
    });
    return res.data;
  }
);

export const editEmployee = createAsyncThunk(
  "/employees/editEmployee",
  async ({ name, nic, address, salary, _id }) => {
    const res = await axios.patch(
      `http://localhost:4000/api/employees/${_id}`,
      { name, nic, address, salary }
    );

    return res.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "/employees/deleteEmployee",
  async (id) => {
    const res = await axios.delete(`http://localhost:4000/api/employees/${id}`);

    return res.data;
  }
);

export const employeeSlice = createSlice({
  name: "employees",
  initialState: {
    isLoading: false,
    employees: [],
  },
  reducers: {},
  extraReducers: {
    // fetch data
    [getEmployeesContent.pending]: (state) => {
      state.isLoading = true;
    },
    [getEmployeesContent.fulfilled]: (state, action) => {
      state.employees = action.payload;
      state.isLoading = false;
    },
    [getEmployeesContent.rejected]: (state) => {
      state.isLoading = false;
    },
    // add data
    [addEmployee.pending]: (state) => {
      state.isLoading = true;
    },
    [addEmployee.fulfilled]: (state, action) => {
      state.employees = [...state.employees, action.payload];
      state.isLoading = false;
    },
    [addEmployee.rejected]: (state) => {
      state.isLoading = false;
    },
    // update data
    [editEmployee.pending]: (state) => {
      state.isLoading = true;
    },
    [editEmployee.fulfilled]: (state, action) => {
      state.employees = state.employees.map((emp) =>
        emp._id === action.payload._id ? action.payload : emp
      );
      state.isLoading = false;
    },
    [editEmployee.rejected]: (state) => {
      state.isLoading = false;
    },
    // delete data
    [deleteEmployee.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteEmployee.fulfilled]: (state, action) => {
      state.employees = state.employees.filter(
        ({ _id }) => _id !== action.payload._id
      );
      state.isLoading = false;
    },
    [deleteEmployee.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addNewEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
