import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { AVAILABLE_ZONES_DETAILS } from "./components/data";

import { baseUrl } from "../../utils/dummyData";

const initialState = { zones: [], zoneDetails: [], employeeList: [] };

export const fetchZones = createAsyncThunk("/product/fetchZones", async () => {
  const response = await axios.get("http://localhost:4000/api/zones", {});
  return response.data;
});

export const fetchAllEmployees = createAsyncThunk(
  "/zoneDetails/fetchEmployees",
  async () => {
    const res = await axios.get(`${baseUrl}/employees/allemployees`);

    return res.data;
  }
);

export const fetchZoneDetails = createAsyncThunk(
  "/zoneDetails/fetchZoneDetails",
  async ({ zoneSlug, category, page }) => {
    const res = await axios.get(
      `${baseUrl}/expenses/${zoneSlug}/${category}?page=${page}`
    );

    return res.data;
  }
);

export const addZoneDetails = createAsyncThunk(
  "/zoneDetails/addZoneDetails",
  async (formData, { dispatch }) => {
    const { zoneSlug, categoryName, zoneId, data } = formData;
    const { empName, type, description, salary } = data;
    const body = {
      zoneSlug,
      categoryName,
      zoneId,
      empName,
      type,
      description,
      salary,
    };
    await axios.post(`${baseUrl}/expenses`, body);
    const fetchParams = { zoneSlug, category: categoryName, page: 1 };
    dispatch(fetchZoneDetails(fetchParams));
  }
);

export const editZoneDetails = createAsyncThunk(
  "/zoneDetails/editZoneDetails",
  async (formData, { dispatch }) => {
    console.log(formData);
    // await axios.patch(`${baseUrl}/expenses/${id}`, body);
  }
);

export const deleteZoneDetailsNew = createAsyncThunk(
  "/product/deleteZoneDetails",
  async (props, { dispatch }) => {
    await axios.delete(
      `https://coral-bighorn-sheep-ring.cyclic.cloud/api/expenses/${props._id}`
    );
    window.location.href = `/app/zones/${props.zone}/${props.section}`;
  }
);

export const productSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {},
  extraReducers: {
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
    [fetchZoneDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchZoneDetails.fulfilled]: (state, action) => {
      state.zoneDetails = action.payload;
      state.isLoading = false;
    },
    [fetchZoneDetails.rejected]: (state) => {
      state.isLoading = false;
    },
    [fetchAllEmployees.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchAllEmployees.fulfilled]: (state, action) => {
      state.employeeList = action.payload;
      state.isLoading = false;
    },
    [fetchAllEmployees.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const {} = productSlice.actions;

export default productSlice.reducer;
