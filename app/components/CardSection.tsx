// components/CardSection.tsx
import React from 'react';
import { Card as CardType } from '../data/customParts';
import Card from './card';

interface CardSectionProps {
  section: string;
  cards: CardType[];
  selectedCards: CardType | CardType[] | null;
  handleCardSelect: (section: string, card: CardType) => void;
}

const CardSection: React.FC<CardSectionProps> = ({ section, cards, selectedCards, handleCardSelect }) => {
  const isCardSelected = (card: CardType) => {
    if (Array.isArray(selectedCards)) {
      return selectedCards.some((selectedCard) => selectedCard.id === card.id);
    }
    return selectedCards?.id === card.id;
  };

  return (
    <div>
      <h2>{section.charAt(0).toUpperCase() + section.slice(1)}</h2>
      <div style={{ display: 'flex', gap: '1rem' }}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isSelected={isCardSelected(card)}
            onClick={() => handleCardSelect(section, card)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSection;
