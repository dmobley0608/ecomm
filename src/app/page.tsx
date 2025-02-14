import { getCurrentSession } from '@/actions/auth';
import SalesCampaignBanner from '@/components/layout/SalesCampaignBanner';
import ProductGrid from '@/components/product/ProductGrid';
import { getAllProducts } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import React from 'react'

const page = async() => {
  const products = await getAllProducts();
  return (

     <div>
      <SalesCampaignBanner/>

      <section className='container mx-auto py-8'>
        <ProductGrid products={products}/>
      </section>
     </div>
  )
}

export default page
