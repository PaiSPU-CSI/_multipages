

import Counter from './Counter/Counter';
import Add from './Add/Add';
import Timer from './Timer/Timer';
import Temperatures from './Temperatures/Temperatures';

import'./Components.css';

function Components() {

  return (<div style={{display: 'flex', justifyContent: 'center',margin:'2rem 0 '}}>
     <div className='all-components-container'>
    {/* child component */}
    <h1><span className='badge text-bg-dark'>React Components</span></h1>
    <div className='components-container'>
      <div>
        <Counter name={'Counter'} value={0} />
        <Timer />
      </div>
      <div>
        <Add v1={0} v2={0} />
      </div>
      <div className='temp'>
        <Temperatures theType={' '} />
      </div>
    </div>
    <h2><span className='badge text-bg-dark'>นายพนัส เหล่าตระกูลงาม รหัส 66077392</span></h2>
  </div> 
  </div>);
}

export default Components;