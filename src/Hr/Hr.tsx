import styled from '@emotion/styled'

const Line = styled.div<{ color: string }>`
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 0) -10%,
    ${(props) => props.color} 50%,
    rgba(0, 212, 255, 0) 110%
  );
`

export const Hr = ({ className = '', color = 'rgb(14, 165, 233)', style = {} }) => (
  <Line className={`my-10 opacity-60 ${className}`} color={color} style={style}></Line>
)
