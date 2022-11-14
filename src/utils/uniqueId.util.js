export const createRandomId = () => {
  return Math.floor(Math.random() * Date.now()).toString(16);
};
