import React from 'react';
import styled from 'styled-components'
import Refresh from './Refresh';

type PortSelectProps = {
    onRefresh: () => void;
    onChange: (port: string) => void; 
    ports: string[];
}

export default function PortSelect({onRefresh, onChange, ports}: PortSelectProps) {
    return(
        <Container>
            <select onChange={e => onChange(e.target.value)} defaultValue = "Select serial port">
                <option value="" hidden>Select serial port</option>
                {typeof ports !== 'undefined' && ports.map((p, i) => {
                return <option key={i} value={p}>{p}</option>
                })}
            </select>
            <Refresh onClick={onRefresh}/>
        </Container>
    )
}

const Container = styled.span`
    display: flex;
    align-items: center;
`