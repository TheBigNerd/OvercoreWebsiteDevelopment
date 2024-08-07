// components/CustomBuildsClient.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card as CardType, CustomParts } from '../data/customParts';
import CardSection from '../components/CardSection';
import { setCookie } from 'nookies';

const CustomBuildsClient = ({ customParts }) => {
  const [selectedCards, setSelectedCards] = useState<{ [K in keyof CustomParts]: CardType | CardType[] | null }>({
    cases: null,
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
