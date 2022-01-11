// import Navbar from './Navbar'
import React from "react"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap-grid.css';

import WelcomePage from "./_Welcome_page";
import ContentPage from "./_Content_page";
import PostCreationPage from "./_Post_creation_page";
import UserPostsPage from "./_User_Posts_page";



function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
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
  )
}

export default App;
