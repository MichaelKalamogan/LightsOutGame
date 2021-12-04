import React, { Component } from 'react';
import Cell from './Cell';
import './Board.css';

class Board extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gameBoard: this.newBoard(),
      gameStatus: "inProgress"
    }
    this.randomStatus = this.randomStatus.bind(this)
  }

  //Randomizing whether the cell will be Lit or Not
  randomStatus() {

   return Math.random() < 0.75 ? 'F' : 'T'

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

  updateBoard (row, col) {

    function changeStatus (Board, row, col) {
      if(Board[row][col] === 'F') {
        Board[row][col] = 'T'
       
      } else {
        Board[row][col] = 'F'
      }
      
      return Board
    }

    let Board = this.state.gameBoard

    changeStatus(Board, row, col)

    if(row !== 4 && row !== 0) {
      changeStatus(Board, row-1, col)
      changeStatus(Board,row+1,col)      
    } else if (row === 0) {
      changeStatus(Board,row+1,col)
    } else if (row === 4) {
      changeStatus(Board,row-1, col)
    }

    if(col !== 0 && col !== 4) {
      changeStatus(Board,row, col-1)
      changeStatus(Board,row, col+1)
    } else if (col===0) {
      changeStatus(Board,row, col+1)
    } else if (col===4) {
      changeStatus(Board,row, col-1)
    } 

    this.setState(
      {gameBoard: Board}, 
      () => {this.checkWin()})
  }

  checkWin() {
    
    for (let i=0; i< this.state.gameBoard.length; i++) {
      for(let j=0; j < this.state.gameBoard[i].length; j++) {
        if (this.state.gameBoard[i][j] === 'T') {
          return
        }
      }
    }
    this.setState({gameStatus: "win"})
    
  }

  render() {
    
    return (
      <div className="Board">
        {this.state.gameStatus==="win" ? 
          <div>
            You Win
          </div>
        : 
          <div>     
            <table>
              <tbody>
                {this.state.gameBoard.map((row,i) => (
                  <tr key={i}>
                    {row.map((col,j) => (
                      <td key={j} onClick={() => (this.updateBoard(i,j))}><Cell cellStatus={this.state.gameBoard[i][j]} /></td>
                    ))}
                  </tr>
                ))}        
              </tbody>
            </table>
            <div className="instructions">
              <h3>Objective of the game is to off all the Lights. You win when you off all the Lights.</h3>         
              <p>White means that the Light is on. Grey means that the Light is off.</p>
              
              <p>Each time u toggle a light, the adjacent 4 lights will be switched on or off accordingly.</p>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Board;
