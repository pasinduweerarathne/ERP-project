import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AVAILABLE_ZONES_DETAILS } from "./components/data";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const initialState = {
  zones: [],
  zoneDetails: [
    {
      zoneName: "Gold Star 1",
      zoneSlug: "gold-star-1",
      data: {
        "New Tea": {
          currentPage: 1,
          totalPages: 0,
          item: [],
        },
        Tea: {
          currentPage: 1,
          totalPages: 0,
          item: [],
        },
      },
    },
    {
      zoneName: "Gold Star 2",
      zoneSlug: "gold-star-2",
      data: {
        Durian: {
          currentPage: 1,
          totalPages: 0,
          item: [],
        },
        Tea: {
          currentPage: 1,
          totalPages: 0,
          item: [],
        },
        "New Cinnamon": {
          currentPage: 1,
          totalPages: 0,
          item: [],
        },
        "Old Cinnamon": {
          currentPage: 1,
          totalPages: 0,
          item: [],
        },
      },
    },
    {
      zoneName: "Gold Star 3 (Bolraluwaththa)",
      zoneSlug: "gold-star-3",
      data: {
        "New Tea": {
          currentPage: 1,
          totalPages: 0,
          item: [],
        },
      },
    },
    {
      zoneName: "Gold Star 4",
      zoneSlug: "gold-star-4",
      data: {
        Coconut: {
          currentPage: 1,
          totalPages: 0,
          item: [],
        },
      },
    },
  ],
};

export const fetchZones = createAsyncThunk("/product/fetchZones", async () => {
  const response = await axios.get("http://localhost:4000/api/zones", {});
  return response.data;
});

export const deleteZoneDetailsNew = createAsyncThunk(
  "/product/deleteZoneDetails",
  async (props, { dispatch }) => {
    await axios.delete(`http://localhost:4000/api/expenses/${props._id}`);
    window.location.href = `/app/zones/${props.zone}/${props.section}`;
  }
);

export const productSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {},
  extraReducers: {
    // fetch data
    [fetchZones.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchZones.fulfilled]: (state, action) => {
      state.zones = action.payload;
      state.isLoading = false;
    },
    [fetchZones.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { addZoneDetails, deleteZoneDetails, editZoneDetails } =
  productSlice.actions;

export default productSlice.reducer;
