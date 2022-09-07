import { css } from 'styled-components'

const theme = {
  black: '#000000',
  white: '#FFFFFF',
  border: '#717171',
  hover: '#fb0',
  navy: '#021e39',

  flex: (direction = 'row', justify = 'center', align = 'center') => `
    display: flex;
    flex-direction: ${direction};
    justify-content: ${justify};
    align-items: ${align};
  `,

  absolute: (top = 'none', right = 'none', bottom = 'none', left = 'none') => `
    position : absolute;
    top: ${top};
    right: ${right};
    bottom: ${bottom};
    left: ${left};
  `,

  headerFont: css`
    font-size: 22px;
    font-weight: 700;
  `,

  normalFont: css`
    font-size: 14px;
    font-weight: 400;
  `,
}

export default theme
