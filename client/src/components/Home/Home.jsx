import React, { useState, useEffect } from "react";
import Nav from "./Nav.jsx";
import "../Component Styles/Home/Home.css";
import Logout from "../Logout.jsx";
import Post from "../Home/Post.jsx";
import { connect } from "react-redux";
import feedPostsActions from "../../store/actions/feedPostsActions";
import Spinner from "../Spinner.jsx";
import axios from "axios";

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
    post_content: "",
    media: {
      name: "",
      type: "",
      size: "",
      secure_url: ""
    }
  });

  const handleFormInput = e => {
    console.log(e.target.name);
    setPost({ ...createPost, [e.target.name]: e.target.value });
  };

  const handlepostImage = async e => {
    console.log("Starting State");
    console.log(createPost);
    let localFile = e.target.files[0];

    console.log("Media Received");
    console.log(localFile);

    if (localFile.size <= 1000000) {
      setPost({
        ...createPost,
        media: {
          ...createPost.media,
          name: localFile.name,
          type: localFile.type,
          size: localFile.size
        }
      });

      console.log("State before cloudinary upload");
      console.log(createPost);

      try {
        let data = new FormData();
        data.append("file", localFile);
        data.append("upload_preset", "xpwbhocm");

        delete axios.defaults.headers.common["x-auth-token"];
        const url = "https://api.cloudinary.com/v1_1/jayant/image/upload";
        let res = await axios.post(url, data);

        console.log("Image uploaded to cloudinary");
        console.log(res.data);

        axios.defaults.headers.common['x-auth-token'] = localStorage.getItem('token')

        setPost({
          ...createPost,
          media: {
            ...createPost.media,
            name: localFile.name,
            type: localFile.type,
            size: localFile.size,
            secure_url: res.data.secure_url
          }
        });
        console.log("State After Cloudinary Upload");
        console.log(createPost);
      } catch (error) {
        console.log(error);
        setPost({
          ...createPost,
          media: {
            ...createPost.media,
            name:
              "Error occured while uploading to the server. Please try again"
          }
        });
      }
    } else {
      setPost({
        ...createPost,
        media: {
          ...createPost.media,
          name: "Error: File should be less than 1 MB",
          type: localFile.type,
          size: localFile.size
        }
      });
    }
  };

  const handleCreatePost = () => {
    if (createPost.post_title && createPost.post_content) {
      console.log("handleCreatePost");
      console.log(createPost);
      props.createPostAction(createPost);
      setPost({
        ...createPost,
        post_title: "",
        post_content: "",
        media: {
          ...createPost.media,
          name: "",
          type: "",
          size: "",
          secure_url: ""
        }
      });
    }
  };
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
                  value={createPost.post_title}
                ></input>
              </div>
              <div className="CreatePost-Form-Element" id="Post-Content">
                <textarea
                  name="post_content"
                  placeholder="Write your thoughts.."
                  autoComplete="false"
                  onChange={handleFormInput}
                  value={createPost.post_content}
                ></textarea>
              </div>
            </div>
            <div className="CreatePost-Form-Element">
              <input
                type="file"
                name="post_image"
                id="postImage"
                onChange={handlepostImage}
                accept="image/png, image/jpeg"
                multiple={false}
              ></input>
              <label htmlFor="postImage" title="Choose an image">
                {"\u26F6 "}
                {createPost.media.name && <span>{createPost.media.name}</span>}
              </label>
            </div>
            <button
              className="CreatePost-Btn"
              disabled={!(createPost.post_title && createPost.post_content)}
              onClick={handleCreatePost}
            >
              {"Post \u27A4"}
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
            postImageSource={post.media.secure_url || ""}
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
