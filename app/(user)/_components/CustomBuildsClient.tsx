// _components/CustomPartsDisplay.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { fetchCustomParts } from '../data/customPartsService';
import { CustomParts} from '../data/customParts';
import nookies, { parseCookies } from 'nookies'; 


const PartItem: React.FC<{ item: any, isSelected: boolean, onClick: () => void }> = ({ item, isSelected, onClick }) => (
  <div
  className={`part-item border rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer ${isSelected ? 'border-blue-500' : ''} w-72 h- flex flex-col justify-between`}
    onClick={onClick}
  >
    <img src={item.image} alt={item.title} className="w-32 h-32 object-cover mb-4 rounded"/>
    <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
    <h3 className="text-black">{item.description}</h3>
    <p className="text-gray-400 mb-1">Price: £{(item.priceInPence / 100).toFixed(2)}</p>
  </div>
);

const CustomPartsDisplay: React.FC = () => {
  const [customParts, setCustomParts] = useState<CustomParts | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: string }>({});
  const [selectedSocketType, setSelectedSocketType] = useState<string | null>(null);
  
  const handleExportToCookie = (selected: any) => {
    nookies.set(null, 'customProduct', JSON.stringify(selected), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: '/',
    });
  };



  useEffect(() => {
    async function loadCustomParts() {
      try {
        const data = await fetchCustomParts();
        setCustomParts(data);

        // Log the 'customProduct' cookie data
        const cookies = parseCookies();
        const cookieValue = cookies['customProduct'];
        if (cookieValue) {
          setSelectedItems(JSON.parse(cookieValue));
        }
        // Set the first item as selected if available
        if (!cookieValue && data.cases && typeof selectedItems['cases'] !== 'string') {
          const firstItem = data.cases[0];
          setSelectedItems({ ["cases"]: firstItem.id });
          }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
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
	  const currentSelected = selectedItems;
	  if (currentSelected[type] === id) {
		  delete currentSelected[type];
		  
		  setItemPrices((prevItemPrices) => {
			  const { [type]: __, ...restPrices } = prevItemPrices;
			  return restPrices;
		  });
	  } else {
		  if (type === 'cpus' && socketType) setSelectedSocketType(socketType);
		  
		  currentSelected[type] = id;
		  
		  setItemPrices((prevItemPrices) => ({
			  ...prevItemPrices,
			  [type]: itemPrice,
		  }));
	  }
	  setSelectedItems(currentSelected);
	  handleExportToCookie(currentSelected);
  };
  
  useEffect(() => {
    // Initialize itemPrices with the prices of the initially selected items
    const initialItemPrices: { [key: string]: number } = {};
    Object.keys(selectedItems).forEach(type => {
      const selectedItem = customParts && customParts[type as keyof CustomParts]?.find((item: { id: string; }) => item.id === selectedItems[type]);
      if (selectedItem) {
        initialItemPrices[type] = selectedItem.priceInPence; // Assuming each item has a 'price' property
      }
    });
    setItemPrices(initialItemPrices);
  }, [customParts, selectedItems]);
  
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
          if ('wattage' in selectedItem && selectedItems['psu'] !== selectedItem.id) {
            wattage += typeof selectedItem.wattage === 'number' ? selectedItem.wattage : 0;
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
    <div className="flex flex-wrap gap-4 ">
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


  const filterPsusByWattage = (psus: any[], totalWattage: number) => {
    const filteredPsus = psus.filter(psu => psu.wattage > totalWattage +150);
    return filteredPsus;
  };


  const filteredMotherboards = selectedSocketType
    ? customParts?.motherboards?.filter(mb => mb.socketType === selectedSocketType)
    : customParts?.motherboards;

    

    const renderItemsList = (type: string, selectedItem: any) => {
      if (selectedItem) {
        return <li key={selectedItem.id}>{selectedItem}</li>;
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
          {customParts?.cpuCoolers && renderPartItems('cpuCoolers', customParts.cpuCoolers)}
          {customParts?.gpus && renderPartItems('gpus', customParts.gpus)}
          {filteredMotherboards && renderPartItems('motherboards', filteredMotherboards)}
          {customParts?.memory && renderPartItems('memory', customParts.memory)}
          {customParts?.storage && renderPartItems('storage', customParts.storage)}
          {customParts?.psu && renderPartItems('psu', filterPsusByWattage(customParts.psu, totalWattage))}
        </div>
        <div className="flex-none ml-4 p-4 border border-gray-300 rounded-lg w-1/3">
          <img 
            src={customParts?.cases?.find(item => item.id === selectedItems['cases'])?.image || '/case/_af57a160-471f-4f26-ba6f-e516a168aab3.jfif'}  
            alt="Selected Case Picture" 
            className="w-full h-auto object-cover"
          />
          <ul>
            {customParts && Object.keys(customParts).map(partType => {
              const selectedItem = customParts[partType as keyof CustomParts]?.find(item => isSelected(partType, item.id));
              return (
                <li key={partType}>
                  <h2 className="font-bold">{partType}</h2>
                  <ul>
                    {renderItemsList(partType, selectedItem?.title)}
                  </ul>
                </li>
              );
            })}
            <li>Your Price: £{(price / 100).toFixed(2)}</li>
          </ul>
          <Button 
            className="mt-4 px-4 py-2 bg-slate-700 text-white rounded"
          >
          Buy Now
          </Button>
        </div>
      </div>
    );
  }
    
    export default CustomPartsDisplay;