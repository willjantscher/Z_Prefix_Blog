import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

// const port = "http://localhost:8080"
const port = "https://jantscher-z-prefix-blog.herokuapp.com"
// require('dotenv').config()
// const port = "mysql://b76457c30cc8ea:7dfff6d3@us-cdbr-east-05.cleardb.net/heroku_a4405003a2a182f?reconnect=true" || 8080;

function _Post_creation_page()
{
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

        //this is a terrible if statement :(, should be incorperated backend
        if(postTitle !== "" && postContent !== "" && localStorage.getItem("token") !== null && postTitle.length < 10000 && postContent.length < 100000) {
            //check if user authenticated before posting
            Axios.get(`${port}/isUserAuth`, {headers: {
                "x-access-token": localStorage.getItem("token"),
                }}).then((res) => {
                // console.log(res.data);
                if (res.data) { //post to db if user authenticated
            Axios.post(`${port}/api/post`,body).then(navigate("/myposts"))
                } else {    
                    console.log("user not authorized")
                }
            })
        }
    }

    return(
        <div className="post_creation_page>">
            <h2>Create New Produce for Consumption</h2>
                <div className='container'>
                    <div className='row justify-content-md-center pb-2 pt-2'>
                        <label className='col-md-1 pt-2'>Title: </label>
                        <input 
                                style={{height:'35px', fontSize:'15px', borderRadius:'3px'}}
                                className='col-md-3'
                                id="title"
                                name="Title"
                                placeholder="Title"
                                onChange={(e) => {
                                    setPostTitle(e.target.value)}}
                        ></input>
                    </div>
                </div>
                <div className="row mb-3"></div>
                <div className='container pt-2'>
                    <textarea 
                            style={{height:'250px', fontSize:'15px', borderRadius:'3px'}}
                            className="col-md-10"
                            id="content"
                            name="Content"
                            placeholder="Content"
                            onChange={(e) => {
                                setPostContent(e.target.value)}}                        
                    ></textarea>
                </div>
                <div className='container pt-2'></div>
                <div>
                    <label>Date:
                        {new Date().toISOString().split('T')[0]}
                    </label>
                </div>

                <div>
                    <button className="" value="" style={{cursor: "pointer"}} onClick={makePost}>Post This Great Content</button>
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