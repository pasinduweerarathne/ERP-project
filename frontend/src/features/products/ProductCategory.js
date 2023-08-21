import React from "react";
import { NavLink, useParams } from "react-router-dom";
import ZoneCard from "./components/ZoneCard";

const ProductCategory = () => {
  const { type } = useParams();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-center text-4xl font-extrabold dark:text-white">
          {type} Section
        </h1>
        <NavLink
          className={"bg-primary rounded-2xl px-5 py-2 text-white"}
          to={`/app/products`}
        >
          Back
        </NavLink>
      </div>
      <div className="grid lg:grid-cols-3 mt-4 md:grid-cols-2 grid-cols-1 gap-6">
        <div className="stats shadow p-5">
          <div className="flex items-center justify-around">
            <div className={`text-2xl dark:text-slate-300`}>Income</div>
            <div className="mt-[8px]">20000</div>
          </div>
        </div>
        <div className="stats shadow p-5">
          <div className="flex items-center justify-around">
            <div className={`text-2xl dark:text-slate-300`}>Expense</div>
            <div className="mt-[8px]">20000</div>
          </div>
        </div>
        <div className="stats shadow p-5">
          <div className="flex items-center justify-around">
            <div className={`text-2xl dark:text-slate-300`}>Profit</div>
            <div className="mt-[8px]">20000</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-8">
        <ZoneCard zone={1} />
        <ZoneCard zone={2} />
        <ZoneCard zone={3} />
        <ZoneCard zone={4} />
        <ZoneCard zone={5} />
        <ZoneCard zone={6} />
        <ZoneCard zone={7} />
        <ZoneCard zone={8} />
        <ZoneCard zone={9} />
      </div>
    </div>
  );
};

export default ProductCategory;
