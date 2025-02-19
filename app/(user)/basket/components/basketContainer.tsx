"use client"

import React, { use, useEffect, useState, useLayoutEffect } from "react";
import BasketObject from "../components/basketObject";
import type { Product} from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import nookies from 'nookies';
import BasketCustomObject from "./basketCustomObject";
import { getCookieIdsCustom } from "./handleData";


const BasketContainer = () => {
  const [basketProducts, setBasketProducts] = useState<Product[]>([]);
  const { data, status } = useSession();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [Subtotal, setSubTotal] = useState<number>(0);
  const userId = data?.user.id;
  const router = useRouter();
  const viewcustom = true;
  const [componentData, setComponentData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    if (status === "authenticated" && userId) {
      fetch(`/api/basket?userId=${userId}`)
        .then(res => res.json())
        .then(data => setBasketProducts(data.body));
    }
  }, [status, userId]);

  useEffect(() => {
    if (basketProducts.length > 0) {
      const subTotal = basketProducts.reduce((acc, product) => acc + product.priceInPence / 100, 0);
      const shippingPrice = basketProducts.length * 24.99;
      const totalPrice = subTotal + shippingPrice;

      setSubTotal(subTotal);
      setShippingPrice(shippingPrice);
      setTotalPrice(totalPrice);
    } else {
      setSubTotal(0);
      setShippingPrice(0);
      setTotalPrice(0);
    }
  }, [basketProducts]);

  const handleProceedToCheckout = () => {
    if (basketProducts.length > 0) {
      localStorage.setItem("basket", JSON.stringify(basketProducts));
      nookies.set(null, 'proceedToCheckout', 'true', { path: '/' });
      router.push("/checkout");
    }
  }


useEffect(() => {
  const cookieData = getCookieIdsCustom();
  if (!cookieData) return;

  const parsedCookie = typeof cookieData === 'string' ? JSON.parse(cookieData) : cookieData;
  const allIds: string[] = [];
  const allkeys: string[] = [];
  const partTitles: { [key: string]: string } = {
    cases: 'case',
    motherboards: 'motherboard',
    cpus: 'CPU',
    gpus: 'gpu',
    cpuCoolers: 'cpuCooler',
    memory: 'memory',
    storage: 'storage',
    psu: 'psu',
  };

  // Remove or handle duplicates, e.g. keep only the last 'storage' ID:
  Object.entries(parsedCookie).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      if (key === 'storage') {
        // keep only last storage ID
        const totalStorage = value
        console.log("Total Storage:", value);
        const lastStorageId = value[value.length - 1];
        allIds.push(lastStorageId);
        allkeys.push(key);
      } else {
        allIds.push(...value);
        allkeys.push(key);
      }
    } else if (typeof value === "string") {
      allIds.push(value);
      allkeys.push(key);
    }
  });

  for (let i = 0; i < allIds.length; i++) {
    fetch(`/api/components?id=${allIds[i]}&ctype=${partTitles[allkeys[i]]}`)
      .then(res => res.json())
      .then(data => {
        setComponentData(prev => ({
          ...prev,
          [partTitles[allkeys[i]]]: data,
        }));
      });
  }
  console.log("Component Data:", componentData); // Single log for debugging
}, []);

const caseId = componentData;
console.log("Case ID:", caseId);

  return (
    <>
      <div className="md:w-1/2 bg-white shadow-md rounded p-4">
        {basketProducts && basketProducts.length > 0 || viewcustom == true  ? (
          <>
            {basketProducts.map(product => (
              <BasketObject
                key={product.id}
                id={product.id}
                productName={product.name}
                priceInPence={product.priceInPence}
                imagePath={product.imagePath[0]}
                brand={product.brand}
                cpuModel={product.cpuModel}
                gpuModel={product.gpuModel}
                memorySize={product.memorySize}
                memoryType={product.memoryType}
                caseSize={product.caseSize}
                colour={product.colour}
                storageType={product.storageType}
                totalStorage={product.totalStorage}
                connectivity={product.connectivity}
                coolingMethod={product.coolingMethod}
                refreshBasket={() => {
                    fetch(`/api/basket?userId=${userId}`)
                    .then(res => res.json())
                    .then(data => setBasketProducts(data.body));
                  }}

                  />
                ))}
                
                <BasketCustomObject
                  priceInPence={1000}
                  imagePath={componentData['case']?.body?.imagePath}
                  cpuModel={componentData['CPU']?.body?.title}
                  gpuModel={componentData['gpu']?.body?.title}
                  memorySize={`${componentData['memory']?.body?.capacity} GB`}
                  memoryType={componentData['memory']?.body?.title}
                  caseSize={
                  componentData['case']?.body?.XLATX ? 'XLATX' :
                  componentData['case']?.body?.EATX ? 'EATX' :
                  componentData['case']?.body?.ATX ? 'ATX' :
                  componentData['case']?.body?.MicroATX ? 'MicroATX' :
                  componentData['case']?.body?.MiniITX ? 'MiniITX' : ''
                  }
                  storageType={componentData['storage']?.body?.title}
                  totalStorage=""
                  connectivity=""
                  coolingMethod=""
                  refreshBasket={() => {
                fetch(`/api/basket?userId=${userId}`)
                  .then(res => res.json())
                  .then(data => setBasketProducts(data.body));
              }}
            />
          </>
        ) : (
          <p>No items in the basket</p>
        )}
      </div>
      <div className="md:w-1/3 bg-white shadow-md rounded p-4" style={{ maxHeight:'230px'}}>
        <h2 className="text-2xl font-semibold text-center mb-3">Order Summary</h2>
        <div className="flex justify-between">
          <p className="text-lg">Subtotal:</p>
          <p className="text-lg">£{Subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg">Shipping:</p>
          <p className="text-lg">£{shippingPrice}</p>
        </div>
        <div className="flex justify-between font-semibold text-xl mt-3">
          <p>Total:</p>
          <p>£{totalPrice}</p>
        </div>
        <button className="mt-6 w-full px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-400" onClick={handleProceedToCheckout}>
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};

export default BasketContainer;