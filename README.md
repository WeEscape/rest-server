
## 📱 도비 dobby (체계적인 가사분담)

집안일 관리 서비스


<img src="https://user-images.githubusercontent.com/87120463/217172577-029cf21a-505e-445d-a7cd-56d440ad1526.png" width=300px height=400px />    <img src="https://user-images.githubusercontent.com/87120463/217172863-b1d268aa-24b9-4185-85c3-4be7bf35128f.png" width=300px height=400px />



## 💬 Description

가정생활을 하며 누가 언제 해당 가사를 했는지 모르고 집안일 관리가 힘들다는 것을 느꼈습니다.<br/> 
빨래와 화장실 청소 등 역할이 분담되어 있는 경우 주기가 있는데 언제해야할 지 알려주어 가정에서 가사 분담을 체계적으로 나눠<br/>
효율적인 집안일을 하기 위해 기획하였습니다. 

## 🛠 Stack

### 개발
`Expressjs`, `JWT`, `MariaDB`
<br>

### 배포
`Naver-Cloud` , `Docker`, `Nginx`

## ✅ Start

```
git clone
git checkout -b develop
git pull origin develop

npm install
npm run statrt
```


## 📔 Architecture
<details>
  <summary><h3>프로젝트 구조</h3></summary>

- `config` - 환경설정 로직
- `middleware` - 로거,유효성검사 로직
- `models` - DB 쿼리 로직   
- `routes` -  라우터 처리 로직
- `services` - 비즈니스 로직
- `utils` - 기타함수

```
dobby
├─ .babelrc
├─ .eslintrc
├─ .gitignore
├─ .prettierrc.json
├─ README.md
├─ package-lock.json
├─ package.json
└─ src
   ├─ app.js
   ├─ config
   │  ├─ app.config.js
   │  ├─ db.configs.js
   │  ├─ jwt.config.js
   │  └─ logger.config.js
   ├─ middleware
   │  ├─ logger.js
   │  └─ validation
   │     └─ validation.js
   ├─ models
   │  ├─ categories.model.js
   │  ├─ database.js
   │  ├─ groups.model.js
   │  ├─ refreshToken.model.js
   │  ├─ tasks.model.js
   │  └─ users.model.js
   ├─ routes
   │  ├─ auth.router.js
   │  ├─ group.router.js
   │  ├─ index.router.js
   │  ├─ task.router.js
   │  └─ user.router.js
   ├─ services
   │  ├─ auth.service.js
   │  ├─ axios.service.js
   │  ├─ categories.service.js
   │  ├─ group.service.js
   │  ├─ jwt.service.js
   │  ├─ task.service.js
   │  └─ user.service.js
   └─ utils
      ├─ checkHeader.utll.js
      ├─ decodeToken.util.js
      ├─ getDate.util.js
      └─ randomString.util.js

```

</details>

## 📚 API


<details>
 <summary><h3>Auth</h3></summary>
  
 <details>
  <summary>로그인</summary><br/>
   
`Request`

  
 ```js
  POST
  /login
  
  {
    "social_id" : string
    "social_type" : string
  }
  ```
   <br/>
  
  `Response`
       <br/>
 ```js
HTTP/1.1 200 OK
  
  {
    "access_token" : string
    "refresh_token" : string
  }
  
 HTTP/1.1 404 Bad Request
 
 {
    "message" : "not defined"
 }
  ```
  
</details>
  <details>
  <summary>회원가입</summary><br/>
   
`Request`

  
 ```js
POST
/auth/signup

{
	social_id : string,
	social_type : "kakao" || "google" || "apple",
	user_name: string || null
	profile_img :	string || null
	profile_color : string || null,
}
  ```
   <br/>
  
  `Response`
       <br/>
 ```js
HTTP/1.1 200 OK

{
	message : "success signup"
}

HTTP/1.1 400 Bad Request

{
	error: user already registered
}
  ```
  
</details>
  <details>
  <summary>토큰 재발급</summary><br/>
   
`Request`

  
 ```js
  POST
  /auth/tokens
  
 {
	header :`Authorization Bearer ${refresh_token}`
 }
  ```
   <br/>
  
  `Response`
       <br/>
 ```js
HTTP/1.1 200 OK
  
  {
    "access_token" : string
    "refresh_token" : string
  }
  
 HTTP/1.1 404 Bad Request
 
 {
    "message" : "not defined"
 }
  ```
  
</details>
</details>

<details>
 <summary><h3>Users</h3></summary>
  

  
  <details>
 <summary>조회</summary><br/>
    
 `Request`
    <br/>
    
```js
GET
/user/profile

{
  "header" :`Authorization Bearer ${access_token}`
}
    
```
    
 `Response`
 <br/>
    
