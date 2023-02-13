import { OauthInterface } from './../interfaces/auth/oauth.interface';
import axios from 'axios';

export const Oauth = async (data: OauthInterface) => {
  const { social_type, access_token } = data;

  const login =
    social_type === 'kakao'
      ? await kakaoLogin(access_token)
      : await googleLogin(access_token);

  return login;
};

const kakaoLogin = async (token: string) => {
  try {
    const url = process.env.KAKAO_URL || '';
    const response = await axios.get(url, {
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

const googleLogin = async (token: string) => {
  try {
    const url = process.env.GOOGLE_URL || '';
    const response = await axios.get(url, {
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
