export const convertCount = (count: number | undefined): string => {
  if (count === undefined) return '0 개';
  if (count >= 10000) {
    return `${count / 10000} 만`;
  }
  return `${count} 개`;
};
