import '../../css/layout.css';
import './pong2.css';
import {useEffect} from 'react';

const Pong2 = () => {

  useEffect(() => {
    import('./main');
  },[])

  return (
    <>
    <div className='default-container'>
      <canvas id='pong2-canvas'></canvas>  
    </div>
    
    </>
  )
}


export default Pong2