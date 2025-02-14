import { Product } from "@/*";
import React from "react";
import ProductItem from "./ProductItem";

type PropertyGridProps = {
  products: Product[];
};

const ProductGrid = ({ products }: PropertyGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
