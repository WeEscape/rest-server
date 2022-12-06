# 요청별 API 문서
`get` , `post` , `put` , `delete`

## Auth

<details>
<summary>Signup</summary>
<div markdown="1">       
  
  ### Request

  ```jsx
  POST
  /auth/signup HTTP/1.1

  {
    access_token : 'token',
    social_type : 'kakao,google,apple'
  }
  ```

  ### Response

  ```jsx
  Success

  {
    data: {
      social_id: string,
      user_name: string,
      social_type: string,
      profile_img: string,
      profile_color: null,
    }
  }

  Faild

  {
    Error: parameter
  }
  ```
  </div>
  </details>
