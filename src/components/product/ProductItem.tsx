import { Product } from "@/*";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductItemProps = {
  product: Product;
};

const ProductItem = ({ product }: ProductItemProps) => {


  return (
    <div className="bg-white rounded-lg overflow-hidden relative">
      <div className="absolute top-2 right-2 z-10">{parseInt(String(product.price ?? 0)) % 2 != 0 && <span className="bg-red-500 text-white text-xs font-bold py-2 px-1 rounded-md animate-bounce">🔥 HOT ITEM 🔥</span>}</div>
      {product.image && (
        <div className="relative h-48 w-full">
          <Image src={urlFor(product.image).width(256).url()} alt={product?.title ?? "Product Image"} fill className="object-contain p-2" loading="lazy" />
        </div>
      )}
      <div className="p-4">
        <h3 className="text-sm font-medium line-clamp-2 h-10 mb-1">{product.title}</h3>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-500">${(product.price || 0).toFixed(2) }</span>
            <span className="text-sm text-gray-400 line-through">${((product.price|| 0) * 5).toFixed(2) }</span>
          </div>
        </div>
        <div className="text-sm text-green-500 font-semibold mb-2">
          🔥  {100 + Math.abs(product._id.split("").reduce((acc, char)=> acc + char.charCodeAt(0),0) % 500)} + SOLD
        </div>
        <Link href={`/product/${product._id}`} className="w-full bg-gradient-to-tr from-red-500 to-orange-500 text-white py-2 px-4 rounded full text-sm font:bold hover:brightness-110 transition-all">GRAB IT NOW</Link>
        <div className="text-xs text-red-500 text-center mt-1 animate-pulse">⚡ Limited Time Offer! ⚡</div>
      </div>
    </div>
  );
};

export default ProductItem;
