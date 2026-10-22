import { RARITIES, SETS, parseRarity } from "../domain/card";
import { useRef, useState } from "react";

const EMPTY_DRAFT = { name: "", set: SETS[0], rarity: "commune", price: "", quantity: "1" };

function toNumber(text) {
  return Number(text.trim().replace(",", "."));
}

function validate(draft) {
    
  const errors = [];
  if (draft.name.trim().length < 2) {
    errors.push("Le nom doit contenir au moins 2 caractères.");
  }
  const price = toNumber(draft.price);
  if (draft.price.trim() === "" || !Number.isFinite(price) || price < 0) {
    errors.push("Le prix doit être un nombre positif ou nul.");
  }
  const quantity = Number(draft.quantity);
  if (!Number.isInteger(quantity) || quantity < 1) {
    errors.push("La quantité doit être un entier supérieur ou égal à 1.");
  }
  return errors;
}

export function AddCardForm({ onAdd }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef(null);

  const errors = validate(draft); 

  function update(field, value) {
    setDraft((previous) => ({ ...previous, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (errors.length > 0) return;
    onAdd({
      name: draft.name.trim(),
      set: draft.set,
      rarity: draft.rarity,
      price: toNumber(draft.price),
      quantity: Number(draft.quantity),
    });
    setDraft(EMPTY_DRAFT);
    setSubmitted(false);
    nameRef.current?.focus();

  }

  return (
    <form className="add-form" noValidate onSubmit={handleSubmit}>
      <label>
        Nom
        <input ref={nameRef}  value={draft.name} onChange={(e) => update("name", e.target.value)} />
      </label>
      <label>
        Extension
        <select value={draft.set} onChange={(e) => update("set", e.target.value)}>
          {SETS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
      <label>
        Rareté
        <select
          value={draft.rarity}
          onChange={(e) => update("rarity", parseRarity(e.target.value) ?? "commune")}
        >
          {RARITIES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </label>
      <label>
        Prix
        <input
          inputMode="decimal"
          value={draft.price}
          onChange={(e) => update("price", e.target.value)}
        />
      </label>
      <label>
        Quantité
        <input
          type="number"
          value={draft.quantity}
          onChange={(e) => update("quantity", e.target.value)}
        />
      </label>
      <button type="submit">Ajouter la carte</button>
      {submitted && errors.length > 0 && (
        <ul className="errors error">
          {errors.map((message) => <li key={message}>{message}</li>)}
        </ul>
      )}
    </form>
  );
}