export function getHistory() {
  return JSON.parse(localStorage.getItem("history") || "[]");
}