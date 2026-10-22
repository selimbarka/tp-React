import { useEffect, useRef } from "react";
import { RARITIES, parseRarity } from "../domain/card";

export function SearchBar({ query, onQueryChange, rarity, onRarityChange }) {
  const inputRef = useRef(null);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onQueryChange("");
      } else if (event.key === "/" && document.activeElement !== inputRef.current) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onQueryChange]);

  function handleClear() {
    onQueryChange("");
    inputRef.current?.focus();
  }

  return (
    <div className="toolbar" role="search">
      <label>
        Recherche
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
      </label>
      <button type="button" onClick={handleClear} disabled={query === ""}>
        Effacer
      </button>
      <label>
        Rareté
        <select
          value={rarity}
          onChange={(e) => onRarityChange(parseRarity(e.target.value) ?? "toutes")}
        >
          <option value="toutes">Toutes</option>
          {RARITIES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>
    </div>
  );
}