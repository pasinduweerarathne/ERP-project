import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import employeeSlice from "../features/employeeManagement/employeeSlice";
import leadsSlice from "../features/leads/leadSlice";
import productSlice from "../features/products/productSlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  lead: leadsSlice,
  employee: employeeSlice,
  product: productSlice,
};

export default configureStore({
  reducer: combinedReducer,
});
