import React, {Component, useState, useEffect} from "react";
import Axios from 'axios';
import './App.css';
import TextareaAutosize from 'react-textarea-autosize';

const port = "http://localhost:3001"

class _User_Posts_page extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            posts: null,
            displayedPosts: null,
            height: null
        }
    }

    componentDidMount() {
        this.updatePropsFromDb();
    }

    updatePropsFromDb = () => {
        Axios.get(`${port}/isUserAuth`, {headers: {
            "x-access-token": localStorage.getItem("token"),
            }}).then((res) => {
                if (res.data) { //pull user's posts if authenticated
                    console.log(`${localStorage.getItem("username")} authorized`)
                    Axios.post(`${port}/api/getuserposts`,{
                        id: localStorage.getItem("id")
                    }).then((res) => {
                        this.setState({ posts: res.data})
                        this.updateDisplayedPosts();
                        // console.log(this.state.posts)
                    })
                } else {    
                    console.log("user not authorized")
                }
        })
    }

    //update property where posts are pulled from when rendering page
    updateDisplayedPosts = () => {
        let displayedPosts = [];

        this.state.posts.forEach(post => {
            let thisPost = {
                id: "",
                user: "",
                title: "",
                content: "",
                creationDate: ""                
            }

            let curtailedContent;
            if(post.content.length > 100) {
                curtailedContent = post.content.substring(0,100) + "...";
            } else {
                curtailedContent = post.content
            }

            thisPost.id = post.id;
            thisPost.title = post.title;
            thisPost.content = curtailedContent;
            thisPost.creationDate = post.creationDate;
            displayedPosts.push(thisPost);
        });
        this.setState({displayedPosts: displayedPosts})
    }

    expandPost = (e) => {
        let fullText = this.state.posts.find((post) => {
            return(
                parseInt(post.id) === parseInt(e.target.id)
            )
        }).content;
        let tempDisplayedPosts = this.state.displayedPosts;
        let fullTextIndex = tempDisplayedPosts.findIndex((post) => parseInt(post.id) === parseInt(e.target.id))

        if (fullText === e.target.value) {
            // tempDisplayedPosts[fullTextIndex].content = fullText.substring(0,100) + "...";
        } else {
            tempDisplayedPosts[fullTextIndex].content = fullText;
            e.target.value=fullText
        }
        this.setState({displayedPosts: tempDisplayedPosts})
        e.target.style={cursor: "caret"}


        
    }

    deletePost = (e) => {
        // console.log(e.target.id);
        Axios.get(`${port}/isUserAuth`, {headers: {
            "x-access-token": localStorage.getItem("token"),
            }}).then((res) => {
                if (res.data) { //pull user's posts if authenticated
                    console.log(`${localStorage.getItem("username")} authorized`)
                    console.log(e.target.id)
                    Axios.delete(`${port}/api/deletepost`, { data:{ id: e.target.id }})
                    .then((res) => {
                        // console.log(res)
                        this.updatePropsFromDb();
                    })
            }
        })
    }

    updatePost = () => {
        console.log("updating post in db")
    }

    postChanged = () => {
        console.log("values changed")
    }


    renderPosts = () => {
        // console.log(this.state.posts)
        let output = ""
        if (this.state.displayedPosts) {
            output = this.state.displayedPosts.map(post => {
                return(
                    <div key={`${post.id}_container`}>
                        <div className="container" key={post.id}>
                            <div className='row'>
                                <label className="col-md-6" style={{textAlign: "left", fontSize: "28px"}}>{post.title}</label>
                                <div className="col-md-3"></div>
                                <div className="col-md">
                                    <button id={`${post.id}`} className="row" style={{cursor: "pointer"}} onClick={(e) => {this.deletePost(e)}}>Delete Post</button>
                                    <label className="row" style={{textAlign: "right"}}>Date: {post.creationDate.substring(0, 10)}</label>
                                </div>
                            </div>
                            <div className='row pb-1'>
                                <TextareaAutosize id={post.id} readOnly={false} defaultValue={post.content} onChange={(e) => {this.postChanged()}} onFocus={(e) => {this.expandPost(e)}} style={{cursor: "pointer"}}></TextareaAutosize>
                            </div>
                            <div className="row pb-1">
                                <div className="col-md-9"></div>
                                <button className="col-md-2" style={{cursor: "pointer"}} onClick={(e) => {this.updatePost(e)}}>Save Edits</button>
                            </div>
                        </div>
                        <div className="row mb-3" key={`${post.id}_space`}></div>
                    </div>
    
                )
            });
        }

        return(
            <div>
                {output}
            </div>
        );
    }   


    render() {

        return(
            <div className="content_page>">
                <h2>My Glorious Content</h2>

                {(() => {
                    switch (this.state.posts) {
                        case null:
                            return(
                                <div>
                                </div>
                            )
                        default:
                            return (
                                <div>
                                    <this.renderPosts />
                                </div>
                            )
                    }
                })()}
            </div>
        )
    }
}

export default _User_Posts_page;


//USER STORIES
// After logging in, the blogger should be redirected to all of their blog posts.
//As a blogger I want to be able to see all of the posts I have created so that I can track my progress.
//The blog posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.

//As a blogger I want to be able to see any individual post I have made.
//The full post should be displayed.
//As a blogger I want to be able to edit a post so that I can fix any mistakes I made creating it.
//When the user toggles edit mode, the page remains the same and the fields become editable.

//As a blogger I want to be able to delete a post so that I can remove any unwanted content.
//When the user deletes the blog they should be redirected to all of their blog posts.



