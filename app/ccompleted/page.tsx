// app/ccompleted/page.tsx
import { useSearchParams } from 'next/navigation';
import { Card as CardType } from '../data/customParts';

type CompletedPageProps = {
  selectedComponents: { [key: string]: CardType | CardType[] };
};

const CompletedPage = ({ selectedComponents }: CompletedPageProps) => {
  const getTotalPriceInPounds = () => {
    return Object.values(selectedComponents).reduce((total, card) => {
      if (Array.isArray(card)) {
        return total + card.reduce((subTotal, item) => subTotal + item.priceInPence, 0);
      }
      return card ? total + (card as CardType).priceInPence : total;
    }, 0) / 100;
  };

  return (
    <div>
      <h1>Selected Components</h1>
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

export default CompletedPage;
