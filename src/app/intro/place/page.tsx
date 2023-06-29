import { ArticleStyle } from "@/app/styles/styles"
import Image from 'next/image'

export default function IntroPlace() {
  return (
    <ArticleStyle>
      <div className="container">
        <div className="article-title">
          공부방 소개
        </div>
        <div className="article-content">
          <p>
            안녕하세요
          </p>
          <p>
            <span className="text-bold">하남 미사중앙초</span> 건너편에 위치한
          </p>
          <p>
            다이노영어 입니다.
          </p>
          <div className="spacing"></div>
          <p>
            다이노영어는 <span className="text-bold">소수정예</span> 맞춤식 
          </p>
          <p>
            <span className="text-bold">유·초등 영어 그룹과외</span> 공부방입니다.
          </p>
          <div className="spacing"></div>
          <p>
            <span className="text-bold">영어를 처음 시작</span>하는 친구들을 위한 수업부터
          </p>
          <p>
            영어유치원 학생들과 유학생들을 위해
          </p>
          <p>
            <span className="text-bold">100% 영어로 진행</span>하는 수업까지
          </p>
          <p>
            다양한 커리큘럼이 준비되어 있습니다.
          </p>
          <div className="spacing"></div>
          <Image
            src="/images/intro/image-dyno-intro-place.webp"
            alt="다이노영어 공부방 소개"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%' }}
          />
          <h3>교육 상담 문의</h3>
          <h3>네이버 톡톡 <span className="text-normal">또는</span> 전화통화로</h3>
          <h3>가능합니다.</h3>
          <div className="spacing"></div>
          <h3>
            평일 10:00~18:00
          </h3>
          <h3>TEL 010-3306-3487</h3>
          <div className="spacing"></div>
          <p>
            수업 중에는 통화가 어려울 수 있습니다.
          </p>
          <p>
            네이버 톡톡으로 메시지와 연락처를 남겨주시면
          </p>
          <p>
            최대한 빠르게 연락드리겠습니다.
          </p>
        </div>
      </div>
    </ArticleStyle>
  )
}