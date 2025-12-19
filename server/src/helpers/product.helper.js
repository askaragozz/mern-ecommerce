export function normalizeAttributes(input) {
  if (!input) return [];

  if (Array.isArray(input)) {
    return input.map(a => ({
      key: String(a.key).trim().toLowerCase(),
      value: a.value ?? null,
    }));
  }

  // object => convert to array
  return Object.entries(input).map(([key, value]) => ({
    key: String(key).trim().toLowerCase(),
    value: value ?? null,
  }));
}
