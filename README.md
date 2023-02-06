
## dobby


## Description
<br>
<br>


## Stack
### 개발
`Expressjs`, `MariaDB`
<br>

### 배포
`Naver-Cloud` , `Docker-compose`, `Nginx`

## Start


## Architecture
<details>
  <summary><h3>프로젝트 구조</h3></summary>

- `api` - 서버요청 로직
- `components` - 공통 컴포넌트
- `config` - 기타 설정   
- `hooks` -  비즈니스 로직
- `pages` - 페이지 루트
- `redux` - 상태관리
- `router` - 경로 설정
- `util` - 기타 함수 
- `views` - 페이지 컴포넌트

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

