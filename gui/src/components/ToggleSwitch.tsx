import React from 'react';
import styled from 'styled-components'

export default function ToggleSwitch({onClick, state}: {onClick: () => void, state: boolean}) {
    return(
        <>
        <Container state={state} onClick={onClick}>
          <Switch state={state} />
        </Container>
        </>
    )
}

const Container = styled.span<{state: boolean}>`
  transition: background-color 0.25s ease-in;
  background-color: ${({state}) => state ? '#ffffff' : "#ffffff"};
  width: 55px;
  height: 20px;
  border-radius: 30px;
  padding: 4px 0;
  border: 0;
  margin-right: 0;
  &:hover{
    cursor: pointer;
  }
`

const Switch = styled.span<{state: boolean}>`
  transition: margin-left 0.25s ease-in, background-color 0.25s ease-in;
  margin-left: ${({state}) => state ? '32px' : '3px'};
  background-color: ${({state}) => state ? '#7BB557' : '#FF7B7B'};
  display: inline-block;
  border-radius: 50px;
  width: 20px;
  height: 20px;
`