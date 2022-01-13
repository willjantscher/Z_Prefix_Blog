import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Axios from 'axios';
//localhostapi
// const port = "http://localhost:8080"
// const port = "https://jantscher-z-prefix-blog.herokuapp.com"
require('...dotenv').config()
const port = process.env.PORT || 8080;


function _Welcome_page() {
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
    if(firstName !== "" && lastName !== "" && newUsername !== "" && newPassword !== "")
    {
      Axios.post(`${port}/api/register`, {
        firstName: firstName, 
        lastName: lastName, 
        username: newUsername, 
        password: newPassword}).then((res) => {
          loginRegister(newUsername, newPassword, "/content")
        });
    }
  };

  //not pretty but it's a quick fix for loging in after register
  const loginRegister = (user = username, pass = password, nav = "/myposts") => {
    let body;
    if(user && pass) {
      body = {
        username: user,
        password: pass,
      }
    }
    else {
      body = {
        username: username,
        password: password,
      }
    }
    console.log(body)
    Axios.post(`${port}/api/login`, body).then((res) => {
      console.log(res.data.auth)
      if(!res.data.auth) {
        setLoginStatus(false)
      } else {
        //save token and user id if successful login
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("id", res.data.result[0].id)
        localStorage.setItem("username", res.data.result[0].username) 
        setLoginStatus(true)  //display username
        setUsername("");
        setPassword("");
        navigate(nav);
      }
    });
    
  }

  const login = () => {
    let body = {
      username: username,
      password: password,
    }

    Axios.post(`${port}/api/login`, body).then((res) => {
      console.log(res.data.auth)
      if(!res.data.auth) {
        setLoginStatus(false)
      } else {
        //save token and user id if successful login
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("id", res.data.result[0].id)
        localStorage.setItem("username", res.data.result[0].username) 
        setLoginStatus(true)  //display username
        setUsername("");
        setPassword("");
        navigate("/myposts");
      }
    });
  }

  const guest = () => {
    setLoginStatus(false);
    localStorage.setItem("username", "guest") 
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

  //how to authenticate user before actions
  // const userAuthenticated = () => {
  //   Axios.get(`${port}/isUserAuth`, {headers: {
  //     "x-access-token": localStorage.getItem("token"),
  //   }}).then((res) => {
  //     console.log(res)
  //   })
  // }

  return (
    <div className="App"> 
      

      <div className="container pb-2">
        <h1>Login</h1>
        <div className='row justify-content-md-center pb-2'>
          <input type="text" placeholder="Username..." className='col col-lg-2' onChange={(e) => {
            setUsername(e.target.value)
          }}/>
        </div>

        <div className='row justify-content-md-center pb-4'>
        <input type="password" placeholder="Password..." className='col col-lg-2' onChange={(e) => {
          setPassword(e.target.value)
        }}/>
        </div>

        <button style={{cursor: "pointer"}} onClick={login}> Login </button>

      </div>

      <div className='container pb-2'>
        <h1>Continue as Guest</h1>
        <button style={{cursor: "pointer"}} onClick={guest}> Guest (you know you want to register though...)</button>
      </div>

      <div className="container pb-2">
        <h1>Register</h1>

        <div className='row justify-content-md-center pb-2'>
          <label className='col col-lg-2'>First Name</label>
          <input type="text" name="firstName"  className='col col-lg-2' onChange={(e) => {
            setFirstName(e.target.value)
          }}/>
        </div>

        <div className='row justify-content-md-center pb-2'>
          <label className='col col-lg-2'>Last Name</label>
          <input type="text" name="lastName" className='col col-lg-2' onChange={(e) => {
            setLastName(e.target.value)
          }}/>
        </div>

        <div className='row justify-content-md-center pb-2'>
          <label className='col col-lg-2'>Username</label>
          <input type="text" name="username" className='col col-lg-2' onChange={(e) => {
            setNewUsername(e.target.value)
          }}/>
        </div>

        <div className='row justify-content-md-center pb-4'>
          <label className='col col-lg-2'>Password</label>
          <input type="text" name="password" className='col col-lg-2' onChange={(e) => {
            setNewPassword(e.target.value)
          }}/>
        </div>
        
        <button style={{cursor: "pointer"}} className='col col-lg-2' onClick={register}> Register </button>
      </div>
      
      <h1>{loginStatus}</h1>

      {/* {loginStatus && (
        <button onClick={userAuthenticated}> Check if Authenticated</button>
      )} */}
    </div>
  );
}

export default _Welcome_page;

