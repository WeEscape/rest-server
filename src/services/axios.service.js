import axios from 'axios';

export const Oauth = async (data) => {
  const { social_type, access_token } = data;
  const loginTypeMap = {
    kakao: kakaoLogin,
    google: 'google',
    apple: 'apple',
  };
  const login = await loginTypeMap[social_type](access_token);
  //console.log(login);
  return login;
};

const kakaoLogin = async (token) => {
  try {
    const response = await axios.get(process.env.KAKAO_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { id: socialId } = response.data;
    const { nickname, profile_image } = response.data.properties;
    return { socialId, type: 'kakao', nickname, profile_image };
  } catch (err) {
    return err;
  }
};
