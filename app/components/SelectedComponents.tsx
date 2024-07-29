// app/components/SelectedComponents.tsx
"use client"

import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { Card as CardType } from '../data/customParts';

const SelectedComponents = () => {
  const [selectedComponents, setSelectedComponents] = useState<{ [key: string]: CardType | CardType[] }>({});

  useEffect(() => {
    const cookies = parseCookies();
    if (cookies.selectedComponents) {
      setSelectedComponents(JSON.parse(cookies.selectedComponents));
    }
  }, []);

  const getTotalPriceInPounds = () => {
    return Object.values(selectedComponents).reduce((total, card) => {
      if (Array.isArray(card)) {
        return total + card.reduce((subTotal, item) => subTotal + item.priceInPence, 0);
      }
      return (card as CardType).priceInPence ? total + (card as CardType).priceInPence : total;
    }, 0) / 100;
  };

  return (
    <div>
      {Object.entries(selectedComponents).map(([section, cards]) => (
        <div key={section}>
          <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
          {Array.isArray(cards) ? (
            cards.map((card: CardType) => (
              <div key={card.id}>
                <h3>{card.title}</h3>
                <p>Price: £{(card.priceInPence / 100).toFixed(2)}</p>
              </div>
            ))
          ) : (
            cards && (
              <div key={(cards as CardType).id}>
                <h3>{(cards as CardType).title}</h3>
                <p>Price: £{((cards as CardType).priceInPence / 100).toFixed(2)}</p>
              </div>
            )
          )}
        </div>
      ))}
      <div style={{ marginTop: '2rem', fontSize: '1.5rem' }}>
        <strong>Total Price: £{getTotalPriceInPounds().toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default SelectedComponents;
