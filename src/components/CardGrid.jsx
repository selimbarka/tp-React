import { CardTile } from "./CardTile";
import { QuantityControl } from "./QuantityControl";

export function CardGrid({ cards, selectedId, onSelect, onQuantityChange, onRemove }) {
  if (cards.length === 0) {
    return <p className="hint">Aucune carte à afficher.</p>;
  }
  return (
    <div className="grid">
      {cards.map((card) => (
          <CardTile key={card.id} card={card} selected={card.id === selectedId}>

          <QuantityControl
            quantity={card.quantity}
            onChange={(delta) => onQuantityChange(card.id, delta)}
          />
            <button type="button" onClick={() => onSelect(card.id)}>Notes</button>
    <button type="button" onClick={() => onRemove(card.id)}>Retirer</button>
  </CardTile>
      ))}
    </div>
  );
}