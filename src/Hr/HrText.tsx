import styled from '@emotion/styled'
import { ReactNode } from 'react'

const Line = styled.div<{ color: string }>`
  margin-left: -6%;
  &::before,
  &::after {
    position: relative;
    top: 50%;
    width: 6%;
    height: 1px;
    border-radius: 1px;
    background: linear-gradient(90deg, rgba(2, 132, 199, 0) -10%, ${(props) => props.color} 100%);
    border-bottom: 0;
    transform: translateY(50%);
    content: '';
  }
  &:after {
    width: 94%;
    background: linear-gradient(90deg, ${(props) => props.color} -10%, rgba(2, 132, 199, 0) 100%);
  }
`

interface Props {
  className?: string
  color?: string
  children: ReactNode
  description?: ReactNode
  marginTop?: boolean
}

export const HrText = ({
  className = '',
  color = 'rgba(2, 132, 199)',
  children,
  description,
  marginTop = true
}: Props) => (
  <div className={className}>
    <Line
      className={`flex items-center justify-start whitespace-nowrap ${marginTop && 'mt-10'}`}
      color={color}
    >
      <div className="inline-block px-2 font-semibold text-sky-300 text-base uppercase tracking-wide glowing">
        {children}
      </div>
    </Line>
    {description && <div className="mt-2  tracking-wide   font-semibold text">{description}</div>}
  </div>
)
