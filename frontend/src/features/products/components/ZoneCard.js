import React from "react";
import { NavLink, useParams } from "react-router-dom";

const ZoneCard = ({ zone }) => {
  const { type } = useParams();

  return (
    <NavLink
      to={`/app/products/${type}/${zone}`}
      className="flex justify-center bg-gray-300 rounded-lg shadow p-5"
    >
      Zone {zone}
    </NavLink>
  );
};

export default ZoneCard;
