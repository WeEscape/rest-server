export const getDate = async (expired) => {
  const createDate = new Date();
  const year = createDate.getFullYear();
  const month = createDate.getMonth();
  const date = createDate.getDate();
  const hours = createDate.getHours();
  const minutes = createDate.getMinutes();
  const seconds = createDate.getSeconds();

  const resultDate = `${year}-${month + 1}-${expired ? date + 14 : date} ${hours}:${minutes}:${seconds}`;
  return resultDate;
};
