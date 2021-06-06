import React, { Component, ReactEventHandler, ReactFragment } from 'react'
import styled from "styled-components";

const Viewport = styled.div`
width: 150px;
overflow-y: auto;
`;

export interface Settings{
  itemHeight: number,
    amount: number,
    tolerance: number,
    minIndex: number,
    maxIndex: number,
    startIndex: number
}
interface ScrollerProps{
  settings:Settings;
  row:any;
  get:any;
}
interface ScrollerState {
  settings:Settings,
  viewportHeight:number,
  totalHeight:number,
  toleranceHeight:number,
  bufferHeight:number,
  bufferedItems:number,
  topPaddingHeight:number,
  bottomPaddingHeight:number,
  initialPosition:number,
  data: []
}
const setInitialState = (settings:any):any => {
  const { itemHeight, amount, tolerance, minIndex, maxIndex, startIndex } = settings
  const viewportHeight = amount * itemHeight
  const totalHeight = (maxIndex - minIndex + 1) * itemHeight
  const toleranceHeight = tolerance * itemHeight
  const bufferHeight = viewportHeight + 2 * toleranceHeight
  const bufferedItems = amount + 2 * tolerance
  const itemsAbove = startIndex - tolerance - minIndex
  const topPaddingHeight = itemsAbove * itemHeight
  const bottomPaddingHeight = totalHeight - topPaddingHeight
  const initialPosition = topPaddingHeight + toleranceHeight
  return {
    settings,
    viewportHeight,
    totalHeight,
    toleranceHeight,
    bufferHeight,
    bufferedItems,
    topPaddingHeight,
    bottomPaddingHeight,
    initialPosition,
    data: []
  }
}

export default class Scroller extends React.Component<ScrollerProps, ScrollerState> {
  public viewportElement:any;
  constructor(props: ScrollerProps | Readonly<ScrollerProps>) {
    super(props)
    this.state = setInitialState(this.props.settings)
    this.viewportElement = React.createRef()
  }
  
  componentDidMount() {
    this.viewportElement.current.scrollTop = this.state.initialPosition
    if (!this.state.initialPosition) {
      this.runScroller({ target: { scrollTop: 0 } })
    }
  }

  runScroller = ({ target: { scrollTop } }:any):void => {
    const { totalHeight, toleranceHeight, bufferedItems, settings: { itemHeight, minIndex }} = this.state
    const index = minIndex + Math.floor((scrollTop - toleranceHeight) / itemHeight)
    const data = this.props.get(index, bufferedItems)
    const topPaddingHeight = Math.max((index - minIndex) * itemHeight, 0)
    const bottomPaddingHeight = Math.max(totalHeight - topPaddingHeight - data.length * itemHeight, 0)

    this.setState({
      topPaddingHeight,
      bottomPaddingHeight,
      data
    })
  }

  render() {
    const { viewportHeight, topPaddingHeight, bottomPaddingHeight, data } = this.state
    return (
      <Viewport
        ref={this.viewportElement}
        onScroll={this.runScroller}
        style={{ height: viewportHeight }}
      >
        <div style={{ height: topPaddingHeight }}></div>
        {
          data.map(this.props.row)
        }
        <div style={{ height: bottomPaddingHeight }}></div>
      </Viewport>
    )
  }
};