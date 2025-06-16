import { useState, useEffect } from "react";
import "./ColorFill.css";

export default function ColorFill() {
  const [size, setSize] = useState(10);
  const [color, setColor] = useState(""); // State to store the selected color
  const [list, setList] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill("white"))
  ); // Initial 10x10 grid
  const [empty, setEmpty] = useState(true);
  

  // Update the grid whenever size changes
  useEffect(() => {
    const newSize = Math.max(1, Math.min(50, size)); // Restrict size between 1 and 50
    setList(
      Array(newSize)
        .fill()
        .map(() => Array(newSize).fill("white"))
    );
  }, [size]);

  // Function to change the color of the clicked box
  const handleBoxClick = (rowIndex, colIndex) => {
    const newList = [...list];
    newList[rowIndex][colIndex] = color; // Change the color of the clicked box
    setList(newList);
    setEmpty(false);
  };

  // Function to reset all boxes to white
  const clearBoxes = () => {
    setList(
      Array(size)
        .fill()
        .map(() => Array(size).fill("white"))
    );
    setEmpty(true);
  };

  return (
    <div className="app-container">
      <div className="button-container">
        <input type="color" value={color} onChange={(e)=>setColor(e.target.value)}></input>
        {(color)?<p
          style={{
            backgroundColor: color,
            height: "50px",
            width: "50px",
            borderRadius: "50%",
          }}
        ></p>:<></>}
      </div>

      <div className="input-container">
        <label>
          Grid Size:
          <input
            type="number"
            value={size}
            min="1"
            max="50"
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="box-container">
        {list.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((item, colIndex) => (
              <div
                key={colIndex}
                className="box"
                style={{ backgroundColor: item }}
                onClick={() => handleBoxClick(rowIndex, colIndex)} // Set color on click
              ></div>
            ))}
          </div>
        ))}
      </div>

      {empty ? (
        <></>
      ) : (
        <button className="clear-button" onClick={clearBoxes}>
          Clear
        </button>
      )}
    </div>
  );
}
