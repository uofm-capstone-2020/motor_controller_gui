import styled from 'styled-components'

export const StyledLabel = styled.p<{ valid: boolean }>`
  color: ${ ({ valid }) => valid ? '#4b90ca' : 'rgba(255, 64, 64, 1)'};
  display: inline-block;
  width: 450px;
  margin-right: 10px;
  &:hover {
    cursor: default;
  }
`

export const StyledUnit = styled.p<{ valid: boolean }>`
  color: ${ ({ valid }) => valid ? '#4b90ca' : 'rgba(255, 64, 64, 1)'};
  display: inline-block;
  min-width: 80px;
  text-align: end;
  font-size: 12px;
  cursor: default;
`

export const StyledInput = styled.input<{ valid: boolean }>`
  background-color: ${ ({ valid }) => valid ? '#545454' : 'rgba(255, 64, 64, 1)'};
  margin-right: 10px;
  width: 100%;
  border: 0;
  padding: 6px;
  box-sizing: border-box;

  &:disabled{
    color: grey;
  }
`

export const Button = styled.button<{ disabled?: boolean, height?: string }>`
  width: 170px;
  height: ${ ({ height }) => height ? 'height' : '45px'};
  padding: 10px 25px;
  border-radius: 30px;
  font-size: 18px;
  background-color: ${ ({ disabled }) => disabled ? 'grey' : '#367AFF'};
  border: 0;
  transition-property: transform;
  transition-duration: 0.3s;
  color: ${ ({ disabled }) => disabled ? '#333333' : 'black'};
  &:focus {
    outline: none;
  }
  &: hover {
    transform: ${ ({ disabled }) => disabled ? '' : 'scale(1.1)'};
    pointer: ${ ({disabled}) => disabled ? '' : 'pointer'};
`