export const formatNumber = (number) => {
  const formattedNumber = new Intl.NumberFormat("en-GB").format(number);
  return formattedNumber;
};

export const dateUTCtoLocaleString = (utcDate) => {
  const date = new Date(utcDate);
  return date.toLocaleDateString();
};
