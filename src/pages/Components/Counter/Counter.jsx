import { useState } from 'react';

//import styles
import './Counter.css';

function Counter(props) {
  //state
  const[value, setValue] = useState(props.value) || 0;
  
  const increment = () => {setValue(value + 1);}

  function decrement() {
    setValue(value - 1);
  }

  //render
  return (
    <div className='counter-name'>
      <h3 className='title'>{props.name || 'Counter'}</h3>
      <button className='btn btn-danger' onClick={decrement}>-</button>
      <span className='counter-value'>{value}</span>
      <button className='btn btn-success' onClick={increment}>+</button>
    </div>
);
  
}

export default Counter;