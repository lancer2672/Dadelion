export function formatNamesWithAnd(names) {
  if (names.length === 1) {
    return names[0];
  } else if (names.length === 2) {
    return `${names[0]} và ${names[1]}`;
  } else {
    const lastTwoNames = names.slice(-2).join(" và ");
    const otherNames = names.slice(0, -2).join(", ");
    return `${otherNames}, ${lastTwoNames}`;
  }
}
