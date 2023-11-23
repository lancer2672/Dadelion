export function formatNamesWithAnd(names) {
  if (names.length === 1) {
    return names[0];
  } else {
    const lastName = names.slice(-1).join("");
    return `${lastName} and others`;
  }
}
