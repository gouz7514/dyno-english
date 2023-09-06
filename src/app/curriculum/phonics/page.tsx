import { ArticleStyle } from "@/app/styles/styles"
import Image from 'next/image'

export default function CurriculmPhonics() {
  return (
    <ArticleStyle>
      <div className="container">
        <div className="article-title">
          [수업 안내] 파닉스 - Level K
        </div>
        <div className="article-content">
          <p>
            안녕하세요,
          </p>
          <p>
            다이노 영어입니다.
          </p>
          <br />
          <p>
            <span className="text-bold">파닉스 Level K 수업</span>은
          </p>
          <p>
            파닉스 학습을
          </p>
          <p>
            처음 시작하는
          </p>
          <p>
            6세부터 초등 저학년
          </p>
          <p>
            아이들에게 적합합니다.
          </p>
          <br />
          <p>
            정원 4명
          </p>
          <p>
            주 2회 50분
          </p>
          <p>
            월 14만원
          </p>
          <p>
            수업입니다.
          </p>
          <br />
          <p>
            교재는 미국 원서
          </p>
          <p>
            <span className="text-yellow text-bold">Sadlier Phonics</span>
          </p>
          <p>
            <span className="text-yellow text-bold">Level K</span>를
          </p>
          <p>
            사용합니다.
          </p>
          <br />
          <p>
            교재는 수업료 미포함으로
          </p>
          <p>
            <span className="text-bold">개별적으로 준비해</span>주셔야 합니다.
          </p>
          <Image
            src="/images/curriculum/image-dyno-curriculum-phonics-1.webp"
            alt="커리큘럼 파닉스 이미지 1"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', margin: '24px 0' }}
          />
          <p>
            파닉스 Level K 수업의
          </p>
          <p>
            주요 학습 내용입니다.
          </p>
          <br />
          <p>
            <span className="text-bold">1) 자음</span>
          </p>
          <p>
            <span className="text-bold">2) 단모음 (CVC)</span>
          </p>
          <p>
            <span className="text-bold">3) 장모음 (CVCe)</span>
          </p>
          <p>
            <span className="text-bold">4) Sight Words</span>
          </p>
          <br />
          <p>
            또한 매주 
          </p>
          <p>
            재미있고 다양한
          </p>
          <p>
            영어 동요로
          </p>
          <p>
            일상 생활에 꼭 필요한 
          </p>
          <p>
            어휘 및 표현을
          </p>
          <p>
            자연스럽게
          </p>
          <p>
            배울 수 있습니다.
          </p>
          <Image
            src="/images/curriculum/image-dyno-curriculum-phonics-2.webp"
            alt="커리큘럼 파닉스 이미지 2"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', margin: '24px 0' }}
          />
          <Image
            src="/images/curriculum/image-dyno-curriculum-phonics-3.webp"
            alt="커리큘럼 파닉스 이미지 3"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '100%', margin: '24px 0' }}
          />
        </div>
      </div>
    </ArticleStyle>
  )
}