import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AVAILABLE_CATEGORIES } from "../../utils/dummyData";
import ProductCard from "./components/ProductCard";

const Products = () => {
  const [categories] = useState(AVAILABLE_CATEGORIES);

  return (
    <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
      {categories.map((c, i) => (
        <NavLink to={`/app/products/${c.name}`}>
          <ProductCard key={i} img={c.img} category={c.name} />
        </NavLink>
      ))}
    </div>
  );
};

export default Products;
