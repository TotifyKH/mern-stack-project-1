import '../../css/layout.css';
import './flappyBird.css';
import {useEffect} from 'react';


const FlappyBird = () => {
  useEffect(() => {
    import('./main');
  }, []);

  return (
    <>
    <div className='default-container'>
      <canvas id='flappyBird-canvas'></canvas>
    </div>
    
    </>
  )
}


export default FlappyBird