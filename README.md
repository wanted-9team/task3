# 원티드 프리온보딩 6차 3차 과제

## 9팀 소개

| <img src="https://avatars.githubusercontent.com/u/92010078?v=4"/> | <img src="https://avatars.githubusercontent.com/u/92101831?v=4"/> | <img src="https://avatars.githubusercontent.com/u/69101321?v=4"/> | <img src="https://avatars.githubusercontent.com/u/85508157?v=4"/> | <img src="https://avatars.githubusercontent.com/u/97271725?v=4"> |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| <a href="https://github.com/many-yun">[팀장] 김다윤</a>           | <a href="https://github.com/blcklamb">김채정</a>                  | <a href="https://github.com/jaehyeon74">박재현</a>                | <a href="https://github.com/sacultang">오영재</a>                 | <a href="https://github.com/jungdeokwoo">정덕우</a>              |

## 과제 설명

원티드 프리온보딩 프론트엔드 기업협업과제 - **영화 트레일러 사이트 만들기**

[👉 선발 과제 관련 링크](https://task3-phi.vercel.app/)

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

- ### 공통
  - ☑ Loading 상태 표기
    - react-query의 isLoading 과 isFetching 값에 따라 Loading 여부를 표기 하였습니다
  - ☑ Infinite scroll
    - react-query의 useInfiniteQuery를 이용하여 무한스크롤을 구현하였습니다.
    - intersectionObserver로 참조하는 요소가 화면에 들어올시 useInfiniteQuery에서 제공하는 fetchNextPage를 호출하여 다음 페이지를 호출 할 수 있습니다.
    - getNextPageParam의 lastPage에는 마지막에 호출된 페이지의 데이터가 담겨 있고, allPages에는 호출 한 모든 페이지의 데이터가 담겨 있습니다.
    - getNextPageParam에서 리턴되는 값이 다음페이지가 호출될때 사용되는 pageParam값으로 사용 됩니다.
  - ☑ 쓰로틀링을 적용하여 특정 시간 동안 스크롤 이벤트를 한 번만 감지하여 ScrollUp button 표시되도록, 누를 시 최상단으로 스크롤 이동
  - ☑ Nav 바 반응형 화면 구현
  - ☑ API Response 데이터 캐쉬
    useQuery라고 하는 훅을 이용해 호출할 시 전달되는 옵션으로 staletime과 cachetime을 보낼 수 있는데
    - staletime : 전달받은 데이터는 리엑트 쿼리의 자료구조 내용 중 캐시에 저장이 되는데, 이때 이 캐시데이터의 "신선한 상태" 가 언제까지 될지를 말해주는 옵션이다. default는 0으로, 받아오는 즉시 stale하다고 판단하며 캐싱 데이터와 무관하게 계속해서 feching을 진행한다
    - cachetime : 캐시 구조에 저장된 데이터는 메모리상에 존재하게 된다. 이 때, 메모리에 저장되어 있는 캐시 데이터가 언제까지 유지될지를 말해주는 옵션이다. 즉, 캐싱된 쿼리의 결과값은 계속 유지되는 것이 아니라 시간이 지나면 메모리에서 사라진다. 쉽게 말해 contextAPI에 빗대자면 Provider의 value 내부에 저장된 객체내부 구조에서 존재했다가 사라지는 것과 비슷한 현상이다.
      이와같이 react-query로 받아온 데이터를 caching 하고, 데이터를 받아오는 과정에서 cachingTime을 정해주어 활용하였습니다
- ### notion을 통한 각자 작업과정 공유

  <img width="1408" alt="스크린샷 2022-09-08 오전 10 50 32" src="https://user-images.githubusercontent.com/97271725/189015770-c9461a4c-6578-48bc-9e1d-ea8e0b9a8c93.png">

  - 노션의 작업페이지를 통해 내가 현재 진행하고 있는 부분에 대하여 작업을 공유하거나, 블로커 요소들을 함께 공유하면서 작업을 하였습니다.

  - 또한 작업중 변경사항이나 알려주어야 하는 부분들에 있어서도 페이지에서 함께 공유하였습니다.

## 레포지토리 구조

### 기술 스택

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>

<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>

<img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/>

<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=React-query&logoColor=white"/>

- 선택 이유:
  - #### styled-component
  - 컴포넌트 이름을 가독성 좋게 구성할 수 있기 때문에 유지 보수에 좋습니다.
  - 컴포넌트 단위로 스타일을 지정해줄 수 있어 재사용성이 높습니다.
  - 컴포넌트의 props를 활용해서 경우에 따른 스타일을 적용시켜 줄 수 있습니다.
  - 클래스나, 태그 중복에 의한 스타일 에러를 막아주기 때문에 일반 css나 scss보다 유용합니다.
  - 기본적으로 scss와 비슷한 문법으로 사용법이 어렵지 않습니다.
  - css-in-js 라이브러리중 가장 널리 쓰이며, 참고할 수 있는 자료가 많습니다.
  - #### react-query
  - react-query 라이브러리를 활용하여 data를 받아오는 과정에서 loading, error 관련 핸들링이 용이합니다.
  - React 어플리케이션 내에서 데이터 패칭, 캐싱, 동기적, 그리고 서버의 상태의 업데이트를 좀 더 용이하기 위해 만들어준다.
  - 기존에는 직접 만들어서 사용했던 기능들을 별도의 옵션으로 지원하여 복잡하고 이해할 수 없는 수많은 코드를 대신 React-Query 로직을 통해 짧은 코드로 대체할 수 있게 되었다.
  - 프로젝트 구조가 기존보다 단순해져 애플리케이션을 유지 보수하기 쉽고, 새로운 기능을 쉽게 구축할 수 있다.

<summary style="font-size:17px">폴더 구조</summary>

```bash
|   App.jsx
|   index.jsx
|
+---api
|       index.js
|
+---components
|       EmptyResult.jsx
|       Footer.jsx
|       Header.jsx
|       Loading.jsx
|       MovieCard.jsx
|       SkeletonCard.jsx
|       TopButton.jsx
|
+---hooks
|       useScrollToggle.js
|
+---pages
|   +---MovieDetail
|   |       MovieDetail.jsx
|   |
|   +---MovieLists
|   |   |   MovieLists.jsx
|   |   |
|   |   ---components
|   |           MovieListPageTitle.jsx
|   |
|   +---MovieMain
|   |   |   MovieMain.jsx
|   |   |
|   |   ---components
|   |           Carousel.jsx
|   |           CarouselItem.jsx
|   |
|   +---PageNotFound
|   |       PageNotFound.jsx
|   |
|   ---SearchResults
|           SearchResults.jsx
|
+---styles
|       GlobalStyle.js
|       Theme.js
|
---utils
        MovieApi.js
        throttle.js

```

</details>

## 코드 컨벤션

[코드 컨벤션](https://github.com/wanted-9team/task3/wiki)
