import React, { Component } from "react";
import styled from "styled-components";
import { getFaults, getFaultFlag } from "../modules/faults";

type FaultsProps = {};

type FaultsState = {};

export default class Faults extends Component<FaultsProps, FaultsState> {
  constructor(props: FaultsProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // const fields = get_fields()
    // const selectedLog = fields.length > 0 ? fields[0] : null
    // const log = get_log(selectedLog)
    // this.setState({fields, selectedLog, log})
  }

  render() {
    return (
      <Wrapper>
        <Container>
          {Object.entries(getFaults()).map(
            ([key, { state, description }], i) => {
              return (
                state && (
                  <FaultLabel faulty={true} key={i} title={description}>
                    {key}
                  </FaultLabel>
                )
              );
            },
          )}
        </Container>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  //align-items: center;
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30.5vw, 1fr));
  grid-auto-rows: 6vh;
  grid-gap: 8px;
  padding: 0 0.5vw;
`;

const FaultLabel = styled.div<{ faulty: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ faulty }) => (faulty ? "#B0002030" : "#46b47780")};
  height: 100%;
  padding: 0 1vw;
  color: ${({ faulty }) => (faulty ? "rgba(255, 64, 64, 1)" : "black")};
  border: ${({ faulty }) =>
    faulty ? "1px solid #B0002060" : "1px solid #46b477A0"};
  &: hover {
    border: ${({ faulty }) =>
      faulty ? "1px solid #B00020" : "1px solid #46b477"};
  }
`;
