import React, { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

//npm run start to execute
//in client, npm install axios

function App() {
  const port = "http://localhost:3001"
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const register = () => {
    Axios.post(`${port}/api/insert`, {
      firstName: firstName, 
      lastName: lastName, 
      username: newUsername, 
      password: newPassword}).then((res) => console.log(res.data));
  };

  const login = () => {
    console.log(username);
    Axios.get(`${port}/api/get`, {
      params: {
        username: username,
        password: password
      }
    }).then((res) => console.log(res.data));
  }

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
          setNewUsername(e.target.value)
        }}/>

        <label>Password</label>
        <input type="text" name="password" onChange={(e) => {
          setNewPassword(e.target.value)
        }}/>

        <button onClick={register}> Register </button>
      </div>

      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." onChange={(e) => {
          setUsername(e.target.value)
        }}/>
        <input type="password" placeholder="Password..." onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        <button onClick={login}> Login </button>
      </div>
    </div>
  );
}

export default App;
