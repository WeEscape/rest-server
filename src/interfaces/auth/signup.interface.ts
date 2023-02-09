export interface SignupInterface {
  social_id: string;
  social_type: 'kakao' | 'google' | 'apple';
  user_name: string | null;
  profile_img: string | null;
  profile_color: string | null;
}
