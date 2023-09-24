import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setPageTitle } from "../../features/common/headerSlice";
import SectionData from "../../features/products/SectionData";

function convertZone(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function convertSection(str) {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function InternalPage() {
  const dispatch = useDispatch();
  const { zone, section } = useParams();

  useEffect(() => {
    dispatch(
      setPageTitle({
        title: `${convertZone(zone)} zone - ${convertSection(section)} section`,
      })
    );
  }, []);

  return <SectionData />;
}

export default InternalPage;
