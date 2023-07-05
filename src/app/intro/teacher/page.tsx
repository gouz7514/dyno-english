'use client'

import { useState } from "react"

import { ArticleStyle } from "@/app/styles/styles"
import Divider from "@/app/components/Divider"

export default function IntroTeacher() {
  const [isToggled, setIsToggled] = useState<{
    first: boolean;
    second: boolean;
    third: boolean;
  }>({
    first: false,
    second: false,
    third: false,
  })

  const onClickToggle = function(toggleName: keyof typeof isToggled) {
    setIsToggled((prevState) => ({
      ...prevState,
      [toggleName]: !prevState[toggleName],
    }))
  }

  return (
    <ArticleStyle>
      <div className="container">
        <div className="article-title">
          선생님 소개
        </div>
        <div className="article-content">
          <p>
            안녕하세요 :)
          </p>
          <p>
            다이노 영어의
          </p>
          <p>
            다이노 선생님입니다.
          </p>
          <br />
          <p>
            이번 포스팅에서는
          </p>
          <p>
            제 소개를 드리려고 해요.
          </p>
          <br />
          <p>
            그동안 제가 걸어온 길을 
          </p>
          <p>
            크게 세 부분으로 나눠
          </p>
          <p>
            글을 써보도록 하겠습니다.
          </p>
          <Divider short />
          <div className="article-section">
            <div className="section-title toggle" onClick={() => onClickToggle('first')}>
              <h3>1. 미국 초·중학교 졸업</h3>
            </div>
            {
              isToggled.first && (
                <div className="section-content">
                  <p>
                    저는 초등학교 4학년 때
                  </p>
                  <p>
                    부모님과 함께 
                  </p>
                  <p>
                    미국으로 갔습니다.
                  </p>
                  <br />
                  <p>
                    캘리포니아 주,
                  </p>
                  <p>
                    Rancho Cucamonga 라는
                  </p>
                  <p>
                    작은 동네에서
                  </p>
                  <p>
                    John L. Golden Elementary School 과
                  </p>
                  <p>
                    Day Creek Intermediate School 을
                  </p>
                  <p>
                    졸업했어요.
                  </p>
                  <br />
                  <p>
                    미국 학교를 다니면서
                  </p>
                  <p>
                    경험하고 배운 것들을
                  </p>
                  <p>
                    늘 제 수업에 적용하고
                  </p>
                  <p>
                    학부모님과 나누고자
                  </p>
                  <p>
                    노력하고 있습니다.
                  </p> 
                </div>
              )
            }
          </div>
          <div className="article-section">
            <div className="section-title toggle" onClick={() => onClickToggle('second')}>
              <h3>
                2. 영문학 전공 · 교직이수
              </h3>
            </div>
            {
              isToggled.second && (
                <div className="section-content">
                  <p>
                  저는 동국대학교에서
                  </p>
                  <p>
                  영어영문을 전공하고
                  </p>
                  <p>
                  교직 과정을 이수했습니다.
                  </p>
                  <br />
                  <p>
                    대학 생활을 하면서
                  </p>
                  <p>
                    전공 지식을 
                  </p>
                  <p>
                    쌓는 것도 중요했지만,
                  </p>
                  <p>
                    무엇보다 값진 경험은
                  </p>
                  <p>
                    교육 봉사 활동이었어요.
                  </p>
                  <br />
                  <p>
                    교육 봉사를 하면서
                  </p>
                  <p>
                    저는 교육이 단지 지식을 
                  </p>
                  <p>
                    전달하는 게 아니라는 걸 
                  </p>
                  <p>
                    알게 되었습니다.
                  </p>
                  <br />
                  <p>
                    저에게 교육은
                  </p>
                  <p>
                    사람과 사람 간의 
                  </p>
                  <p>
                    만남이었고,
                  </p>
                  <br />
                  <p>
                    이러한 만남을 통해
                  </p>
                  <p>
                    서로의 세계를 이해하고 
                  </p>
                  <p>
                    나누며 더 넓혀갈 수 
                  </p>
                  <p>
                    있다는 것을 배웠어요.
                  </p>
                  <br />
                  <p>
                    아이들은 저에게 가장 큰 
                  </p>
                  <p>
                    자극과 에너지를 
                  </p>
                  <p>
                    주는 존재입니다.
                  </p>
                  <br />
                  <p>
                    그리고 아이들에게도
                  </p>
                  <p>
                    늘 긍정적인 영향을 주는
                  </p>
                  <p>
                    선생님으로 남고 싶어요.
                  </p>
                </div>
              )
            }
          </div>
          <div className="article-section">
            <div className="section-title toggle" onClick={() => onClickToggle('third')}>
              <h3>
                3. 다양하고 실질적인 경험
              </h3>
            </div>
            {
              isToggled.third && (
                <div className="section-content">
                  <p>
                    다이노 영어를
                  </p>
                  <p>
                    시작하기까지 
                  </p>
                  <p>
                    긴 여정이 있었습니다.
                  </p>
                  <br />
                  <p>
                    대학을 졸업한 후,
                  </p>
                  <p>
                    임용 시험 준비부터
                  </p>
                  <p>
                    영어 유치원과 학원
                  </p>
                  <p>
                    그리고 사무직까지
                  </p>
                  <p>
                    다양한 경험을 했습니다.
                  </p>
                  <br />
                  <p>
                    돌고 돌아 
                  </p>
                  <p>
                    결국 아이들을
                  </p>
                  <p>
                    가장 가까이서 만날 수 있는
                  </p>
                  <p>
                    일을 선택하게 되었지만,
                  </p>
                  <p>
                    그 경험들이 결코
                  </p>
                  <p>
                    헛된 것은 아니었어요.
                  </p>
                  <br />
                  <p>
                    임용 시험을 준비하면서
                  </p>
                  <p>
                    교육학적 지식을
                  </p>
                  <p>
                    더 심화시킬 수 있었고,
                  </p>
                  <br />
                  <p>
                    영어 유치원에서는
                  </p>
                  <p>
                    4세부터 7세까지
                  </p>
                  <p>
                    어린 아이들을
                  </p>
                  <p>
                    다루는 법을 배웠습니다.
                  </p>
                  <br />
                  <p>
                    학원에서는
                  </p>
                  <p>
                    초등학생뿐만 아니라
                  </p>
                  <p>
                    학교 내신과 수능 대비
                  </p>
                  <p>
                    수업까지 맡았으며,
                  </p>
                  <br />
                  <p>
                    교육 회사에서는
                  </p>
                  <p>
                    교재 및 온라인 콘텐츠를
                  </p>
                  <p>
                    제작하는 일을 배웠어요.
                  </p>
                  <br />
                  <p>
                    이렇게 다양한 현장에서의
                  </p>
                  <p>
                    경험을 토대로
                  </p>
                  <p>
                    저만의 가치가 녹아든
                  </p>
                  <p>
                    다이노 영어를
                  </p>
                  <p>
                    시작하게 되었습니다.
                  </p>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </ArticleStyle>
  )
}