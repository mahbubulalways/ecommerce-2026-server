export const generateSlug = (text: string): string => {
  return text
    .toLowerCase() // lowercase
    .trim() // remove extra space
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // space → -
    .replace(/-+/g, "-"); // multiple - → single
};
