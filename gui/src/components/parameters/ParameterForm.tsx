/**
 * messages are sent in 7 byte formats
 *
 * 1st byte is the type of request to the microcontroller
 *
 * Subsequent bytes are the payload of the request
 *  - only needed when writing a control parameter into flash memory
 *  - need to include the 2 byte parameter ID in this case
 *
 * Types of Requests:
 *    0xEE: Erase flash memory
 *    0x97: Program flash memory with the supplied payload
 *    0x1F: Start high-frequency live logging
 *    0x1E: start low-frequency live logging
 *    0x10: Cancel live logging
 *    0x1D: Download the data log
 *
 *
 * Note: When writing parameters, this program will clear all of their
 *       current values on the microcontroller and update them with what is in the
 *       GUI. (Might be more efficient to write individual parameters???)
 *
 */

import React, { Component } from "react";
import {
  StyledLabel,
  StyledInput,
  StyledUnit,
  Button,
} from "../styling/styling";
import parameters, { Parameters } from "./parameters";
import styled from "styled-components";
import ProgressBar from "../ProgressBar";
import Serial, {
  IntTo32Bit,
  FloatTo32Bit,
  IntTo16Bit,
} from "../../modules/serial";

type ParameterFormProps = {
  sp: Serial | null;
  toggle: (state: boolean) => void;
};

type ParameterFormState = {
  search: string;
  step: number;
  params: Parameters;
  status: string;
  writing: boolean;
  valid: boolean;
};

export default class ParameterForm extends Component<
  ParameterFormProps,
  ParameterFormState
> {
  timeout: number;

  constructor(props: ParameterFormProps) {
    super(props);
    this.state = {
      search: "",
      step: 0,
      params: parameters,
      status: "",
      writing: false,
      valid: true,
    };
  }

  componentWillUnmount() {
    const { sp } = this.props;
    sp && sp.detachListener(this.dataHandler);
  }

  updateParamters = (id: number, val: string) => {
    const _params = this.state.params;
    _params[id].value = val;
    _params[id].valid = _params[id].validation(val);
    this.setState({ params: _params, valid: this.validate() });
  };

  validate = () => {
    let param;
    for (param of Object.values(this.state.params)) {
      if (!param.valid) {
        return false;
      }
    }
    return true;
  };

  dataHandler = (data: string | Buffer) => {
    const { step } = this.state;
    if (data.toString() === "ACK") {
      clearTimeout(this.timeout);
      this.setState({ step: step + 1 });
      setTimeout(this._writeNext, Math.random() * 700 + 300);
    }
  };

  write = () => {
    const { sp, toggle } = this.props;
    clearTimeout(this.timeout);
    toggle(true);
    sp && sp.attachListener(this.dataHandler);
    this.setState({ step: 0, writing: true }, this._writeNext);
  };

  terminateWrite = () => {
    const { sp, toggle } = this.props;
    const { step, params } = this.state;
    const status =
      step === Object.keys(params).length + 1 ? "Write complete!" : "";
    clearTimeout(this.timeout);
    toggle(false);
    this.setState({ status, writing: false });
    this.timeout = setTimeout(() => this.setState({ status: "" }), 5000);
    sp && sp.detachListener(this.dataHandler);
  };

  _writeNext = () => {
    const { step, params } = this.state;
    const { sp } = this.props;
    this.timeout = setTimeout(this.terminateWrite, 15000);
    if (step === Object.keys(params).length + 1) {
      this.terminateWrite();
    } else if (step === 0) {
      sp && sp.write([0xee, 0, 0, 0, 0, 0, 0]);
      this.setState({ status: "Erasing Board..." });
    } else {
      const key = step - 1;
      const parameter = params[key];
      const { type } = parameter;
      const _32b =
        type === "int"
          ? IntTo32Bit(Number(parameter.value))
          : FloatTo32Bit(Number(parameter.value));
      sp && sp.write([0x97, ...IntTo16Bit(key), ..._32b]);
      this.setState({ status: `Writing ${parameter.name}...` });
    }
  };

  render() {
    const { search, step, params, writing, valid, status } = this.state;
    const { sp } = this.props;
    return (
      <>
        <Container>
          <div
            style={{
              margin: "0 2%",
              alignSelf: "center",
            }}
          >
            <Header>Configuration Parameters</Header>
            <Search
              placeholder="Search..."
              onChange={(e) => this.setState({ search: e.target.value })}
              spellCheck
              type="text"
            />
          </div>
          <Scrollable>
            {Object.entries(parameters)
              // filter out parameters that don't match search
              .filter(
                ([id, { description, name }]) =>
                  description.includes(search) || name.includes(search),
              )
              .map(([id, { name, description, type, unit, value, valid }]) => (
                <Entry key={id} valid={valid} title={`${description}: ${type}`}>
                  <StyledLabel valid={valid}>{name}</StyledLabel>
                  <StyledInput
                    valid={valid}
                    defaultValue={value}
                    onChange={(e) =>
                      this.updateParamters(parseInt(id), e.target.value)
                    }
                  />
                  {<StyledUnit valid={valid}>[ {unit} ]</StyledUnit>}
                </Entry>
              ))}
          </Scrollable>
        </Container>
        <Footer>
          <Button
            onClick={this.write}
            disabled={!(sp && sp.isOpen() && valid && !writing)}
            style={{ justifySelf: "start" }}
          >
            Write Paramters
          </Button>
          <ProgressBar
            step={step}
            max={Object.entries(params).length + 1}
            enable={writing}
          />
          {status.length > 0 && (
            <span
              style={{ color: "#4b90ca", width: "220px", textAlign: "center" }}
            >
              {status}
            </span>
          )}
        </Footer>
        <Menu>
          <h2>Profiles</h2>
          <div>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
            <p>Hello</p>
          </div>
          <p>button</p>
        </Menu>
      </>
    );
  }
}

const Menu = styled.div`
  grid-area: menu;
  display: grid;
  background-color: #e4e4e4;
  padding: 1%;
  grid-template-rows: 1fr 7fr 1fr;
`;

const Search = styled.input`
  background-color: #454545;
  border: 0;
  padding: 1%;
  width: 45%;
  float: right;
`;

const Header = styled.h2`
  margin: 0;
  float: left;
  display: inline-block;
  color: #4b90ca;
  cursor: default;
`;

const Footer = styled.div`
  grid-area: footer;
  width: 100%;
  display: grid;
  grid-template-columns: 1.5fr 6fr 2fr;
  justify-items: center;
  align-items: center;
  padding: 1%;
  box-sizing: border-box;
  background-color: #181818;
`;

const Container = styled.div`
  grid-area: container;
  padding: 1%;
  display: grid;
  grid-template-rows: 1fr 7fr;
  overflow: hidden;
  background-color: #202020;
`;

const Entry = styled.div<{ valid: boolean }>`
    display: flex;
    align-items: center;
    background-color: ${({ valid }) => (valid ? "#242424" : "#B0002030")};
    height: 100%;
    padding: 0 1vw;
    border: ${({ valid }) => (valid ? "0" : "1px solid #B0002060")}
    &: hover{
        border: ${({ valid }) =>
          valid ? "1px solid #333333" : "1px solid #B00020"}
    }
`;
const Scrollable = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30.5vw, 1fr));
  grid-auto-rows: 7vh;
  grid-gap: 7.5px;
  overflow-y: scroll;
  padding: 0 0.5vw;
`;
