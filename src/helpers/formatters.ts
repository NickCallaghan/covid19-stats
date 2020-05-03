export const formatNumber = (unformattedNumber: number) => {
  const formattedNumber = new Intl.NumberFormat("en-GB").format(
    unformattedNumber
  );
  return formattedNumber;
};

export const dateUTCtoLocaleString = (utcDate: string) => {
  const date = new Date(utcDate);
  return date.toLocaleDateString();
};
