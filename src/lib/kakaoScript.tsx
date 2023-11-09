import Script from 'next/script'

export default function KakaoScript() {
  function kakaoInit() {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY)
  }

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
        integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh"
        crossOrigin='anonymous'
        onLoad={kakaoInit} 
      ></Script>
    </>
  )
}