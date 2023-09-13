# dyno-english
![dyno-english](public/images/image-dyno-english-full.webp)

## 소개
- 하남시 미사에 위치한 [다이노 영어](https://naver.me/FNuOZAku)의 웹사이트입니다.
- 다이노 영어의 운영에 필요한 기능들을 구현한 프로젝트입니다.

## 기술 스택
[![Tech stacks](https://skillicons.dev/icons?i=ts,nextjs,vercel,firebase,styledcomponents)](https://skillicons.dev)

## 아키텍쳐

## 파일 구조


## 구현 기능
- 다이노 영어의 회원은 `관리자`와 `일반 회원(학부모)`으로 나뉩니다.
- `관리자`는 `일반 회원`의 정보를 관리할 수 있습니다.
- `관리자`는 수업 정보, 수업 커리큘럼, 공지사항 등을 관리할 수 있습니다.
- `일반 회원`은 수업의 공지사항 및 숙제를 확인할 수 있습니다.
- `일반 회원`은 자녀 정보를 확인 및 수정할 수 있습니다.

### [지도](https://github.com/gouz7514/dyno-english/tree/develop/src/app/intro/map)
- 비회원과 회원 모두 확인할 수 있는 지도입니다.
- 다이노 영어를 찾아오는 길을 안내하는 페이지입니다.
- [네이버 지도 API](https://navermaps.github.io/maps.js.ncp/)를 활용해 구현했습니다.

### [회원 가입](https://github.com/gouz7514/dyno-english/blob/develop/src/lib/auth.ts#L80)
- `nextAuth`와 `firebase`를 활용해 구현했습니다.
- 회원 정보는 google cloud platform과 firestore에 저장됩니다.
- 카카오 로그인을 활용했으며 카카오 id를 기반으로 firebase에 회원 정보를 생성합니다.

### 후기 작성

### 회원 정보 수정

### 회원 관리

### 수업 관리

### 커리큘럼 관리

### 공지사항 관리

### 시간표 관리