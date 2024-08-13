// components/CustomBuildsClient.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card as CardType, CustomParts } from '../data/customParts';
import CardSection from '../components/CardSection';
import { setCookie } from 'nookies';

const CustomBuildsClient = ({ customParts }) => {
  const [selectedCards, setSelectedCards] = useState<{ [K in keyof CustomParts]: CardType | CardType[] | null }>({
      cases: null,
      motherboards: null,
      cpus: null,
      gpus: null,
      primaryStorage: null,
      secondaryStorage: [],
  });

  const router = useRouter();

  const handleCardSelect = (section: keyof CustomParts, card: CardType) => {
    if (section === 'secondaryStorage') {
      setSelectedCards((prevSelectedCards) => {
        const currentSelection = prevSelectedCards[section] as CardType[];
        const isSelected = currentSelection.some((selectedCard) => selectedCard.id === card.id);
        if (isSelected) {
          return {
            ...prevSelectedCards,
            [section]: currentSelection.filter((selectedCard) => selectedCard.id !== card.id),
          };
        }
        return {
          ...prevSelectedCards,
          [section]: [...currentSelection, card],
        };
      });
    } else {
      setSelectedCards((prevSelectedCards) => ({
        ...prevSelectedCards,
        [section]: card,
      }));
    }
  };

  const [compatibilityMessage, setCompatibilityMessage] = useState<string | null>(null);

  const getUpdatedSizes = (selectedCards: { [K in keyof CustomParts]: CardType | CardType[] | null }) => {
    const caseSizes = selectedCards.cases ? (selectedCards.cases as CardType).sizes : [];
    const motherboardSizes = selectedCards.motherboards ? (selectedCards.motherboards as CardType).sizes : [] ?? [];
    const cpuSocket = selectedCards.cpus ? (selectedCards.cpus as CardType).socketType : null;
    const motherboardSocket = selectedCards.motherboards ? (selectedCards.motherboards as CardType).socketType : null;
  
    console.log('Case Sizes:', caseSizes);
    console.log('Motherboard Sizes:', motherboardSizes);
    console.log('CPU Socket:', cpuSocket);
    console.log('Motherboard Socket:', motherboardSocket);
  
    let compatible = true;
  
    if (caseSizes && motherboardSizes) {
      const sizeCompatible = motherboardSizes.some((size) => caseSizes.includes(size));
      console.log(sizeCompatible ? 'Size Compatible' : 'Size Incompatible');
      if (!sizeCompatible) {
        compatible = false;
      }
    } else {
      compatible = false;
    }
  
    if (cpuSocket && motherboardSocket) {
      const socketCompatible = cpuSocket === motherboardSocket;
      console.log(socketCompatible ? 'Socket Compatible' : 'Socket Incompatible');
      if (!socketCompatible) {
        compatible = false;
      }
    } else {
      compatible = false;
    }
  
    if (compatible) {
      setCompatibilityMessage(null);
    } else {
      setCompatibilityMessage('Incompatible motherboard, case, or CPU choice selected');
    }
  };
  
  useEffect(() => {
    getUpdatedSizes(selectedCards);
  }, [selectedCards]);

  const getTotalPriceInPounds = () => {
    return Object.values(selectedCards).reduce((total, card) => {
      if (Array.isArray(card)) {
        return total + card.reduce((subTotal, item) => subTotal + item.priceInPence, 0);
      }
      return card ? total + card.priceInPence : total;
    }, 0) / 100;
  };

  const handleNextClick = () => {
    setCookie(null, 'selectedComponents', JSON.stringify(selectedCards), {
      maxAge: 30 * 24 * 60 * 60,
      path: '/',
    });

    router.push('/ccompleted');
  };

  return (
    <div>
      <h1>Select Your PC Components</h1>
      {compatibilityMessage && <p>{compatibilityMessage}</p>}
      {Object.keys(customParts).map((section) => (
        <CardSection
          key={section}
          section={section as keyof CustomParts}
          cards={customParts[section as keyof CustomParts]}
          selectedCards={selectedCards[section as keyof CustomParts]}
          handleCardSelect={handleCardSelect}
        />
      ))}
      <div style={{ marginTop: '2rem', fontSize: '1.5rem' }}>
        <strong>Total Price: £{getTotalPriceInPounds().toFixed(2)}</strong>
      </div>
      <button onClick={handleNextClick} style={{ marginTop: '2rem', padding: '1rem', fontSize: '1rem' }}>
        Next
      </button>
    </div>
  );
};

export default CustomBuildsClient;
