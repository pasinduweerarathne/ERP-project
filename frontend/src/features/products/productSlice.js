import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  zones: [
    {
      zoneName: "Gold Star 1",
      zoneSlug: "gold-star-1",
      details: [],
    },
    {
      zoneName: "Gold Star 2",
      zoneSlug: "gold-star-2",
      details: [],
    },
    {
      zoneName: "Gold Star 3 (Bolraluwaththa)",
      zoneSlug: "gold-star-3",
      details: [],
    },
    {
      zoneName: "Gold Star 4",
      zoneSlug: "gold-star-4",
      details: [],
    },
  ],
};

export const productSlice = createSlice({
  name: "zones",
  initialState,
  reducers: {
    addZoneDetails: (state, action) => {
      const { zoneSlug, productName, data } = action.payload;
      const zone = state.zones.find((zone) => zone.zoneSlug === zoneSlug);

      if (zone) {
        const product = zone.details.find(
          (item) => item.productName === productName
        );

        if (product) {
          // Update existing product data
          product.data.push(data);
        } else {
          // Create a new product entry
          zone.details.push({ productName, data: [data] });
        }
      }
    },
    editZoneDetails: (state, action) => {
      const { zoneSlug, productName, data } = action.payload;

      const zone = state.zones.find((zone) => zone.zoneSlug === zoneSlug);

      if (zone) {
        const product = zone.details.find(
          (item) => item.productName === productName
        );

        if (product) {
          // Find the product by productId and update its data
          const productIndex = product.data.findIndex(
            (item) => item.id === data.id
          );

          if (productIndex !== -1) {
            product.data[productIndex] = { id: data.id, ...data };
          }
        }
      }
    },
    deleteZoneDetails: (state, action) => {
      const { _id, zone, product } = action.payload;

      const zoneArr = state.zones.find((z) => z.zoneSlug === zone);

      if (zoneArr) {
        const prod = zoneArr.details.find(
          (item) => item.productName === product
        );

        if (prod) {
          // Delete the product by productId
          prod.data = prod.data.filter((item) => item.id !== _id);
        }
      }
    },
  },
});

export const { addZoneDetails, deleteZoneDetails, editZoneDetails } =
  productSlice.actions;

export default productSlice.reducer;
