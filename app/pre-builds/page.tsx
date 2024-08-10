import { prisma } from "@/lib/prisma";
import React from "react";
import ProductCard from "../components/productComponents/product-card";

const prebuilds = async() => {
  const defaultProductLayout = await getProductDefault()
  return(
    <>
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">Featured Products</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultProductLayout.map(product => (
          <ProductCard name={product.name} priceInPence={product.priceInPence} imagePath={product.imagePath} />
        ))}
      </div>
    </div>

  </>
  )
};

export default prebuilds;

async function getProductDefault() {
  const defaultProducts = await prisma.product.findMany({ where: { isAvailable: true }})
  return defaultProducts;
}