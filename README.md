# 원티드 프리온보딩 6차 2차 과제

## 9팀 소개

| <img src="https://avatars.githubusercontent.com/u/92010078?v=4"/> | <img src="https://avatars.githubusercontent.com/u/92101831?v=4"/> | <img src="https://avatars.githubusercontent.com/u/69101321?v=4"/> | <img src="https://avatars.githubusercontent.com/u/85508157?v=4"/> | <img src="https://avatars.githubusercontent.com/u/97271725?v=4"> |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| <a href="https://github.com/many-yun">[팀장] 김다윤</a>           | <a href="https://github.com/blcklamb">김채정</a>                  | <a href="https://github.com/jaehyeon74">박재현</a>                | <a href="https://github.com/sacultang">오영재</a>                 | <a href="https://github.com/jungdeokwoo">정덕우</a>              |

## 과제 설명

원티드 프리온보딩 프론트엔드 기업협업과제 - **영화 트레일러 사이트 만들기**

[👉 선발 과제 관련 링크]()

- 수행 기간: 2022년 9월 6일 ~ 9월 8일

## 실행 방법

```
$ git clone https://github.com/wanted-9team/task3
$ cd task3
$ npm install
$ npm start
```

## 라우팅

- `/` : homepage이자 popular 리스트 페이지
- `/now_playing` : now playing page, 상영 중인 영화들
- `/upcoming` : upcoming page, 개봉 예정 영화들
- `/top_rated` : 최고 평점 영화들
- `/movie_detail/:id` : 상세 영화 페이지
- `/search_results` : 영화 검색 결과들 페이지

## 과제 달성 사항 및 해결 방법

- 공통

  - Loading 상태 표기
  - Infinite scroll
  - 스크롤 감지하여 ScrollUp button 표시되도록, 누를 시 최상단으로 스크롤 이동
  - API Response 데이터 캐쉬

- movies

  - 제목, 포스터, 별점 표시
  - 포스터 없는 경우, 대체 이미지 사용

- movie

  - 비디오 있는 경우, 페이지 진입 시 자동으로 비디오 플레이
  - 제목, 포스터, 별점, 제작 연도, 장르 데이터 활용해서 UI 표기

- search
  - 제목, 포스터, 별점
  - 포스터 없는 경우, 대체 이미지 사용

## 레포지토리 구조

### 기술 스택

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

- 선택 이유:
  - 컴포넌트 이름을 가독성 좋게 구성할 수 있기 때문에 유지 보수에 좋습니다.
  - 컴포넌트 단위로 스타일을 지정해줄 수 있어 재사용성이 높습니다.
  - 컴포넌트의 props를 활용해서 경우에 따른 스타일을 적용시켜 줄 수 있습니다.
  - 클래스나, 태그 중복에 의한 스타일 에러를 막아주기 때문에 일반 css나 scss보다 유용합니다.
  - 기본적으로 scss와 비슷한 문법으로 사용법이 어렵지 않습니다.
  - css-in-js 라이브러리중 가장 널리 쓰이며, 참고할 수 있는 자료가 많습니다.

<details>

</details>
<br>
<details>

</details>

</details>
<br>
<details>
<summary style="font-size:17px">폴더 구조</summary>

```
public
  index.html
src
│  App.jsx
│  index.jsx
│
├─api
│   └─index.js
│
├─components
│   ├─Header.jsx (검색창 포함)
│   ├─Loading.jsx
│   ├─MovieCard.jsx
│   └─Footer.jsx
│
├─pages
│   ├─MovieMain
│   │   └─MovieMain.jsx
│   ├─MovieLists
│		│   └─MovieLists.jsx
│   ├─MovieDetail
│		│   └─MovieDetail.jsx
│   └─Search
│       └─Search.jsx
├─styles
│   ├─GlobalStyle.js
│   └─StyleVariables.js / Theme.js
│
└─utils
```

</details>
