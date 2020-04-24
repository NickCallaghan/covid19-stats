export const formatNumber = (number) => {
  const formattedNumber = new Intl.NumberFormat("en-GB").format(number);
  return formattedNumber;
};
