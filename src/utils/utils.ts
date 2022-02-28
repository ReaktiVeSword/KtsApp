export const dateFormat = (date: string) => {
  const dateF: Date = new Date(date);
  return dateF.toDateString();
};
