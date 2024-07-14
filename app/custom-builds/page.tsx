"use client"
// pages/index.tsx
import { useState } from 'react';
import { Card as CardType, customParts } from '../data/customParts';
import CardSection from '../components/CardSection';

const HomePage = () => {
  const [selectedCards, setSelectedCards] = useState<{ [key: string]: CardType | CardType[] | null }>({
    cases: null,
    cpus: null,
    gpus: null,
    primaryStorage: null,
    secondaryStorage: [],
  });

  const handleCardSelect = (section: string, card: CardType) => {
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

  return (
    <div>
      <h1>Select Your PC Components</h1>
      {Object.keys(customParts).map((section) => (
        <CardSection
          key={section}
          section={section}
          cards={customParts[section]}
          selectedCards={selectedCards[section]}
          handleCardSelect={handleCardSelect}
        />
      ))}
      <div style={{ marginTop: '2rem', fontSize: '1.5rem' }}>
        <strong>Total Price: £{getTotalPriceInPounds().toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default HomePage;
