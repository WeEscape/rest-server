export const createRandomId = () => {
  return Math.floor(Math.random() * Date.now()).toString(16);
};

export const createInviteCode = () => {
  const randomString = Math.random().toString(32).split('.')[1];
  return randomString;
};
