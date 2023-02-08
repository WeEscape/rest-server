## Start

```java
git clone
npm install
npm run start // localhost:8080
```


## 폴더구조
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
