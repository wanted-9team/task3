import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import CarouselItem from './CarouselItem'

const RECOMMEND_MOVIE_LIST = [
  {
    backdrop_path: '/hMtxCEJjSD8NNK8J8qawe41iQ00.jpg',
    overview:
      '자고 일어나면 다른 사람이 되는 남자가 있다. 매일 국적, 성별, 나이를 넘나드는 남자, 우진은 정체를 드러내지 않고 가구 디자이너로서 살아왔다. 그러던 어느 날, 가구 판매점에서 이수라는 여자를 만난 우진은 처음 사랑이라는 감정을 느낀다. 항상 다른 모습으로 그녀를 지켜보던 우진은 이수에게 데이트 신청을 한다. 설레는 첫 데이트 이후 그는 잠을 자지 않고 모습을 유지하기 위해 노력한다. 우진은 며칠간 보통 사람 같은 행복한 시간을 보내지만, 결국 잠이 들어 다른 모습으로 변해버리고 만다. 그녀 곁을 맴돌던 우진은 용기를 내어 비밀을 밝히는데...',
    title: '뷰티 인사이드',
    backgroundColor: 'dark',
    id: 338729,
  },
  {
    backdrop_path: '/7TvehiVjzE9hMvnq94mOYjP8kGT.jpg',
    overview:
      '몰리 건(브리트니 머피 분)은 뉴욕 사교계에서는 인기인이다. 죽은 락계의 전설의 제멋대로인 딸이 바로 몰리다. 그녀의 생일 파티는 유명하며 그녀의 삶 역시 파티의 연속이다. 그러나 몰리의 유산이 회계사에 의해 도둑맞으면서 그녀의 파티도 중단된다. 몰리는 한번도 해보지 못한 직업을 갖게 되는데. 그녀의 절친한 친구 잉그리드(말리 쉘턴 분)와 휴이(도날드 페이슨 분)의 도움으로 고위층의 음악(?) 이사 로마 슈레인(히더 락클리어 분)의 딸을 돌보게 된다. 몰리가 새로 맡게 된 8살난 조숙한 아이 레이 슈레인(다코타 패닝 분)은 가능한 한 완벽하게 살려고 한다. 엄마와 떨어져 살면서, 그녀는 유모들의 방을 돌아다니며 안정되지 못하게 자랐던 탓에 모든 일을 그녀가 다 알아서 하려고 노력한다. 몰리는 결코 책임감있는 어른은 아니다. 레이는 그 어린 어깨에 세상의 모든 짐을 짊어지고 있는 아이이다. 그들은 그들의 나이에 맞게 행동하는 법을 서로에게 가르치려 한다.',
    title: '업타운 걸스',
    backgroundColor: 'light',
    id: 14926,
  },
  {
    backdrop_path: '/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg',
    overview: `범죄와 부정부패를 제거하여 고담시를 지키려는 배트맨. 그는 짐 고든 형사와 패기 넘치는 고담시 지방 검사 하비 덴트와 함께 도시를 범죄 조직으로부터 영원히 구원하고자 한다. 세 명의 의기투합으로 위기에 처한 악당들이 모인 자리에 보라색 양복을 입고 얼굴에 짙게 화장을 한 괴이한 존재가 나타나 배트맨을 죽이자는 사상 초유의 제안을 한다. 그는 바로 어떠한 룰도, 목적도 없는 사상 최악의 악당 미치광이 살인광대 조커. 배트맨을 죽이고 고담시를 끝장내버리기 위한 조커의 광기 어린 행각에 도시는 혼란에 빠지는데...`,
    title: '다크 나이트',
    backgroundColor: 'dark',
    id: 155,
  },
  {
    backdrop_path: '/xVbppM1xgbskOKgOuV8fbWBWHtt.jpg',
    overview: '거대하고, 주목받길 원하고, 미쳤다. 나쁜 기적이라는 것도 있을까?',
    title: '놉',
    backgroundColor: 'dark',
    id: 762504,
  },
  {
    backdrop_path: '/hMtxCEJjSD8NNK8J8qawe41iQ00.jpg',
    overview:
      '자고 일어나면 다른 사람이 되는 남자가 있다. 매일 국적, 성별, 나이를 넘나드는 남자, 우진은 정체를 드러내지 않고 가구 디자이너로서 살아왔다. 그러던 어느 날, 가구 판매점에서 이수라는 여자를 만난 우진은 처음 사랑이라는 감정을 느낀다. 항상 다른 모습으로 그녀를 지켜보던 우진은 이수에게 데이트 신청을 한다. 설레는 첫 데이트 이후 그는 잠을 자지 않고 모습을 유지하기 위해 노력한다. 우진은 며칠간 보통 사람 같은 행복한 시간을 보내지만, 결국 잠이 들어 다른 모습으로 변해버리고 만다. 그녀 곁을 맴돌던 우진은 용기를 내어 비밀을 밝히는데...',
    title: '뷰티 인사이드',
    backgroundColor: 'dark',
    id: 338729,
  },
  {
    backdrop_path: '/7TvehiVjzE9hMvnq94mOYjP8kGT.jpg',
    overview:
      '몰리 건(브리트니 머피 분)은 뉴욕 사교계에서는 인기인이다. 죽은 락계의 전설의 제멋대로인 딸이 바로 몰리다. 그녀의 생일 파티는 유명하며 그녀의 삶 역시 파티의 연속이다. 그러나 몰리의 유산이 회계사에 의해 도둑맞으면서 그녀의 파티도 중단된다. 몰리는 한번도 해보지 못한 직업을 갖게 되는데. 그녀의 절친한 친구 잉그리드(말리 쉘턴 분)와 휴이(도날드 페이슨 분)의 도움으로 고위층의 음악(?) 이사 로마 슈레인(히더 락클리어 분)의 딸을 돌보게 된다. 몰리가 새로 맡게 된 8살난 조숙한 아이 레이 슈레인(다코타 패닝 분)은 가능한 한 완벽하게 살려고 한다. 엄마와 떨어져 살면서, 그녀는 유모들의 방을 돌아다니며 안정되지 못하게 자랐던 탓에 모든 일을 그녀가 다 알아서 하려고 노력한다. 몰리는 결코 책임감있는 어른은 아니다. 레이는 그 어린 어깨에 세상의 모든 짐을 짊어지고 있는 아이이다. 그들은 그들의 나이에 맞게 행동하는 법을 서로에게 가르치려 한다.',
    title: '업타운 걸스',
    backgroundColor: 'light',
    id: 14926,
  },
]

