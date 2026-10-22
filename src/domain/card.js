export const RARITIES = Object.freeze(["commune", "peu-commune", "rare", "ultra-rare"]);
export const SETS = Object.freeze(["Set de Base", "Jungle", "Fossile"]);

export const SAMPLE_CARDS = Object.freeze([
  { id: "1", name: "Dracaufeu", set: "Set de Base", rarity: "ultra-rare", price: 48.9, quantity: 1 },
  { id: "2", name: "Tortank", set: "Set de Base", rarity: "rare", price: 12.5, quantity: 2 },
  { id: "3", name: "Pikachu", set: "Set de Base", rarity: "commune", price: 0.3, quantity: 4 },
  { id: "4", name: "Ronflex", set: "Jungle", rarity: "ultra-rare", price: 35, quantity: 1 },
  { id: "5", name: "Pyroli", set: "Jungle", rarity: "rare", price: 18.75, quantity: 1 },
  { id: "6", name: "Persian", set: "Jungle", rarity: "peu-commune", price: 1.2, quantity: 3 },
  { id: "7", name: "Ptéra", set: "Fossile", rarity: "rare", price: 9.9, quantity: 0 },
  { id: "8", name: "Amonistar", set: "Fossile", rarity: "peu-commune", price: 0.8, quantity: 2 },
]);

const priceFormatter = new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" });

export function parseRarity(value) {
  return RARITIES.find((rarity) => rarity === value);
}

export function isRare(card) {
  return card.rarity === "rare" || card.rarity === "ultra-rare";
}

export function formatPrice(price) {
  return priceFormatter.format(price);
}

export function copyCount(cards) {
  return cards.reduce((sum, card) => sum + card.quantity, 0);
}

export function collectionValue(cards) {
  return cards.reduce((sum, card) => sum + card.price * card.quantity, 0);
}