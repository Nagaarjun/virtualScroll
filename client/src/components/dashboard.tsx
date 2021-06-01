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

  
  renderRows = (fromRow:number, toRow:number, styles:CSSProperties) => {
    const generatedRows = [];
    for (let i = fromRow; i < toRow; i++) {
      generatedRows.push(<li style={styles}>{ 'List item' + (i+1) }</li>);
    }
    return generatedRows;
  }

  scrollList = (e:any)=> {
    if (this.refs.virtualScroll) {
      this.refs.virtualScroll.scrollHook(e.target);
    }
  }

  contentRenderer =(rowStyles:CSSProperties, fromRow:number, toRow:number, parentStyles:CSSProperties) =>{
    return (
      <ul style={parentStyles}> // complete control on list styling 
        {this.renderRows(fromRow, toRow, rowStyles)}
      </ul>
    );
  }
  
  render() {
    return (
      <>
        <Title>
          Welcome
        </Title>
        <CenterDiv>
        <div ref="list" onScroll={this.scrollList}>
            <VirtualScroll
                {...this.props}
                ref="virtualScroll"
                rows={this.data} // data of around 50000 rows
                scrollContainerHeight={400} // height of the container that would remain visible
                totalNumberOfRows={(this.data.length) || 0}
                rowHeight={25} // for now, only fixed height rows can be rendered in the component
                rowRenderer={this.contentRenderer.bind(this)} // function for rendering different type of lists 
            />
        </div> 

          <button className="btn btn-primary" onClick={this.redirectLogin}>
            LogOut
          </button>
        </CenterDiv>
      </>
    );
  }
}
