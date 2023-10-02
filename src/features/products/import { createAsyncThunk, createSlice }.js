import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const fetchZoneDetails = createAsyncThunk(
  "/product/fetchZoneDetails",
  async (params) => {
    const { zone: zoneSlug, product: category, curPage: currentPage } = params;
    const res = await axios.get(
      `http://localhost:4000/api/expenses/${zoneSlug}/${category}?page=${currentPage}`
    );
    return res.data;
  }
);

export const addZoneDetailsNew = createAsyncThunk(
  "/product/addZoneDetails",
  async (formData) => {
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
    await axios.post(`http://localhost:4000/api/expenses`, body);
  }
);

export const editZoneDetailsNew = createAsyncThunk(
  "/product/editZoneDetails",
  async (formData) => {
    const { zoneSlug, categoryName, id, data } = formData;
    const { empName, description, type, salary } = data;
    const body = {
      zoneSlug,
      categoryName,
      id,
      empName,
      description,
      type,
      salary,
    };
    await axios.patch(`http://localhost:4000/api/expenses/${id}`, body);
  }
);

export const deleteZoneDetailsNew = createAsyncThunk(
  "/product/deleteZoneDetails",
  async (id) => {
    const res = await axios.delete(`http://localhost:4000/api/expenses/${id}`);
    return res.data;
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
    [fetchZoneDetails.fulfilled]: (state, action) => {},
    [addZoneDetailsNew.fulfilled]: (state, action) => {},
    [editZoneDetailsNew.fulfilled]: (state, action) => {},
    [deleteZoneDetailsNew.fulfilled]: (state, action) => {},
  },
});

export const { addZoneDetails, deleteZoneDetails, editZoneDetails } =
  productSlice.actions;

export default productSlice.reducer;

const resdata = {
  currentPage: "1",
  totalPages: 1,
  expenses: [
    {
      categoryName: "New Tea",
      createdAt: "2023-09-28T16:39:37.152Z",
      description: "b",
      empName: "Kithsiri",
      salary: 1200,
      type: "Expense",
      updatedAt: "2023-09-28T16:39:37.152Z",
      zoneId: "6511cce1235e6675447454dc",
      zoneSlug: "gold-star-3",
      __v: 0,
      _id: "6515ac49893f05feec438dbe",
    },
    {
      categoryName: "New Tea",
      createdAt: "2023-09-28T16:39:28.460Z",
      description: "a",
      empName: "Premadasa",
      salary: 1500,
      type: "Expense",
      updatedAt: "2023-09-28T16:39:28.460Z",
      zoneId: "6511cce1235e6675447454dc",
      zoneSlug: "gold-star-3",
      __v: 0,
      _id: "6515ac40893f05feec438db8",
    },
  ],
};
