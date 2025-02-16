import SalesCampaignBanner from "@/components/layout/SalesCampaignBanner";
import ProductGrid from "@/components/product/ProductGrid";
import { searchProducts } from "@/sanity/lib/client";
import React from "react";

type SearchPageProps = {
 searchParams: Promise<{ query: string }>;
};

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { query } = await searchParams;

 const products = await searchProducts(query);

  return (
    <div>
      <SalesCampaignBanner />
      <div className="bg-red-50 p-4">
        <div className="container mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-600 mb-2"> Search Results for &quot; {query} &quot;</h1>
        </div>
      </div>
      <div className="bg-yellow-50 py-3">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">🚚</span>
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">⭐</span>
              <span>Top Rated</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-600">💰</span>
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </div>
      <section className="container mx-auto py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-gray-500">🎇 {products.length} Amazing Deals Available Now</p>
        </div>
        <ProductGrid products={products} />
      </section>
    </div>
  );
};

export default SearchPage;
