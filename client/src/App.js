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

  const [loginStatus, setLoginStatus] = useState('');

  Axios.defaults.withCredentials = true;

  const register = () => {
    Axios.post(`${port}/api/register`, {
      firstName: firstName, 
      lastName: lastName, 
      username: newUsername, 
      password: newPassword}).then((res) => console.log(res.data));
  };

  const login = () => {
    Axios.post(`${port}/api/login`, {
        username: username,
        password: password,
    }).then((res) => {
      if(res.data.message) {
        setLoginStatus(res.data.message)
      } else {
        setLoginStatus(res.data[0].username)  //display username
      }
      // console.log(res.data[0])
    
    });
  }

  //if user is logged in, show userid
  useEffect(() => {
    Axios.get(`${port}/api/login`).then((res) => {
      if(res.data.loggedIn == true) {
        setLoginStatus(res.data.user[0].username);
      }
    })
  },[])

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


      
      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;
