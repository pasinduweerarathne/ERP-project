import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AVAILABLE_ZONES } from "./components/data";

const Products = () => {
  const [zones] = useState(AVAILABLE_ZONES);

  return (
    <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
      {zones.map((zone) => (
        <NavLink to={`/app/zones/${zone.zoneSlug}`}>
          <div class="block rounded-lg bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div class="p-6">
              <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {zone.zoneName}
              </h5>
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Products;
