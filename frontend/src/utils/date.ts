export const getOneDaysAgoDate = (): Date => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 3);
  return pastDate;
};

export const getOneMonthAgoDate = (): Date => {
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - 32);
  return pastDate;
};

export const getDateToYYYYDDMM = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const yyyyddmm = `${year}-${month}-${day}`;
  return yyyyddmm;
};
