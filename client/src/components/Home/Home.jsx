import React, { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import "../Component Styles/Home/Home.css";
import Logout from "../Logout.jsx";
import Post from "../Home/Post.jsx";
import { connect } from "react-redux";
import feedPostsActions from "../../store/actions/feedPostsActions";
import Spinner from "../Spinner.jsx";

const Home = props => {
  // console.log(props);
  const date = new Date();

  const greetings =
    date.getHours() >= 5 && date.getHours() < 12
      ? "Morning"
      : date.getHours() >= 12 && date.getHours() < 17
      ? "Afternoon"
      : "Evening";

  const heading = "Good " + greetings + " " + props.user.first_name;

  const [createPost, setPost] = useState({
    post_title: "",
    post_content: ""
  });

  const handleFormInput = e => {
    setPost({ ...createPost, [e.target.name]: e.target.value });
  };

  const handleCreatePost = () => {
    if(createPost.post_title && createPost.post_content){
      props.createPostAction(createPost);
    }
  }
  // const currentUserAvatar = "man_2";
  const getPosts = props.getPostsAction;
  useEffect(() => {
    getPosts(props.user.user_name);
  }, [getPosts, props.user]);

  return (
    <div className="Home">
      <div className="Home-Showcase">
        <Spinner></Spinner>
        <div className="WelcomeUser">
          <div className="WelcomeUser-Head">
            <h1>{heading}</h1>
            <img
              src={require("../../img/profile-avatars/" +
                props.user.avatar +
                ".png")}
              alt="User Profile"
            ></img>
          </div>
          <div className="CreatePost">
            <div className="CreatePost-Form">
              <div className="CreatePost-Form-Element" id="Post-Title">
                <input
                  type="text"
                  name="post_title"
                  placeholder="What do you want to write about..?"
                  autoComplete="false"
                  onChange={handleFormInput}
                  value={createPost.title}
                ></input>
              </div>
              <div className="CreatePost-Form-Element" id="Post-Content">
                <textarea
                  name="post_content"
                  placeholder="Write your thoughts.."
                  autoComplete="false"
                  onChange={handleFormInput}
                  value={createPost.content}
                ></textarea>
              </div>
            </div>
            <button
              className="CreatePost-Btn"
              disabled={!(createPost.post_title && createPost.post_content)}
              onClick={handleCreatePost}
            >
              {"\u27A4"}
            </button>
          </div>
        </div>
        {props.feed.map(post => (
          <Post
            key={post.post_id}
            avatarPath={require("../../img/profile-avatars/" +
              post.avatar +
              ".png")}
            postDate={post.postDate}
            userName={post.userName}
            postTitle={post.postTitle}
            postContent={post.postContent}
            postLikes={post.postLikes}
            comments={post.comments}
            currentUser={props.user.user_name}
            postId={post.post_id}
          ></Post>
        ))}
      </div>
      <Logout></Logout>

      <Nav></Nav>
    </div>
  );
};

const mapStoreToProps = store => {
  return {
    feed: store.feedReducer.feed,
    user: store.manageUserReducer.authorization.user
  };
};

export default connect(mapStoreToProps, feedPostsActions)(Home);
