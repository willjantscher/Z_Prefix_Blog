import React, {Component} from "react";
import Axios from 'axios';
import './App.css';

class _Content_page extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            posts: null,
        }
    }

    componentDidMount() {
        const port = "http://localhost:3001"
        //fetch all posts here
        Axios.get(`${port}/api/getallposts`).then((res) => {
            // console.log(res.data);
            this.setState({ posts: res.data})
            // console.log(this.state.posts)
        })
    }

    renderPosts = () => {
        // console.log(this.state.posts)
        let output = this.state.posts.map(post => {
            return(
                <div key={`${post.id}_container`}>
                    <div className="container" key={post.id}>
                        <div className='row'>
                            <label className="col-md" style={{textAlign: "left", fontSize: "24px"}}>Title: {post.title}</label>
                            <div className="col-md-6"></div>
                            <label className="col-md pt-2" style={{textAlign: "right"}}>Date: {post.creationDate}</label>
                        </div>
                        <div className='row pb-4'>
                            <textarea defaultValue={post.content}></textarea>
                        </div>
                    </div>
                    <div className="row mb-3" key={`${post.id}_space`}></div>
                </div>

            )
        });
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


