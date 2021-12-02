import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {gameBoard: this.newBoard()}
    this.randomStatus = this.randomStatus.bind(this)
  }

  //Randomizing whether the cell will be Lit or Not
  randomStatus() {

   return Math.random() < 0.25 ? 'F' : 'T'

  } 

  newBoard() {
    
    let board = [...Array(5)].map(item => Array(5).fill())

    for (let i = 0; i < 5 ; i++) {
        for(let j = 0; j < 5; j++) {
          board[i][j] = this.randomStatus()
        }
      
    }
    return board
  }


  render() {

    return (
      <div className="Board">
        <table>
          <tbody>
            {this.state.gameBoard.map((row,i) => (
              <tr key={i}>
                {row.map((col,j) => (
                  <td key={j}><Cell cellStatus={this.state.gameBoard[i][j]} /></td>
                ))}
              </tr>
            ))}        
          </tbody>
        </table>
      </div>
    );
  }
}

export default Board;
