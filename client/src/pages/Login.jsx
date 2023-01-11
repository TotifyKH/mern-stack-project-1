import { useState } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  }

  const handleClick = async () => {
    console.log(name);
    //Go back to home page
    axios.post(`${API_URL}/users/login`, {name},{withCredentials: true})
    .then((result) => {
      if(result.data.success){
        window.location.href = '/';
      }
    })
  }

  const handleKeyPress = (event) => {
    //13 is Enter
    if (event.keyCode === 13) {
      handleClick();
    }
  }

  return (
    <>
      <h1>Enter Your Name</h1>
      <input type='text' placeholder="Name" onChange={handleChange} onKeyDown={handleKeyPress} />
      <button onClick={handleClick}>Enter</button>
    </>
  );
}

export default Login;
