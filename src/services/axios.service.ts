import axios from 'axios';

export const Oauth = async (data) => {
  const { social_type, access_token } = data;
  const loginTypeMap = {
    kakao: kakaoLogin,
    google: googleLogin,
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
    const { nickname: user_name, profile_image: profile_url } =
      response.data.properties;
    return { socialId, type: 'kakao', user_name, profile_url };
  } catch (err) {
    return err;
  }
};

const googleLogin = async (token) => {
  try {
    const response = await axios.get(process.env.GOOGLE_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const {
      id: socialId,
      name: user_name,
      picture: profile_url,
    } = response.data;
    return { socialId, type: 'google', user_name, profile_url };
  } catch (err) {
    return err;
  }
};
