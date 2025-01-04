import ProductCatalog from '@/components/ProductCatalog'
import React from 'react'

const page = () => {
  return (
    <div>
    <h1 className="scroll-m-20 text-4xl font-bold tracking-widest lg:text-5xl text-center my-16">
        Our Featured Products
      </h1>
     <ProductCatalog  />
  </div>
  )
}

export default page