export function validateTournamentName(name: string) {
  const isEmptyString = !name;
  if (isEmptyString) return false;

  const includesOnlySpaces = !name.trim();
  if (includesOnlySpaces) return false;

  const containsOnlyAcceptedCharacters = /^[a-zA-Z0-9 ]+$/.test(name);
  if (!containsOnlyAcceptedCharacters) return false;

  return true;
}
