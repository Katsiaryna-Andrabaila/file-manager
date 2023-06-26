export const getNameWithoutQuotes = (name) =>
  name
    .trim()
    .split("")
    .filter((el) => el !== '"')
    .join("");
