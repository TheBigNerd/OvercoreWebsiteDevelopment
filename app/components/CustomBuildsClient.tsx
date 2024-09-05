// components/CustomPartsDisplay.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { fetchCustomParts } from '../data/customPartsService';
import { CustomParts } from '../data/customParts';
import nookies from 'nookies';

const PartItem: React.FC<{ item: any, isSelected: boolean, onClick: () => void }> = ({ item, isSelected, onClick }) => (
  <div
    className={`part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${isSelected ? 'border-blue-500' : ''}`}
    onClick={onClick}
  >
    <img src={item.image} alt={item.title} className="w-full h-32 object-cover mb-4 rounded" />
    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
    <p className="text-gray-700 mb-1">Price: £{(item.priceInPence / 100).toFixed(2)}</p>
    <p className="text-gray-500">{item.wattage}</p>
  </div>
);

const CustomPartsDisplay: React.FC = () => {
  const [customParts, setCustomParts] = useState<CustomParts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({});

  const handleExportToCookie = () => {
    nookies.set(null, 'customProduct', JSON.stringify(selectedItems), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
    alert('Custom product exported to cookie!');
  };


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

  const handleItemClick = (type: string, id: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems[type] === id) {
        console.log(`Deselected item: ${id}`);
        const { [type]: _, ...rest } = prevSelectedItems;
        return rest;
      } else {
        console.log(`Selected item: ${id}`);
        return { ...prevSelectedItems, [type]: id };
      }
    });
  };
  
  const isSelected = (type: string, id: string) => selectedItems[type] === id;
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  const renderPartItems = (type: string, items: any[]) => (
    <div className="flex space-x-4">
      {items.map((item) => (
        <PartItem
          key={item.id}
          item={item}
          isSelected={isSelected(type, item.id)}
          onClick={() => handleItemClick(type, item.id)}
        />
      ))}
    </div>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Custom Parts</h1>
      <div className="space-y-8">
        {customParts?.cases && renderPartItems('cases', customParts.cases)}
        {customParts?.cpus && renderPartItems('cpus', customParts.cpus)}
        {customParts?.gpus && renderPartItems('gpus', customParts.gpus)}
        {customParts?.motherboards && renderPartItems('motherboards', customParts.motherboards)}
        {customParts?.psu && renderPartItems('psu', customParts.psu)}
        {customParts?.cpuCoolers && renderPartItems('cpuCoolers', customParts.cpuCoolers)}
        {customParts?.memory && renderPartItems('memory', customParts.memory)}
        {customParts?.storage && renderPartItems('storage', customParts.storage)}
      </div>
      <button 
        onClick={handleExportToCookie} 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Export to Cookie
      </button>
    </div>
  );
};

export default CustomPartsDisplay;