import { useState } from "react";
import './ToDo.css'; // Import the CSS file for styling

export default function ToDo() {
  const [item, setItem] = useState('');
  const [list, setList] = useState([]);

  const AddList = () => {
    const trimmedItem = item.trim();
    if (trimmedItem !== '' && !list.includes(trimmedItem)) {
      setList([...list, trimmedItem]);
      setItem('');
    }
  };


  const deleteItem = (idx) => {
    const newList = list.filter((value, index) => index !== idx);
    setList(newList);
  };

  return (
    <div className="container">
      <div className="todo-container">
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && AddList()}
        className="todo-input"
        placeholder="Add a new task..."
      />

        <button onClick={AddList} className="add-button">Add</button>
      </div>
      <ul className="todo-list">
        {list.map((value, index) => (
          <li key={index} className="todo-item">
            <h3>{value}</h3>
            <button onClick={() => deleteItem(index)} className="delete-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
