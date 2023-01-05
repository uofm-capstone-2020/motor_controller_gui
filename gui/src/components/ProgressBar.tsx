import React from 'react';
import styled from 'styled-components'

export default function ProgressBar(
    {step, max, enable}: {step: number, max: number, enable: boolean}
) {
    return(
        <Container>
          {enable && <Progress progress={step/max * 100} />}
        </Container>
    )
}

const Container = styled.div`
    border: 1px solid #ffffff;
    width: 100%;
    height: 25px;
    border-radius: 25px;
`

const Progress = styled.div<{progress: number}>`
    width: ${({progress}) => `${progress}%`}
    background-color: #ffffff;
    height: 100%;
    border-radius: inherit;
    transition: width 0.25s linear;
`