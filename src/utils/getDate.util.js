export const getDate = async () => {
  const createDate = new Date();
  const year = createDate.getFullYear();
  const month = createDate.getMonth();
  const date = createDate.getDate();
  const hours = createDate.getHours();
  const minutes = createDate.getMinutes();
  const seconds = createDate.getSeconds();

  const expiredDate = `${year}-${month}-${
    date + 14
  } ${hours}:${minutes}:${seconds}`;
  return expiredDate;
};
