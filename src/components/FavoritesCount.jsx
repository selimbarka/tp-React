import { useFavorites } from "../context/favorites";

export function FavoritesCount() {
  const { favoriteIds } = useFavorites();
  const count = favoriteIds.length;
  return <p className="summary">★ {count} favori{count > 1 ? "s" : ""}</p>;
}