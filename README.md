<div align='center'>

## 📱 DOBBY

 <br>
<img src="https://user-images.githubusercontent.com/87120463/217172577-029cf21a-505e-445d-a7cd-56d440ad1526.png" width=250px height=300px /> &nbsp&nbsp&nbsp&nbsp  <img src="https://user-images.githubusercontent.com/87120463/217172863-b1d268aa-24b9-4185-85c3-4be7bf35128f.png" width=250px height=300px />
	
### 가정 내 업무 분담을 위한 일정 관리 iOS 앱 
	
</div> <br>


- <b>기 간</b> : 2023.02 ~ 2023. 03

- <b>인 원</b> : 팀 프로젝트

<br>

## 순서

- 프로젝트 설명
- 주요기술
- API
- ERD 설계
- 아키텍처
- 트러블슈팅

<br>

## 1. 프로젝트 설명

<br>

- 가정 생활에서 가사 분담이 효율적으로 이루어지지 않아 불편함을 느꼈습니다.<br/> 
- 이를 해결하기 위해, 빨래와 화장실 청소 등 가사 분담을 체계적으로 나누고 해당 역할을 수행해야 할 시기를 알려줌으로써
- 효율적인 집안일을 하기 위해 기획하였습니다. 

<br>
<br>

## 2. 주요기술

<br>

<b>`Backend`</b>

<br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/87120463/228152411-997de114-7ec1-49b2-8836-41beefca4c4d.png' width='80px' height='90px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/87120463/228154422-7441ec81-5f1a-4b0f-b057-120831686428.png' width='80px' height='90px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/87120463/224654685-bda1eccf-70d1-4702-a313-dc5d24207905.png' width='80px' height='90px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/87120463/228151249-3ad2355e-f3d3-416f-bb50-ee2affd8e846.png' width='80px' height='90px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<br>

<b>`Deploy`</b>

<br>

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/87120463/228156276-3ec2b3bb-3593-4c8b-a7a1-d5db69dd61b5.png' width='80px' height='90px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/87120463/228151229-3612db58-a118-49e8-bd9d-7f955107fccf.png' width='80px' height='90px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src='https://user-images.githubusercontent.com/87120463/228151220-5d7e089e-c077-4a11-8ca2-101e53c57d6e.png' width='80px' height='90px'/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

<br>
<br>

<!-- ## ✅ Start

```
git clone
git checkout -b develop
git pull origin develop

npm install
npm run statrt
``` -->

## 3. API


<details>
 <summary><b>Auth</b></summary>
<br>
  
- ### 로그인 <br>

	


	 ```js
	Request
	
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

	<br>
	<br>
	<br>
  
- ### 회원가입 <br>

	`Request`


	```js
	POST
	/auth/signup

	{
		social_id : string,
		social_type : "kakao" || "google" || "apple",
		user_name: string || null
		profile_img : string || null
		profile_color : string || null,
	}
	```
	
  	`Response`

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

<br>
<br>
<br>

- <b>토큰 재발급</b> <br/>
   
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
  	<br>
	
</details>

<details>
 <summary><b>Users</b></summary>
  

  
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
 <summary><b>Tasks</b></summary>
  
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
 <summary><b>Categoiess</b></summary>
</details>

  
<details>
 <summary><b>Groups</b></summary>
</details>

<br>
<br>

## 4. ERD 설계

|table|description|
|-|-|
|Users|회원정보|
|Users_Refresh_Tokens|회원 리프레시 토큰|
|Tasks|할일|
|Gruops|그룹 및 공유|
|Categories|할일 카테고리|
|Dormants_Users|휴면계정|


<img width=700px height=500px  src="https://user-images.githubusercontent.com/87120463/217277491-25786889-cddf-4256-a3ee-ecedb587f5c7.png" />


<br>
<br>

## 5. 아키텍처

<br>

<details>
  <summary><b>프로젝트 구조</b></summary>

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

<br>
<br>

## 6. 트러블슈팅
