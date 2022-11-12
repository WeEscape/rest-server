export const getDate = async (createDate) => {
  const year = createDate.getFullyear();
  const month = createDate.getMonth();
  const date = createDate.getDate();
  const hours = createDate.getHours();
  const minutes = createDate.getMinutes();
  const seconds = createDate.getSeconds();

  const expiredDate = `${year}-${
    month + 15
  }-${date} ${hours}:${minutes}:${seconds}`;
  return expiredDate;
};
