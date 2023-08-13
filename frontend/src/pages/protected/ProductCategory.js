import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import ProductCategory from "../../features/products/ProductCategory";

function InternalPage() {
  const dispatch = useDispatch();
  const { type } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: `${type}` }));
  }, []);

  return <ProductCategory />;
}

export default InternalPage;
