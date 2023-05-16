export const truncateWalletAddress = (text: string, chars = 6) => {
  const firstPart = text.slice(0, 2 + chars);
  const lastPart = text.slice(-chars);
  return `${firstPart}....${lastPart}`;
};
