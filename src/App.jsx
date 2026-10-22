import { useState } from "react";
import { collectionValue, formatPrice } from "./domain/card";
import { useCards } from "./hooks/useCards";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import { AddCardForm } from "./components/AddCardForm";
import { CardGrid } from "./components/CardGrid";
import { CardNotes } from "./components/CardNotes";
import { FavoritesCount } from "./components/FavoritesCount";
import { Panel } from "./components/Panel";
import { SearchBar } from "./components/SearchBar";
import { Summary } from "./components/Summary";

export default function App() {
  const { state, retry, changeQuantity, removeCard, addCard } = useCards();
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("toutes");
  const [selectedId, setSelectedId] = useState(null);

  const cards = state.status === "success" ? state.cards : [];
  useDocumentTitle(`Ma collection (${formatPrice(collectionValue(cards))})`);

  const selectedCard = cards.find((card) => card.id === selectedId);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleCards = cards.filter(
    (card) =>
      (card.name.toLowerCase().includes(normalizedQuery) ||
        card.set.toLowerCase().includes(normalizedQuery)) &&
      (rarity === "toutes" || card.rarity === rarity)
  );

  if (state.status === "loading") {
    return (
      <main className="app">
        <p className="hint">Chargement de la collection…</p>
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="app">
        <p className="error">Erreur : {state.message}</p>
        <button type="button" onClick={retry}>Réessayer</button>
      </main>
    );
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Ma collection TCG</h1>
        <Summary cards={cards} />
        <FavoritesCount />
      </header>

      <Panel title="Ajouter une carte">
        <AddCardForm onAdd={addCard} />
      </Panel>

      {selectedCard && <CardNotes key={selectedCard.id} card={selectedCard} />}

      <Panel title={`Mes cartes (${visibleCards.length} / ${cards.length})`}>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          rarity={rarity}
          onRarityChange={setRarity}
        />
        <CardGrid
          cards={visibleCards}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onQuantityChange={changeQuantity}
          onRemove={removeCard}
        />
      </Panel>
    </main>
  );
}