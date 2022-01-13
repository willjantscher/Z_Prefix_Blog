// import Navbar from './Navbar'
import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap-grid.css';

import Navbar from "./_Navbar"
import WelcomePage from "./_Welcome_page";
import ContentPage from "./_Content_page";
import PostCreationPage from "./_Post_creation_page";
import UserPostsPage from "./_User_Posts_page";
import 'bootstrap/dist/css/bootstrap-grid.css';



function App() {
  return (
    <body>
        <Router>
          <div className="App">
            <Navbar />
            <div className="content">
              <Routes>
                <Route path="/" element={<WelcomePage/>}></Route>
                <Route path="/content" element={<ContentPage/>}></Route>
                <Route path="/newpost" element={<PostCreationPage/>}></Route>
                <Route path="/myposts" element={<UserPostsPage/>}></Route>
              </Routes>
            </div>
          </div>
        </Router>
        <div className="pb-5"></div>
        <footer className="footer justify-content-md-center pb-4" style={{position: "fixed", bottom: 0, width: "100%", alignContent: "center"}}>
          <div style={{ color: "grey", textAlign: "center" }}>@ 2022 Ok Devs inc. All Rights Reserved. </div>
          <div>
            <a style={{color:"cyan", textAlign: "center"}}href="https://www.youtube.com/watch?v=xvFZjo5PgG0&ab_channel=RickRoll">www.SomewhatFunctionalBlogs.org</a>
          </div>
        </footer>
    </body>

  )
}

export default App;
