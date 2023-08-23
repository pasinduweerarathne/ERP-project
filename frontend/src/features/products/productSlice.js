import { createSlice } from "@reduxjs/toolkit";

const zoneData = [
  {
    name: "pasindu",
    description: "test",
    type: "Expense",
    date: "1st jan 2023",
  },
  {
    name: "kamal",
    description: "test",
    type: "Expense",
    date: "1st jan 2023",
  },
  {
    name: "john",
    description: "test",
    type: "Expense",
    date: "1st jan 2023",
  },
];

export const productSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    tea: [],
    coconut: [],
    cinemon: [],
    zoneDetails: zoneData,
  },
  reducers: {
    addZoneDetails: (state, action) => {
      let { newZoneDetailsObj } = action.payload;
      state.zoneDetails = [...state.zoneDetails, newZoneDetailsObj];
    },
    editZoneDetails: (state, action) => {},
  },
});

export const { addZoneDetails, editZoneDetails } = productSlice.actions;

export default productSlice.reducer;
