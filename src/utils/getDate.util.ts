export const getDate = async (expired: string) => {
  const createDate = new Date();
  const expiredDate = new Date(createDate.setDate(createDate.getDate() + 14));
  const getDate = expired ? expiredDate : createDate;
  const year = getDate.getFullYear();
  const month = getDate.getMonth();
  const date = getDate.getDate();
  const hours = getDate.getHours();
  const minutes = getDate.getMinutes();
  const seconds = getDate.getSeconds();

  const resultDate = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
  return resultDate;
};