const CAROUSEL_LENGTH = RECOMMEND_MOVIE_LIST.length

const Carousel = () => {
  const [isOnCarousel, setisOnCarousel] = useState(false)
  const isTransition = useRef(false)
  const [currentIndex, setCurrentIndex] = useState(1)

  useEffect(() => {
    if (isOnCarousel) return
    const swipeTimer = setInterval(() => {
      isTransition.current = true
      setCurrentIndex(prev => prev + 1)
    }, 5000)

    return () => clearInterval(swipeTimer)
  })

  const swipeLeft = () => {
    if (currentIndex > 5) return
    isTransition.current = true
    setCurrentIndex(prev => prev + 1)
  }

  const swipeRight = () => {
    if (currentIndex < 0) return
    isTransition.current = true
    setCurrentIndex(prev => prev - 1)
  }

  const switchPage = () => {
    isTransition.current = false
    currentIndex < 0 && setCurrentIndex(4)
    currentIndex >= 5 && setCurrentIndex(1)
  }

  return (
    <CarouselContainer>
      <CarouselWindow
        onMouseEnter={() => setisOnCarousel(true)}
        onMouseLeave={() => setisOnCarousel(false)}
      >
        <CarouselItemList
          width={CAROUSEL_LENGTH}
          translateX={(100 / CAROUSEL_LENGTH) * currentIndex}
          isTransition={isTransition.current}
          onTransitionEnd={() => switchPage()}
        >
          {RECOMMEND_MOVIE_LIST.map((recommendMovie, index) => (
            <CarouselItem
              key={index}
              movieId={recommendMovie.id}
              movieimg={recommendMovie.backdrop_path}
              movietitle={recommendMovie.title}
              movieOverView={recommendMovie.overview}
              backgroundColor={recommendMovie.backgroundColor}
            />
          ))}
        </CarouselItemList>
        <PrevButton onClick={swipeRight}>&lt;</PrevButton>
        <NextButton onClick={swipeLeft}>&gt;</NextButton>
      </CarouselWindow>
    </CarouselContainer>
  )
}

export default Carousel

const CarouselContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const CarouselWindow = styled.div`
  width: 100%;
  max-width: 900px;
  position: relative;
  overflow: hidden;
  cursor: pointer;
`

const CarouselItemList = styled.div`
  display: flex;
  width: ${({ width }) => `${width * 100}%`};

  transition: ${({ isTransition }) => (isTransition ? `all 0.5s` : '')};
  transform: ${({ translateX }) => `translateX(-${translateX}%)`};
`

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  background-color: white;
  height: 100px;
  opacity: 0;
  transition: all 0.3s;
  &:hover {
    opacity: 0.7;
  }
`

const NextButton = styled(PrevButton)`
  right: 0;
`
