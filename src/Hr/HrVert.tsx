import styled from '@emotion/styled'

const Line = styled.div`
  background: linear-gradient(
    180deg,
    rgba(2, 0, 36, 0) -5%,
    rgb(14, 165, 233) 50%,
    rgba(0, 212, 255, 0) 105%
  );
`

export const HrVert = ({ className }) => (
  <Line className={`h-full opacity-90 ${className}`} style={{ width: 1.5 }} />
)
