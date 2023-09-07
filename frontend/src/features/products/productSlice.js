import { createSlice } from "@reduxjs/toolkit";

const zoneData = [
  {
    id: 1,
    empName: "Pasindu",
    description: "test",
    type: "Expense",
    date: "1st jan 2023",
  },
  {
    id: 2,
    empName: "Kamal",
    description: "test",
    type: "Expense",
    date: "1st jan 2023",
  },
  {
    id: 3,
    empName: "John",
    description: "test",
    type: "Expense",
    date: "1st jan 2023",
  },
];

export const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    tea: { zoneData },
    coconut: [],
    cinemon: [],
  },
  reducers: {
    addZoneDetails: (state, action) => {
      state.tea.zoneData = [...state.tea.zoneData, action.payload];
    },
    deleteZoneDetails: (state, action) => {
      state.tea.zoneData = state.tea.zoneData.filter(
        (data) => data.id !== action.payload
      );
    },
    editZoneDetails: (state, action) => {
      state.tea.zoneData = state.tea.zoneData.map((data) =>
        data.id === action.payload.id ? action.payload : data
      );
    },
  },
});

export const { addZoneDetails, deleteZoneDetails, editZoneDetails } =
  productSlice.actions;

export default productSlice.reducer;
