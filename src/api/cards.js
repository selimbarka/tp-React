export async function fetchCards() {
  const response = await fetch("http://localhost:3001/cards");
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}