export function capitalize(word: string): string {
  if (!word) return word; // Verifica que la palabra no esté vacía
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
