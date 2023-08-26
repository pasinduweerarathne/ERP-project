import { createSlice } from "@reduxjs/toolkit";

const zoneData = [
  {
    id: 1,
    name: "pasindu",
    description: "test",
    type: "Expense",
    date: "1st jan 2023",
  },
  {
    id: 2,
    name: "kamal",
    description: "test",
    type: "Expense",
    date: "1st jan 2023",
  },
  {
    id: 3,
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
    deleteZoneDetails: (state, action) => {
      const id = action.payload;
      state.zoneDetails = state.zoneDetails.filter((data) => data.id !== id);
    },
  },
});

export const { addZoneDetails, deleteZoneDetails } = productSlice.actions;

export default productSlice.reducer;
