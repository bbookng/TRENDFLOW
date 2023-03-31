export const convertCount = (count: number): string => {
  if (count >= 10000) {
    return `${count / 10000} 만`;
  }
  return `${count} 개`;
};
