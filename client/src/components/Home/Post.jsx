import React from "react";
import { Link } from "react-router-dom";
import "../Component Styles/Home/Post.css";

const Post = props => {

  function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }

  let likedIndex = props.postLikes.findIndex(
    element => element === props.currentUser
  );
  let likeButton = likedIndex !== -1 ? "\u263B" : "\u263A";

  // console.log(props.postDate)

  return (
    <div className="Post">
      <div className="Post-Head">
        <div className="Post-Head-Avatar">
          <img src={props.avatarPath} alt="ProfileImg"></img>
        </div>
        <div className="Post-Head-Text">
          <Link className="Post-Head-Text-Username" to={"blank"}>
            {props.userName}
          </Link>
          <span className="Post-Head-Text-Date">
            {" posted on " + formatDate(props.postDate)}
          </span>
        </div>
        <button>{likeButton}</button>
      </div>
      <div className="Post-Content">
        <h1>{props.postTitle}</h1>
        <p>{props.postContent}</p>
      </div>
      <div className="Post-Footer">
        <span>{props.postLikes.length + " likes"}</span>

        <Link to="blank">{"See full discussion \u22D9"}</Link>
      </div>
    </div>
  );
};

export default Post;
