export function formatPrice(price) {
  const value = typeof price === "number" ? price : Number(price);
  return value ? `$${value.toFixed(2)}` : "Ask for price";
}
