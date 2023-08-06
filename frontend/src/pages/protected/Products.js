import React, { useEffect } from "react";
import Products from "../../features/products";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

const InternalPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Products Management" }));
  }, []);

  return <Products />;
};

export default InternalPage;
