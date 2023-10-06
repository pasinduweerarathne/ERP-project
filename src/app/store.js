import { configureStore } from "@reduxjs/toolkit";
import headerSlice from "../features/common/headerSlice";
import modalSlice from "../features/common/modalSlice";
import rightDrawerSlice from "../features/common/rightDrawerSlice";
import employeeSlice from "../features/employeeManagement/employeeSlice";
import productSlice from "../features/products/productSlice";
import salarySlice from "../features/salaryManagement/salarySlice";

const combinedReducer = {
  header: headerSlice,
  rightDrawer: rightDrawerSlice,
  modal: modalSlice,
  employee: employeeSlice,
  product: productSlice,
  salary: salarySlice,
};

export default configureStore({
  reducer: combinedReducer,
});
