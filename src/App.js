import { useEffect, useState } from "react";
import "./App.css";

function App() {
  let [box, setBox] = useState(Array(9).fill(""));
  let [isXTurn, setIsXTurn] = useState(true);
  let [status, setStatus] = useState("");
  let [row, setRow] = useState([])
  // var a, b, c;
  // console.log(box);

  const handleClick = (getcurrentbox) => {
    let copyBox = [...box];
    if (copyBox[getcurrentbox] || getWinner(copyBox)) return;
    copyBox[getcurrentbox] = isXTurn ? "X" : "O";
    setIsXTurn(!isXTurn);
    setBox(copyBox);
  };

  const getWinner = (box) => {
    const winningPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
    ];

    for (let i = 0; i < winningPatterns.length; i++) {
      const [x, y, z] = winningPatterns[i];
      // console.log(x, y, z);
      // console.log("paterni---" + winningPatterns[i]);
      // console.log(box[x] + "y---" + box[y] + " z---" + box[z]);

      if (box[x] && box[x] === box[y] && box[x] === box[z]) {
        
        setRow([x,y,z])
        
        // console.log(a+"a="+x,b+"b="+y,z);
        return box[x];
      }
    }

    return null;
  };

  const Restet = () => {
    setIsXTurn(true);
    setBox(Array(9).fill(""));
    setRow([])
  };

  useEffect(() => {
    if (!getWinner(box) && box.every((el) => el !== "")) {
      setStatus(`This is a draw ! Please restart the game`);
    } else if (getWinner(box)) {
      setStatus(`Winner is ${getWinner(box)}. Please restart the game`);
    } else {
      setStatus(`${isXTurn ? "X" : "O"}'s Turn`);
    }

    // setStatus(getWinner(box))
    // console.log(getWinner(box))
  }, [box, isXTurn]);

  // console.log(row);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe Game</h1>
        <div id="box">
          {box.map((el, i) => {
            
             return row[0]==i|| row[1]==i|| row[2]==i? <div key={i} style={{backgroundColor: "green"}}  onClick={() => handleClick(i)} class="subbox">
                {el}
              </div> :
              <div key={i}  onClick={() => handleClick(i)} class="subbox">
              {el}
            </div>
             
            
          })}
        </div>
        <div className="btnbox">
        {status=== "This is a draw ! Please restart the game"?   <h3 style={{color:"red"}}>{status}</h3> : 
        status==="X's Turn" || status==="O's Turn"?<h3 style={{color:"white"}}>{status}</h3> : 
        <h3>{status}</h3>}
        </div>
        <div className="btnbox">
          <button onClick={() => Restet()}>Restart</button>
        </div>
      </header>
    </div>
  );
}

export default App;
