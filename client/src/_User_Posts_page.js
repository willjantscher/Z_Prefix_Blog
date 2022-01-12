import React, {Component, useState, useEffect} from "react";
import Axios from 'axios';
import './App.css';
import TextareaAutosize from 'react-textarea-autosize';


class _User_Posts_page extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            posts: null,
            displayedPosts: null
        }
    }

    componentDidMount() {
        const port = "http://localhost:3001"

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
        let expandedText = this.state.posts.find((post) => {
            return(
                parseInt(post.id) === parseInt(e.target.id)
            )
        }).content;
        let tempDisplayedPosts = this.state.displayedPosts;
        let expandedTextIndex = tempDisplayedPosts.findIndex((post) => parseInt(post.id) === parseInt(e.target.id))

        if (expandedText === e.target.value) {
            tempDisplayedPosts[expandedTextIndex].content = expandedText.substring(0,100) + "...";
        } else {
            tempDisplayedPosts[expandedTextIndex].content = expandedText;
        }
        this.setState({displayedPosts: tempDisplayedPosts})


        //will need to edit the text here, update e.target.value and 
        e.target.value=expandedText
        e.target.style={cursor: "caret"}
        // e.target.blur();
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
                                    <label className="row" style={{textAlign: "right"}}>Date: {post.creationDate}</label>
                                </div>
                            </div>
                            <div className='row pb-4'>
                                <TextareaAutosize id={post.id} readOnly={false} defaultValue={post.content} onFocus={(e) => {this.expandPost(e)}} style={{cursor: "pointer"}}></TextareaAutosize>
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



