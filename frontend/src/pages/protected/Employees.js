import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";
import Employees from "../../features/employees";

const InternalPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Employees Management" }));
  }, []);

  return <Employees />; 
};

export default InternalPage;
