import React, { Component } from 'react';
import './Cell.css';

class Cell extends Component {

  render() {
    return (
      <div className={this.props.cellStatus === 'F' ? "Cell" : "Cell-lit"}>
        
      </div>
    );
  }
}

export default Cell;