```js
HTTP/1.1 200 OK

{
 	"user_name" : string,
	"profile_url" : string,
	"profile_color" : string,
	"is_connect" : number,
}

HTTP/1.1 404 Bad Request

{
	"message" : "not defined"
}
    
```
    
    
</details>
  <details>
 <summary>수정</summary><br/>
    
 `Request`
    <br/>
    
```js
PUT
/user
    
{
  header :`Authorization Bearer ${access_token}`
  body : {
        "user_name" : string,
        "profile_url" : string,
        "profile_color" : string,
      }
}
    
```
    
 `Response`
 <br/>
    
```js
HTTP/1.1 200 OK

{
  "user_name" : string,
  "profile_url" : string,
  "profile_color" : string,
  "is_connect" : number,
}

HTTP/1.1 404 Bad Request

{
  "message" : "not defined"
}
    
```
    
</details>
  <details>
 <summary>삭제</summary><br/>
    
 `Request`
    <br/>
    
```js
DELETE
/user
    
{
  "header" :`Authorization Bearer ${access_token}`
}
    
```
    
 `Response`
 <br/>
    
```js
HTTP/1.1 200 OK

{
  "message" : "success delete"
}

HTTP/1.1 404 Bad Request

{
  "message" : "not defined"
}
```
</details>
  
</details>

<details>
 <summary><h3>Tasks</h3></summary>
  
<details>
 <summary>할일생성</summary><br/>
      
 `Request`
    <br/>
    
```js
POST
/tasks
  
{
  header :`Authorization Bearer ${access_token}`
  body : {
            "task_title" : string,
            "memo" : string || null,
            "repeat_cycle" : "1D" || "1W" || "1M",
            "end_repeat_at" : string(DateTime) || null
            "excute_at" : string(DateTime)
          }
}
```
    
 `Response`
 <br/>
    
```js
HTTP/1.1 200 OK

{
  "task_id" : string,
  "task_title" : string,
  "memo" : string || null,
  "repeat_cycle" : "1D" || "1W" || "1M",
  "end_repeat_at" : string(DateTime) || null
  "excute_at" : string(DateTime)
  "created_at" : string(DateTime)
}

HTTP/1.1 404 Bad Request

{
	"message" : "not defined"
}

```
</details>
 <details>
 <summary>할일조회</summary><br/>
      
`Request`
    <br/>
    
```js
GET
/tasks

{
  header :`Authorization Bearer ${access_token}`
  params : {
            "tast_id" : string
          }
}
```
    
 `Response`
 <br/>
    
```js
HTTP/1.1 200 OK

{
	"task_id" : string,
	"task_title" : string,
	"memo" : string || null,
	"repeat_cycle" : "1D" || "1W" || "1M",
	"end_repeat_at" : string(DateTime) || null
	"excute_at" : string(DateTime)
	"created_at" : string(DateTime)
}

HTTP/1.1 404 Bad Request

{
	"message" : "not defined"
}

```
</details>
  
  <details>
 <summary>할일수정</summary><br/>
      
`Request`
    <br/>
    
```js
PUT
/tasks
  
{
  header :`Authorization Bearer ${access_token}`
  body : {
            "task_title" : string,
            "memo" : string || null,
         }
}
```
    
 `Response` 
<br/>
    
```js
HTTP/1.1 200 OK

{
  "task_id" : string,
  "task_title" : string,
  "memo" : string || null,
  "repeat_cycle" : "1D" || "1W" || "1M",
  "end_repeat_at" : string(DateTime) || null
  "excute_at" : string(DateTime)
  "created_at" : string(DateTime)
}

HTTP/1.1 404 Bad Request

{
  "message" : "not defined"
}

```
  
</details>
  <details>
 <summary>할일삭제</summary><br/>
    
`Request`
<br/>
    
```js
DELETE
/tasks
  
{
  header :`Authorization Bearer ${access_token}`
  params : {
              "task_id" : string,
           }
}
    
```
    
`Response` 
<br/>
    
```js
HTTP/1.1 200 OK

{
  "message" : success deleted
}

HTTP/1.1 404 Bad Request

{
  "message" : "not defined"
}

```
</details>
</details>
  
<details>
 <summary><h3>Categoiess</h3></summary>
</details>

  
<details>
 <summary><h3>Groups</h3></summary>
</details>

## 🗃 DataBase

### 테이블정보
|table|description|
|-|-|
|Users|회원정보|
|Users_Refresh_Tokens|회원 리프레시 토큰|
|Tasks|할일|
|Gruops|그룹 및 공유|
|Categories|할일 카테고리|
|Dormants_Users|휴면계정|

### ERD
<img width=700px height=500px  src="https://user-images.githubusercontent.com/87120463/217277491-25786889-cddf-4256-a3ee-ecedb587f5c7.png" />

