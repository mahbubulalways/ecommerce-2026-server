export const generateSKUFromProductName = (
  productName: string,
  randomLength: number = 8,
): string => {
  const namePart = productName
    .replace(/[^A-Za-z0-9]/g, "")
    .slice(0, 3)
    .toUpperCase();

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let randomPart = "";
  for (let i = 0; i < randomLength; i++) {
    randomPart += chars[Math.floor(Math.random() * chars.length)];
  }

  return `${namePart}${randomPart}`;
};
