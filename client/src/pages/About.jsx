import '../css/layout.css';
import { useEffect } from 'react';


const About = () => {
  // Use the useEffect hook to execute the script after the component has been rendered to the DOM
  useEffect(() => {
    // Change the body background to another image
    document.body.style.background = "linear-gradient(rgba(9, 27, 70, 0.7), rgba(33, 37, 41, 0.7)), url('img/bg_mario.gif') no-repeat";
    document.body.style.backgroundSize = 'cover';
  }, []);

  return (
    <>
      <div className='default-container'>
        <h1>This is the About Page</h1>
        <h4>Background Image Dragon Cave by Kirokaze</h4>
      </div>
    </>
  )
}

export default About