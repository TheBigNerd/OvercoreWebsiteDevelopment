// _components/Card.tsx
import React, { useCallback } from 'react';
import { Case, Motherboard, CPU, GPU } from '../data/customParts';

type CardType = Case | Motherboard | CPU | GPU;

type CardProps = {
  card: CardType;
  isSelected: boolean;
  onClick: () => void;
};

const Card = ({ card, isSelected, onClick }: CardProps) => {
  const handleClick = useCallback(() => {
    onClick();
  }, [onClick]);

  return (
    <div
      onClick={handleClick}
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
