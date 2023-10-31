# dyno-english
![dyno-english](public/images/image-dyno-english-full.webp)

## 소개
- 개발 기간 : 2023.06.14 ~ 2023.10.27 (약 4개월)
- 하남시 미사에 위치한 [다이노 영어](https://naver.me/FNuOZAku)의 웹사이트입니다.
- 다이노 영어의 운영에 필요한 기능들을 구현한 프로젝트입니다.
- 구현 기능들은 [여기](/docs/구현_기능.md) 에서 확인할 수 있습니다.

## 설치 및 실행
**패키지 설치**
```bash
yarn
```

**개발 서버를 실행 및 로컬 환경 접속**
```bash
yarn dev

localhost:3306
```

> **참고**<br />
로컬 환경에서 실행하기 위해서는 db와 연결을 위한 firebase api key, 카카오 로그인을 위한 kakao client id 등이 저장된 `.env` 파일이 필요합니다.<br />
보안 상 이슈로 위 파일은 제공되지 않으며 궁금하신 점이 있는 경우 [issue](https://github.com/gouz7514/dyno-english/issues) 혹은 [메일](mailto:gouz7514@gmail.com)으로 문의해주시길 바랍니다!

## 기술 스택
[![Tech stacks](https://skillicons.dev/icons?i=ts,nextjs,vercel,firebase,styledcomponents)](https://skillicons.dev)

## 아키텍쳐
![infrastructure](public/images/image-infrastructure.png)
- NextJS와 firebase를 활용했습니다.
- 카카오톡을 기반으로 회원가입을 구현했으며 NextAuth를 사용했습니다.
- 회원 정보, 수업 정보, 후기 등 다이노 영어의 운영에 필요한 데이터는 firestore에 저장됩니다.
  
## 파일 구조
- 크게 `app`, `firebase`, `lib`, `types` 폴더로 나뉩니다.
- `app`
  - `components` : **아토믹 디자인 패턴**을 기반으로 컴포넌트들을 구성했습니다. (참고한 글 : [카카오 FE 기술블로그](https://fe-developers.kakaoent.com/2022/220505-how-page-part-use-atomic-design-system/))
  - NextJs의 [app router](https://nextjs.org/docs/app/building-your-application/routing)를 기반으로 한 페이지 구조를 따릅니다.
- `firebase` : NextJS와 firebase를 연결하기 위한 config 디렉토리입니다.
- `lib` : 자주 사용되는 함수(`utils`), 프로젝트에 사용되는 상수(`constants`) 등을 모아놓은 디렉토리입니다.
- `types` : 프로젝트에서 사용되는 타입 정의를 모아놓은 디렉토리입니다.