export const trimByWords = (text: string, maxWords: number): string => {
  const wordLimit = text.trim().split(/\s+/);
  if (wordLimit.length <= maxWords) return text;
  return wordLimit.slice(0, maxWords).join(" ") + ".";
};
