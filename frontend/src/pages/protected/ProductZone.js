import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import ProductZone from "../../features/products/ProductZone";
function InternalPage() {
  const dispatch = useDispatch();

  const { type, zone } = useParams();

  useEffect(() => {
    dispatch(setPageTitle({ title: `${type} Zone ${zone}` }));
  }, []);

  return <ProductZone />;
}

export default InternalPage;
