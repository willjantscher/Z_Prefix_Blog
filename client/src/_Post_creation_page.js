import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';



function _Post_creation_page()
{
    const port = "http://localhost:3001"
    const navigate = useNavigate();
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    const makePost = () => {
        // console.log(postTitle + postContent);
        let date = new Date();
        let formatted_date = date.toISOString().split('T')[0];

        let body = {
            userId: localStorage.getItem("id"),
            title: postTitle,
            content: postContent,
            date: formatted_date
        }

        //check if user authenticated before posting
        Axios.get(`${port}/isUserAuth`, {headers: {
            "x-access-token": localStorage.getItem("token"),
            }}).then((res) => {
            // console.log(res.data);
            if (res.data) { //post to db if user authenticated
                Axios.post(`${port}/api/post`,body)
            } else {    
                console.log("user not authorized")
            }
        })


          //how to authenticate user before actions


        //post to the server
        // Axios.post(`${port}/api/post`, body)
        



        navigate("/myposts");
    }

    return(
        <div className="post_creation_page>">
            <h2>Here is where you can create posts</h2>

                <div>
                    <label>Title: 
                        <input 
                            style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                            className=""
                            id="title"
                            name="Title"
                            placeholder="Title"
                            onChange={(e) => {
                                setPostTitle(e.target.value)}}
                        ></input>
                    </label>
                </div>

                <div>
                <label>Post:
                    <input 
                            style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                            className=""
                            id="content"
                            name="Content"
                            placeholder="Content"
                            onChange={(e) => {
                                setPostContent(e.target.value)}}                        ></input>
                    </label>
                </div>

                <div>
                    <label>Date:
                        {new Date().toISOString().split('T')[0]}
                    </label>
                </div>

                <div>
                    <button className="" value="" onClick={makePost}>Post Stuff</button>
                </div>


        </div>
    )
}

export default _Post_creation_page;

//USER STORIES
//As a blogger I want to be able to create a new post so that I can share my insights with the world.
//A post displays title, content, and creation date.
//After the post is created, the blogger should be redirected to all of their blog posts.


//will want to alert if inputs not filled if time