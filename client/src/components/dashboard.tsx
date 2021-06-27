import * as React from "react";
import { RouteProps } from "react-router-dom";
import styled from "styled-components";
const Title = styled.h1`
  font-size: 1.5em;
  color: #747676;
  text-align: center;
  padding: 10px;
`;

const CenterDiv = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  padding: 20px;
  width: 70%;
  overflow-y: scroll;
`;
const Item = styled.div`
  height: 20px;
`;


export interface DashBoardProps {
}
export interface DashBoardState {
}

export class DashBoard extends React.Component<
  DashBoardProps & RouteProps,
  DashBoardState
> {
  constructor(props: any) {
    super(props);
  }
  
  render() {
    return (
      <>
        <Title>
          Welcome to Air Quality Index
        </Title>
        <CenterDiv>

        </CenterDiv>
      </>
    );
  }
}
