// components/Card.tsx
import React from 'react';
import { Card as CardType } from '../data/customParts';

interface CardProps {
  card: CardType;
  isSelected: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        border: isSelected ? '2px solid blue' : '1px solid gray',
        padding: '1rem',
        cursor: 'pointer',
      }}
    >
      <img src={card.image} alt={card.title} style={{ width: '100px', height: '100px' }} />
      <h3>{card.title}</h3>
      <p>Price: £{(card.priceInPence / 100).toFixed(2)}</p>
    </div>
  );
};

export default Card;
