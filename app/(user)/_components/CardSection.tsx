// _components/CardSection.tsx
import React, { useCallback } from 'react';
import { Card as CardType, CustomParts } from '../data/customParts';
import Card from './Card';

type CardSectionProps = {
  section: keyof CustomParts;
  cards: CardType[];
  selectedCards: CardType | CardType[] | null;
  handleCardSelect: (section: keyof CustomParts, card: CardType) => void;
};

const CardSection = ({ section, cards, selectedCards, handleCardSelect }: CardSectionProps) => {
  const isCardSelected = useCallback(
    (card: CardType) => {
      if (Array.isArray(selectedCards)) {
        return selectedCards.some((selectedCard) => selectedCard.id === card.id);
      }
      return selectedCards?.id === card.id;
    },
    [selectedCards]
  );

  const handleCardClick = (card: CardType) => {
    handleCardSelect(section, card);
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
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
    </div>
  );
};

export default CardSection;
