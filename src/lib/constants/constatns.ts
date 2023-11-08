export const DropdownIntro = [
  {
    title: '공부방 소개',
    link: '/intro/place'
  },
  {
    title: '선생님 소개',
    link: '/intro/teacher'
  },
  {
    title: '소중한 후기',
    link: '/intro/testimonial'
  },
  {
    title: '오시는 길',
    link: '/intro/map'
  }
]

export const DropdownCurriculumn = [
  {
    title: '파닉스',
    link: '/curriculum/phonics'
  },
  {
    title: '원서리딩',
    link: '/curriculum/reading'
  },
  {
    title: '라이팅',
    link: '/curriculum/writing'
  }
]

export const DropdownStudy = [
  {
    title: '시간표',
    link: '/study/schedule'
  },
  {
    title: '수업료',
    link: '/study/price'
  }
]

export const CurriculumReading = [
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-1.webp',
    alt: '커리큘럼 리딩 이미지 1',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-2-1.webp',
    alt: '커리큘럼 리딩 이미지 2-1',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-2-2.webp',
    alt: '커리큘럼 리딩 이미지 2-2',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-2-3.webp',
    alt: '커리큘럼 리딩 이미지 2-3',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-2-4.webp',
    alt: '커리큘럼 리딩 이미지 2-4',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-2-5.webp',
    alt: '커리큘럼 리딩 이미지 2-5',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-2-6.webp',
    alt: '커리큘럼 리딩 이미지 2-6',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-2-7.webp',
    alt: '커리큘럼 리딩 이미지 2-7',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-2-8.webp',
    alt: '커리큘럼 리딩 이미지 2-8',
    section: 2
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-3-1.webp',
    alt: '커리큘럼 리딩 이미지 3-1',
    section: 3
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-3-2.webp',
    alt: '커리큘럼 리딩 이미지 3-2',
    section: 3
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-3-3.webp',
    alt: '커리큘럼 리딩 이미지 3-3',
    section: 3
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-3-4.webp',
    alt: '커리큘럼 리딩 이미지 3-4',
    section: 3
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-3-5.webp',
    alt: '커리큘럼 리딩 이미지 3-5',
    section: 3
  },
  {
    src: '/images/curriculum/image-dyno-curriculum-reading-3-6.webp',
    alt: '커리큘럼 리딩 이미지 3-6',
    section: 3
  },
]

export const Hours = {
  '오전 12시' : 0,
  '오전 1시' : 1,
  '오전 2시' : 2,
  '오전 3시' : 3,
  '오전 4시' : 4,
  '오전 5시' : 5,
  '오전 6시' : 6,
  '오전 7시' : 7,
  '오전 8시' : 8,
  '오전 9시' : 9,
  '오전 10시' : 10,
  '오전 11시' : 11,
  '오후 12시' : 12,
  '오후 1시' : 13,
  '오후 2시' : 14,
  '오후 3시' : 15,
  '오후 4시' : 16,
  '오후 5시' : 17,
  '오후 6시' : 18,
  '오후 7시' : 19,
  '오후 8시' : 20,
  '오후 9시' : 21,
  '오후 10시' : 22,
  '오후 11시' : 23,
}

export const Minutes = {
  '00분' : 0,
  '10분' : 10,
  '20분' : 20,
  '30분' : 30,
  '40분' : 40,
  '50분' : 50,
}

const TITLE = {
  home: '다이노 영어',
  introMap: '오시는 길',
  introTeacher: '선생님 소개',
  introTestimonial: '소중한 후기',
}

const DESCRIPTION = {
  home: '다이노 영어와 함께 영어를 배워보세요!',
  introMap: '다이노 영어 공부방 오시는 길입니다.',
  introTeacher: '다이노 선생님을 소개합니다.',
  introTestimonial: '다이노 영어의 소중한 후기를 소개합니다.',
}

const extendTitle = (title: string) => `${TITLE.home} | ${title}`

export const METADATA = {
  home: {
    title: TITLE.home,
    description: DESCRIPTION.home,
    openGraph: {
      title: TITLE.home,
      description: DESCRIPTION.home,
      type: 'website',
      images: [
        {
          url: 'https://dynoenglish.com/logo/og_dyno_english.png',
          width: 1200,
          height: 849,
          alt: '다이노 영어',
        }
      ],
      url: 'https://dynoenglish.com',
      locale: 'ko_KR',
    }
  },
  introMap: {
    title: extendTitle(TITLE.introMap),
    description: DESCRIPTION.introMap,
    openGraph: {
      title: extendTitle(TITLE.introMap),
      description: DESCRIPTION.introMap,
    }
  },
  introTeacher: {
    title: extendTitle(TITLE.introTeacher),
    description: DESCRIPTION.introTeacher,
    openGraph: {
      title: extendTitle(TITLE.introTeacher),
      description: DESCRIPTION.introTeacher,
    }
  },
  introTestimonial: {
    title: extendTitle(TITLE.introTestimonial),
    description: DESCRIPTION.introTestimonial,
    openGraph: {
      title: extendTitle(TITLE.introTestimonial),
      description: DESCRIPTION.introTestimonial,
    }
  },
}