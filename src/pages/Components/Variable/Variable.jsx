//import styles
import './Variable.css';

function Variable({type,name,value,setValue}) {
  //render
  return (
    <div className='counter-name'>
      <h3 className='title'>{name || 'Counter'}</h3>
      <button className='btn btn-danger' onClick={() =>setValue(value - 1)}>-</button>
      <span className='counter-value'>{type && type === 'int' ? Math.floor(value) : value.toFixed(2)}</span>
      <button className='btn btn-success' onClick={() =>setValue(value + 1)}>+</button>
    </div>
);
  
}

export default Variable;