// components/CustomPartsDisplay.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { fetchCustomParts } from '../data/customPartsService';
import { CustomParts} from '../data/customParts';
import nookies from 'nookies';

const PartItem: React.FC<{ item: any, isSelected: boolean, onClick: () => void }> = ({ item, isSelected, onClick }) => (
  <div
    className={`part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${isSelected ? 'border-blue-500' : ''}`}
    onClick={onClick}
  >
    <img src={item.image} alt={item.title} className="w-full h-32 object-cover mb-4 rounded" />
    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
    <h3 className="text-black">description</h3>
    <p className="text-gray-400 mb-1">Price: £{(item.priceInPence / 100).toFixed(2)}</p>
  </div>
);

const CustomPartsDisplay: React.FC = () => {
  const [customParts, setCustomParts] = useState<CustomParts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({});
  const [selectedSocketType, setSelectedSocketType] = useState<string | null>(null);
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


  const [price, setPrice] = useState(0);
  const [itemPrices, setItemPrices] = useState<{ [key: string]: number }>({});
  const [totalWattage, setTotalWattage] = useState(0);
  
  const handleItemClick = (type: string, id: string, itemPrice: number, socketType?: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems[type] === id) {
        console.log(`Deselected item: ${id}`);
        const { [type]: _, ...rest } = prevSelectedItems;
        setItemPrices((prevItemPrices) => {
          const { [type]: __, ...restPrices } = prevItemPrices;
          return restPrices;
        });
        return rest;
      } else {
        if (type === 'cpus' && socketType) {
          setSelectedSocketType(socketType);
        }
        console.log(`Selected item: ${id}`);
        setItemPrices((prevItemPrices) => ({
          ...prevItemPrices,
          [type]: itemPrice,
        }));
        return { ...prevSelectedItems, [type]: id };
      }
    });
  };
  
  useEffect(() => {
    const totalPrice = Object.values(itemPrices).reduce((acc, curr) => acc + curr, 0);
    setPrice(totalPrice);
  }, [itemPrices]);

  useEffect(() => {
    const calculateTotalWattage = () => {
      let wattage = 0;
      Object.keys(selectedItems).forEach(type => {
        const selectedItem = customParts && customParts[type as keyof CustomParts]?.find((item: { id: string; }) => item.id === selectedItems[type]);
        if (selectedItem) {
          if ('wattage' in selectedItem) {
            wattage += typeof selectedItem.wattage === 'number' ? selectedItem.wattage : 0;
            console.log(selectedItem.wattage);
          }
        }
      });
      setTotalWattage(wattage);
    };

    calculateTotalWattage();
  }, [selectedItems, customParts]);
  
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
          onClick={() => handleItemClick(type, item.id, item.priceInPence, item.socketType)}
        />
      ))}
    </div>
  );

  const currentPSU = customParts?.psu?.find(item => isSelected('psu', item.id));
  const psuWattage = currentPSU ? currentPSU.wattage : 0;
  const shouldDisplayPSU =(psuWattage + 150) - totalWattage  > 0;

  const filteredMotherboards = selectedSocketType
    ? customParts?.motherboards?.filter(mb => mb.socketType === selectedSocketType)
    : customParts?.motherboards;

    

    const renderItemsList = (type: string, selectedItem: any) => {
      if (selectedItem) {
        return <li key={selectedItem.id}>{selectedItem.name}</li>;
      } else {
        return <li style={{ color: 'red' }}>Not selected</li>;
      }
    };
    
    return (
      <div className="p-4 flex">
        <div className="flex-1 space-y-8">
          <h1 className="text-2xl font-bold mb-4">Custom Parts</h1>
          {customParts?.cases && renderPartItems('cases', customParts.cases)}
          {customParts?.cpus && renderPartItems('cpus', customParts.cpus)}
          {customParts?.gpus && renderPartItems('gpus', customParts.gpus)}
          {filteredMotherboards && renderPartItems('motherboards', filteredMotherboards)}
          {shouldDisplayPSU && customParts?.psu && renderPartItems('psu', customParts.psu)}
          {customParts?.cpuCoolers && renderPartItems('cpuCoolers', customParts.cpuCoolers)}
          {customParts?.memory && renderPartItems('memory', customParts.memory)}
          {customParts?.storage && renderPartItems('storage', customParts.storage)}
        </div>
        <div className="flex-none ml-4 p-4 border border-gray-300 rounded-lg w-1/3">
          <img 
            src="https://via.placeholder.com/300" 
            alt="Placeholder" 
            className="w-full h-auto object-cover"
          />
          <ul>
            {customParts && Object.keys(customParts).map(partType => {
              const selectedItem = customParts[partType as keyof CustomParts]?.find(item => isSelected(partType, item.id));
              return (
                <li key={partType}>
                  <h2 className="font-bold">{partType}</h2>
                  <ul>
                    {renderItemsList(partType, selectedItem)}
                  </ul>
                  
                </li>
              );
            })}
          </ul>
          <div className='text-x2 font-semibold mb-2'>Current Price: £{(price / 100).toFixed(2)}</div>
          <button 
            onClick={handleExportToCookie} 
            className="mt-4 px-4 py-2 bg-slate-700 text-white rounded"
          >
            Add to Basket
          </button>
        </div>
      </div>
    );
  }
    
    export default CustomPartsDisplay;