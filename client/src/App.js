import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

//npm run start to execute
//in client, npm install axios

function App() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    Axios.post("http://localhost:3001/api/insert", {
      firstName: firstName, 
      lastName: lastName, 
      username: username, 
      password: password}).then((res) => console.log(res.data));
  };

  return (
    <div className="App"> 
      <div className="registration">
        <h1>Registration</h1>

        <label>First Name</label>
        <input type="text" name="firstName" onChange={(e) => {
          setFirstName(e.target.value)
        }}/>

        <label>Last Name</label>
        <input type="text" name="lastName" onChange={(e) => {
          setLastName(e.target.value)
        }}/>

        <label>Username</label>
        <input type="text" name="username" onChange={(e) => {
          setUsername(e.target.value)
        }}/>

        <label>Password</label>
        <input type="text" name="password" onChange={(e) => {
          setPassword(e.target.value)
        }}/>

        <button onClick={register}> Register </button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." />
        <input type="password" placeholder="Password..." />
        <button> Login </button>
      </div>
    </div>
  );
}

export default App;
