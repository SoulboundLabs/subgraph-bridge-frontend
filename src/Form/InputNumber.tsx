import styled from '@emotion/styled'

const InputNumberWrapper = styled.input`
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    opacity: 1;
  }
`
export const InputNumber = () => (
  <span className="bg-white">
    <InputNumberWrapper className="w-16" type="number" />
  </span>
)
