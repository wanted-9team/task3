import useScrollToggle from 'hooks/useScrollToggle'
import styled from 'styled-components'
import { HiArrowUp } from 'react-icons/hi'

const TopButton = () => {
  const scrollFlag = useScrollToggle(false)
  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return scrollFlag ? (
    <TopButtonLayout onClick={moveToTop}>
      <TopButtonIcon></TopButtonIcon>
    </TopButtonLayout>
  ) : (
    <></>
  )
}

const TopButtonIcon = styled(HiArrowUp)`
  width: 20px;
  height: 20px;
  color: blue;
`

const TopButtonLayout = styled.div`
  position: fixed;
  ${({ theme }) => theme.flex};
  bottom: 24px;
  right: 24px;
  width: 48px;
  height: 48px;
  background-color: ${({ theme }) => theme.white};
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, 0.1);
`

export default TopButton
