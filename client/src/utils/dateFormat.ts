export const isoToFrDateFormat = (isoDate: string) => {
  const date = new Date(isoDate);
  const formattedDate = date.toLocaleDateString("fr-FR").split("/").join("-");
  return formattedDate;
};
