import React, { useState } from 'react';
import styled from 'styled-components'

export default function Refresh({onClick}: {onClick: () => void}) {
    const [color, setColor] = useState("#4682b4")
    return(
        <Frame onClick={onClick} onMouseDown={() => setColor("#FFFFFF")} onMouseUp={() => setColor("#4682b4")}>
            <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg">
              <g>
                <title>background</title>
                <rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
              </g>
              <g>
                <title>Layer 1</title>
                <path id="svg_2" fill={color} d="m25.444,4.291c0,0 -1.325,1.293 -2.243,2.201c-4.687,-3.424 -11.292,-3.036 -15.525,1.197c-2.47,2.47 -3.623,5.747 -3.484,8.983l4,0c-0.141,-2.212 0.618,-4.467 2.308,-6.158c2.663,-2.663 6.735,-3.043 9.812,-1.162c-1.042,1.032 -2.245,2.238 -2.245,2.238c-0.841,1.009 0.104,1.592 0.584,1.577l5.624,-0.001c0.297,0 0.539,0.001 0.539,0.001s0.245,0 0.543,0l1.092,0c0.298,0 0.54,-0.243 0.54,-0.541l0,-7.731c0.034,-0.707 -0.742,-1.393 -1.545,-0.604z"/>
                <path id="svg_3" fill={color} d="m6.555,27.709c0,0 1.326,-1.293 2.243,-2.201c4.688,3.424 11.292,3.036 15.526,-1.197c2.47,-2.471 3.622,-5.747 3.484,-8.983l-4.001,0c0.142,2.211 -0.617,4.467 -2.308,6.159c-2.663,2.662 -6.735,3.043 -9.812,1.161c1.042,-1.032 2.245,-2.238 2.245,-2.238c0.841,-1.01 -0.104,-1.592 -0.584,-1.577l-5.624,0.002c-0.297,0 -0.54,-0.002 -0.54,-0.002s-0.245,0 -0.543,0l-1.09,0c-0.298,0 -0.54,0.242 -0.541,0.541l0,7.732c-0.033,0.706 0.743,1.392 1.545,0.603z"/>
              </g>
            </svg>
        </Frame>
    )
}

const Frame = styled.a`
  margin-left: 5px;
  transition: transform .5s ease-in-out;
    &:hover {
      transform: rotate(90deg);
      cursor: pointer;
    }
`