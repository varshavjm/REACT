import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Square extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value:null,
    };
  }
  render(){
    return (
      <button className='Square' onClick={()=>this.props.onClick()}>{this.props.value}</button>
    );
  }
}
class Board extends React.Component{
//TO-DO History

  renderSquare(i){
    return <Square value={this.props.squares[i]}
            onClick={()=> this.props.handleClick(i)}
    />;
  }

  render(){
      return (
        <div>
            <div className='board-row'>
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className='board-row'>
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className='board-row'>
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
      );
  }
}

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state={
      history:[{
      squares: Array(9).fill(null),
    }],
      status:'X',
      stepNumber:0
    };
  }

  jumpTo(step){
    this.setState({
      stepNumber:step,
      status:step%2===0?'X':'0'
    });
  }

  render(){
    let history=this.state.history;
    var tempArr=history[this.state.stepNumber];
    let status='Winner:';
    const winner=calculateWinner(tempArr.squares);
    //the function has 2 parameters fist is the square object at index='move' and second is index.They r used for iterating
    //oner each sqaure object of history array
    const moves=history.map((squareObj,move)=>{
        const desc= move? "Go to move#"+move:"Go to Game Start";
        return (<li key={move} onClick={()=>this.jumpTo(move)}>{desc}</li>);

    });


    if(this.state.status!='Winner'){
      if(winner){
        status=status+winner;
        this.setState({status:'Winner'});
      }
      else{
        status='Next Player:'+this.state.status;
      }
    }
    else{
      status=status+winner;
    }



    return (
      <div className='game'>
        <div className='board'>
          <Board squares={tempArr.squares}
                 status={this.state.status}
                 handleClick={(i)=>this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
  handleClick(i){
    //if winner fund or that square already has an entry
    let step=this.state.stepNumber;
    let history=this.state.history.slice(0,step+1);
    let tempArr=history[history.length-1];
    if(this.state.status==='Winner' ||  tempArr.squares[i])
      return;
    let current=this.changeStatus();
    let squares= tempArr.squares.slice();
    squares[i]=current;
    this.setState({
      history:history.concat([{
        squares:squares
      }]),
      stepNumber:step+1,
      status:step%2===0?'0':'X',
    });
  }

  changeStatus(){
    if(this.state.status==='X'){
      this.setState({status:'0'});
      return 'X';
    }
    else{
      this.setState({status:'X'});
      return 'O';
    }
  }
}


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares){
  const lines=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];
  for(var i=0;i<lines.length;i++){
    const [a,b,c]=lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        return squares[a];
  }

  return null;
}
