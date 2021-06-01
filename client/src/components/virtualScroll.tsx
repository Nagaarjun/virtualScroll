import React from 'react';

interface VirtualScrollProps{
    scrollContainerHeight: number,
    totalNumberOfRows: number,
    rows: Array<any>,
    rowHeight: number,
    rowRenderer: Function 
}

interface VirtualScrollState{
    contentHeight: number,
    startRowsFrom: number,
    endRowsTo: number,
    rowsThatCanBeShownInVisibleArea: number,
    totalRowsToDisplay:number,
    alreadyScrolledRows: number,
    scrollPos:number,
    rows:Array<any>
}
export default class VirtualScroll extends React.Component<VirtualScrollProps,VirtualScrollState> {
    public didntRanSince:Date|number;
    public forceRerenderAtleastIn:number;
    public lastRenderedState:object;
  constructor(props:VirtualScrollProps) {
    super(props);
    this.state = {
      contentHeight: 0,
      startRowsFrom: 0,
      endRowsTo: 0,
      rowsThatCanBeShownInVisibleArea: 0,
      alreadyScrolledRows: 0,
      scrollPos:0,
      totalRowsToDisplay:0,
      rows:Array<any>
    };
    this.didntRanSince = Date.now();
    this.forceRerenderAtleastIn = 10;
    Object.assign({}, this.state);
    this.lastRenderedState = Object.assign({}, this.state);
  }

  componentWillMount() {
    this.updateContent(this.state.scrollPos || 0);
  }

  componentWillReceiveProps(newProps:any) {
    this.updateContent(this.state.scrollPos || 0, newProps);
  }

  updateContent = (yPos:number, newProps?:any) => {
    const props = newProps || this.props;
    this.didntRanSince = Date.now();
    const virtualScrollContainerHeight = props.scrollContainerHeight > window.innerHeight ? window.innerHeight : props.scrollContainerHeight;
    const totalRowsToDisplay = props.totalNumberOfRows;
    const contentHeight = props.totalNumberOfRows * props.rowHeight;
    const alreadyScrolledRows =(yPos / props.rowHeight);
    const rowsThatCanBeShownInVisibleArea = Math.ceil(virtualScrollContainerHeight / props.rowHeight);
    const startRowsFrom = (Math.max(0, alreadyScrolledRows));
    const endRowsTo = alreadyScrolledRows + rowsThatCanBeShownInVisibleArea;

    this.setState({
      contentHeight: contentHeight,
      startRowsFrom,
      endRowsTo: endRowsTo,
      rowsThatCanBeShownInVisibleArea,
      totalRowsToDisplay,
      alreadyScrolledRows,
      scrollPos: yPos,
      rows: this.props.rows
    });
  }

  scrollHook = ($el:any)=> {
    this.updateContent($el.scrollTop);
  }
  render() {
    const { totalNumberOfRows, scrollContainerHeight, rowHeight } = this.props;
    const totalRowHeight = totalNumberOfRows * rowHeight;
    const activateVirtualScroll = totalRowHeight > scrollContainerHeight;

    // Finding out maximum height of the container-
    let virtualScrollHeight = (scrollContainerHeight > window.innerHeight) ? window.innerHeight : scrollContainerHeight;
    virtualScrollHeight = totalRowHeight < virtualScrollHeight ? totalRowHeight : virtualScrollHeight;

    return (
      <div style={{ height: `${virtualScrollHeight}px`, overflowY: 'auto' }}>
        {
          activateVirtualScroll ?
          this.props.rowRenderer(
            { transform: `translateY(${this.state.startRowsFrom * this.props.rowHeight}px)`, height: `${rowHeight}px` },
            this.state.startRowsFrom,
            this.state.endRowsTo,
            { height: `${totalRowHeight}px` }
          ) :
          this.props.rowRenderer(
            { transform: 'translateY(0px)', height: `${rowHeight}px` },
            0,
            totalNumberOfRows,
            { height: `${totalRowHeight}px` }
          )
        }
      </div>
    );
  }
}