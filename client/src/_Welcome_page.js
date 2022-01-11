import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Axios from 'axios';

//npm run start to execute
//in client, npm install axios

function _Welcome_page() {
  const port = "http://localhost:3001"
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(false);
  const navigate = useNavigate();

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
      if(!res.data.auth) {
        setLoginStatus(false)
      } else {
        localStorage.setItem("token", res.data.token)
        setLoginStatus(true)  //display username
        navigate("/myposts");
      }
    });
    
  }

  const guest = () => {
    setLoginStatus(false);
    navigate(`/content`);
  }

  //if user is logged in, show userid
  useEffect(() => {
    Axios.get(`${port}/api/login`).then((res) => {
      if(res.data.loggedIn) {
        setLoginStatus(res.data.user[0].username);
      }
    })
  },[])

  const userAuthenticated = () => {
    Axios.get(`${port}/isUserAuth`, {headers: {
      "x-access-token": localStorage.getItem("token"),
    }}).then((res) => {
      console.log(res)
    })
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

      <div className='guest'>
        <h1>Continue as Guest</h1>
        <button onClick={guest}> Guest </button>
      </div>


      
      <h1>{loginStatus}</h1>

      {loginStatus && (
        <button onClick={userAuthenticated}> Check if Authenticated</button>
      )}
    </div>
  );
}

export default _Welcome_page;
