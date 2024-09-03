// components/CustomPartsDisplay.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { fetchCustomParts } from '../data/customPartsService.ts';
import { CustomParts } from '../data/customParts';

const CustomPartsDisplay: React.FC = () => {
  const [customParts, setCustomParts] = useState<CustomParts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCustomParts() {
      try {
        const data = await fetchCustomParts();
        setCustomParts(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    }

    loadCustomParts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Custom Parts</h1>
      <div className="space-y-8">
        <div className="flex space-x-4">
          {customParts?.cases.map((caseItem) => (
            <div key={caseItem.id} className="part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={caseItem.image} alt={caseItem.title} className="w-full h-32 object-cover mb-4 rounded" />
              <h2 className="text-xl font-semibold mb-2">{caseItem.title}</h2>
              <p className="text-gray-700 mb-1">Price: £{(caseItem.priceInPence / 100).toFixed(2)}</p>
              <p className="text-gray-500">{caseItem.id}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {customParts?.cpus.map((cpuItem) => (
            <div key={cpuItem.id} className="part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={cpuItem.image} alt={cpuItem.title} className="w-full h-32 object-cover mb-4 rounded" />
              <h2 className="text-xl font-semibold mb-2">{cpuItem.title}</h2>
              <p className="text-gray-700 mb-1">Price: £{(cpuItem.priceInPence / 100).toFixed(2)}</p>
              <p className="text-gray-500">{cpuItem.id}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {customParts?.gpus.map((gpuItem) => (
            <div key={gpuItem.id} className="part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={gpuItem.image} alt={gpuItem.title} className="w-full h-32 object-cover mb-4 rounded" />
              <h2 className="text-xl font-semibold mb-2">{gpuItem.title}</h2>
              <p className="text-gray-700 mb-1">Price: £{(gpuItem.priceInPence / 100).toFixed(2)}</p>
              <p className="text-gray-500">{gpuItem.id}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {customParts?.motherboards.map((motherboardItem) => (
            <div key={motherboardItem.id} className="part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={motherboardItem.image} alt={motherboardItem.title} className="w-full h-32 object-cover mb-4 rounded" />
              <h2 className="text-xl font-semibold mb-2">{motherboardItem.title}</h2>
              <p className="text-gray-700 mb-1">Price: £{(motherboardItem.priceInPence / 100).toFixed(2)}</p>
              <p className="text-gray-500">{motherboardItem.id}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {customParts?.psu.map((powerSupplyItem) => (
            <div key={powerSupplyItem.id} className="part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={powerSupplyItem.image} alt={powerSupplyItem.title} className="w-full h-32 object-cover mb-4 rounded" />
              <h2 className="text-xl font-semibold mb-2">{powerSupplyItem.title}</h2>
              <p className="text-gray-700 mb-1">Price: £{(powerSupplyItem.priceInPence / 100).toFixed(2)}</p>
              <p className="text-gray-500">{powerSupplyItem.id}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {customParts?.cpuCoolers.map((cpuCoolerItem) => (
            <div key={cpuCoolerItem.id} className="part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={cpuCoolerItem.image} alt={cpuCoolerItem.title} className="w-full h-32 object-cover mb-4 rounded" />
              <h2 className="text-xl font-semibold mb-2">{cpuCoolerItem.title}</h2>
              <p className="text-gray-700 mb-1">Price: £{(cpuCoolerItem.priceInPence / 100).toFixed(2)}</p>
              <p className="text-gray-500">{cpuCoolerItem.id}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {customParts?.memory.map((memoryItem) => (
            <div key={memoryItem.id} className="part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={memoryItem.image} alt={memoryItem.title} className="w-full h-32 object-cover mb-4 rounded" />
              <h2 className="text-xl font-semibold mb-2">{memoryItem.title}</h2>
              <p className="text-gray-700 mb-1">Price: £{(memoryItem.priceInPence / 100).toFixed(2)}</p>
              <p className="text-gray-500">{memoryItem.id}</p>
            </div>
          ))}
        </div>
        <div className="flex space-x-4">
          {customParts?.storage.map((storageItem) => (
            <div key={storageItem.id} className="part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={storageItem.image} alt={storageItem.title} className="w-full h-32 object-cover mb-4 rounded" />
              <h2 className="text-xl font-semibold mb-2">{storageItem.title}</h2>
              <p className="text-gray-700 mb-1">Price: £{(storageItem.priceInPence / 100).toFixed(2)}</p>
              <p className="text-gray-500">{storageItem.id}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomPartsDisplay;