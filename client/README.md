Below you will find the necessary requirements for the CRUD app you will build, as well as user stories that provide you with the desired behavior for your app.

Requirements
Your application must be deployed and accessible to the public internet
Your code must be made available to instructors for grading (via the submission link at the end of this section)
Your application must use a front-end, back-end, and database
The database should contain at least two entities, a User and a Post, in a one to many relationship, as shown in the ERD below
You should style your application in order to lay out components in a sensible way
You should use the following stories to build out the functionality of your app
Stories
As a blogger I want to be able to create an account so that I can create blogs.
The user credentials must be salted and hashed before being stored.
As a blogger I want to be able to log into my account so that I can see all the blogs that I have created.
After logging in, the blogger should be redirected to all of their blog posts.
As a blogger I want to be able to create a new post so that I can share my insights with the world.
After the post is created, the blogger should be redirected to all of their blog posts.
A post displays title, content, and creation date.
As a blogger I want to be able to see all of the posts I have created so that I can track my progress.
The blog posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.
As a blogger I want to be able to see any individual post I have made.
The full post should be displayed.
As a blogger I want to be able to edit a post so that I can fix any mistakes I made creating it.
When the user toggles edit mode, the page remains the same and the fields become editable.
As a blogger I want to be able to delete a post so that I can remove any unwanted content.
When the user deletes the blog they should be redirected to all of their blog posts.
As a visitor I want to be able to view all posts created by all users so that I can consume content.
Unauthenticated users should be able to view all posts, and any single post.
The posts should only display the first 100 characters with “...” at the end if they are longer than 100 characters.
As a visitor I want to be able to view a specific post created by all users so that I can consume content.
Unauthenticated users should be able to view all posts, and any single post.
As a blogger I want to be able to view all posts created by all users so that I can see other people’s content.
Unauthenticated users should be able to view all posts, and any single post.# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


TO Do

add encryption to database storage of credentials salted/hashed
add react route to create different pages/route between them



POST MUST INCLUDE TITLE, CONTENT, AND CREATION DATE

