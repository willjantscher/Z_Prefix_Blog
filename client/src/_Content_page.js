import React, {Component} from "react";
import Axios from 'axios';
import './App.css';
import TextareaAutosize from 'react-textarea-autosize';
// const port = "http://localhost:8080"
const port = "https://jantscher-z-prefix-blog.herokuapp.com"
// require('dotenv').config()
// const port = "mysql://b76457c30cc8ea:7dfff6d3@us-cdbr-east-05.cleardb.net/heroku_a4405003a2a182f?reconnect=true" || 8080;

class _Content_page extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            posts: null,
            usernames: null,
            displayedPosts: null
        }
    }

    componentDidMount() {
        //fetch all posts here
        Axios.get(`${port}/api/getallposts`).then((res) => {
            console.log(res.data)
            this.setState({ posts: res.data.reverse()})
            // console.log(this.state.posts)
        }).then(
            Axios.get(`${port}/api/getallusers`).then((res) => {   
                console.log('usernames' + res.data)       
                this.setState({ usernames: res.data })
                this.updateDisplayedPosts();
            })
        )
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

            let username = this.state.usernames.find((user) => {
                return (user.id === post.userId)
            }).username

            let curtailedContent;
            if(post.content.length > 100) {
                curtailedContent = post.content.substring(0,100) + "...";
            } else {
                curtailedContent = post.content
            }

            thisPost.id = post.id;
            thisPost.user = username;
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

        if (expandedText === e.target.value && expandedText.length > 100) {
            tempDisplayedPosts[expandedTextIndex].content = expandedText.substring(0,100) + "...";
        } else {
            tempDisplayedPosts[expandedTextIndex].content = expandedText;
        }
        this.setState({displayedPosts: tempDisplayedPosts})
        e.target.blur();
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
                                    <label className="row">- {post.user}</label>
                                    <label className="row" style={{textAlign: "right"}}>Date: {post.creationDate.substring(0, 10)}</label>
                                </div>
                            </div>
                            <div className='row pb-4'>
                                <TextareaAutosize id={post.id} readOnly={true} value={post.content} onFocus={(e) => {this.expandPost(e)}} style={{cursor: "pointer"}}></TextareaAutosize>
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
                <h2>Content for Consumption</h2>

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

export default _Content_page;




//USER STORIES
//As a visitor I want to be able to view all posts created by all users so that I can consume content.
//Unauthenticated users should be able to view all posts, and any single post.
//The posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.

//As a visitor I want to be able to view a specific post created by all users so that I can consume content.
//Unauthenticated users should be able to view all posts, and any single post.
//As a blogger I want to be able to view all posts created by all users so that I can see other people’s content.
//Unauthenticated users should be able to view all posts, and any single post.


