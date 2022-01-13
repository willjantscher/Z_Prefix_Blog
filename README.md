## My Blog

### Notes
The front end is built in react and the backend is an express server with a mySQL database. The client and server have been deployed to Heroku jointly and the installed add-on (ClearDB MySQL) hosts the SQL database. 

This is not a great blog, but it does meet all of the requirements and user stories. If this was an actual project, here are some of the first things I would fix/improve:

1. Do not return hashed pass/iv on successful login request
2. Dynamically udpate the nav bar based on who is logged in (or if no one is logged in)
3. Fix post editing so it does not collapse after exiting the editing view and before saving the edit
4. Clean up code, i.e. refactor
    - there are a lot of places where code can be combined and processes can be improved/optimized 
5. Improve the styling and UI

### Project Requirements
- Your application must be deployed and accessible to the public internet
- Your code must be made available to instructors for grading (via the submission link at the end of this section)
- Your application must use a front-end, back-end, and database
- The database should contain at least two entities, a User and a Post, in a one to many relationship, as shown in the ERD below
- You should style your application in order to lay out components in a sensible way
- You should use the following stories to build out the functionality of your app

### User Stories
- As a blogger I want to be able to create an account so that I can create blogs.
    - The user credentials must be salted and hashed before being stored.
- As a blogger I want to be able to log into my account so that I can see all the blogs that I have created.
    - After logging in, the blogger should be redirected to all of their blog posts.
- As a blogger I want to be able to create a new post so that I can share my insights with the world.
    - After the post is created, the blogger should be redirected to all of their blog posts.
    - A post displays title, content, and creation date.
- As a blogger I want to be able to see all of the posts I have created so that I can track my progress.
    - The blog posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.
- As a blogger I want to be able to see any individual post I have made.
    - The full post should be displayed.
- As a blogger I want to be able to edit a post so that I can fix any mistakes I made creating it.
    - When the user toggles edit mode, the page remains the same and the fields become editable.
- As a blogger I want to be able to delete a post so that I can remove any unwanted content.
    - When the user deletes the blog they should be redirected to all of their blog posts.
- As a visitor I want to be able to view all posts created by all users so that I can consume content.
    - Unauthenticated users should be able to view all posts, and any single post.
    - The posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.
- As a visitor I want to be able to view a specific post created by all users so that I can consume content.
    - Unauthenticated users should be able to view all posts, and any single post.
- As a blogger I want to be able to view all posts created by all users so that I can see other people’s content.
    - Unauthenticated users should be able to view all posts, and any single post.# Getting Started with Create React App
