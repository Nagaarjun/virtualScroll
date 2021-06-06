import * as React from "react";
import styled, { CSSProperties } from "styled-components";
import { RouteProps } from "react-router-dom";
import { History } from "history";
import VirtualScroll from "./virtualScroll";
import mock from "../../../mocks/virtualScrollData.json";
const Title = styled.h1`
  font-size: 1.5em;
  color: #747676;
  text-align: center;
  padding: 10px;
`;

const TableTitle = styled.div`
  font-size: 1.3rem;
  color: #000;
  border: 1px solid #000;
`;

const TableContent = styled.div`
  font-size: 1.2rem;
  color: #000;
  border: 1px solid #000;
`;

const GiveKudos = styled.div`
  display: inherit;
  & > div {
    margin: 5px;
    width: 50%;
  }
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


type user = {
  user: string;
  userName: string;
  emailId: string;
  kudosGivenTo: string[];
  kudosReceivedFrom: string[];
  numberOfKudosRemaining: number;
};

export interface DashBoardProps {
  userName: string;
  password: string;
  history: History;
}

interface Settings{
  itemHeight: number,
    amount: number,
    tolerance: number,
    minIndex: number,
    maxIndex: number,
    startIndex: number
}
const SETTINGS:Settings = {
  itemHeight: 20,
  amount: 10,
  tolerance: 5,
  minIndex: -9999,
  maxIndex: 100000,
  startIndex: 1
}
export interface DashBoardState {
}

export class DashBoard extends React.Component<
  DashBoardProps & RouteProps,
  DashBoardState
> {
  public data =mock;
  constructor(props: any) {
    super(props);
  }

  redirectLogin = () => {
    this.props.history.push({
      pathname: "/"
    });
  };

   getData = (offset:any, limit:any):Array<any> => {
    const data = []
    const start = Math.max(SETTINGS.minIndex, offset)
    const end = Math.min(offset + limit - 1, SETTINGS.maxIndex)
    console.log(`request [${offset}..${offset + limit - 1}] -> [${start}..${end}] items`)
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push({ index: i, text: `item ${i}` })
      }
    }
    return data
  }
  
  rowTemplate = (item:any) => (
    <Item key={item.index}>
      {item.text}
    </Item>
  )
  
  render() {
    return (
      <>
        <Title>
          Welcome
        </Title>
        <CenterDiv>
        <div>
        <VirtualScroll get={this.getData} settings={SETTINGS} row={this.rowTemplate}/>
        </div> 

          <button className="btn btn-primary" onClick={this.redirectLogin}>
            LogOut
          </button>
        </CenterDiv>
      </>
    );
  }
}
