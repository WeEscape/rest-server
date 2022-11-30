export const checkRequestHeader = async (req) => {
  const request_header = req.headers['authorization'];
  const result = request_header.split(' ')[1];

  return result;
};
