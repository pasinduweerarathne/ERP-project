import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Salary from "../../features/salary";

const InternalPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Salary Management" }));
  }, []);

  return <Salary />;
};

export default InternalPage;
