export const topCountries = (numResults, data) => {
  const sortedData = [...data];
  sortedData
    .sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
    .splice(numResults, data.length - numResults);
  return sortedData;
};

export const bottomCountries = (numResults, data) => {
  let sortedData = [...data].filter((country) => country.TotalConfirmed > 0);
  sortedData
    .sort((a, b) => a.TotalConfirmed - b.TotalConfirmed)
    .splice(numResults, data.length - numResults);
  return sortedData;
};

export const noCasesCountries = (data) => {
  const filteredData = data.filter((country) => country.TotalConfirmed === 0);
  return filteredData;
};
