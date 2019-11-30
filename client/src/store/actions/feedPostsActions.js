import axios from "axios";

const feedPostsActions = {
  getPostsAction: user_name => async dispatch => {
    // console.log("Get Posts Action");
    // console.log(user_name);

    const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    dispatch({ type: "TOGGLE_SPINNER", payload: true });
    dispatch({ type: "CHANGE_SPINNER_TEXT", payload: "Getting Feed..." });

    try {
      const header = {
        "Content-Type": "application/json"
      };

      let feed = await axios.get("/api/posts/feed", null, header);

      let feedData = feed.data.map(postVal => {
        return {
          post_id: postVal._id,
          avatar: postVal.user_id.avatar,
          userName: postVal.user_id.user_name,
          postDate: new Date(postVal.posted_on),
          postTitle: postVal.title,
          postContent: postVal.content,
          postLikes: [...postVal.likes],
          comments: [...postVal.comments],
          media: postVal.media
        };
      });

      await timeout(1500);
      dispatch({ type: "GET_FEED", payload: feedData });

      dispatch({ type: "TOGGLE_SPINNER", payload: false });
    } catch (err) {
      console.log(err);
    }
  },

  createPostAction: post => async dispatch => {
    const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
    };

    dispatch({ type: "TOGGLE_SPINNER", payload: true });
    dispatch({ type: "CHANGE_SPINNER_TEXT", payload: "Creating Post..." });

    const header = {
      "Content-Type": "application/json"
    };
    const body = { title: post.post_title, content: post.post_content , media:post.media };
    console.log("createPostAction");
    console.log(body);
    try {
      let res = await axios.post("/api/posts/new", body, header);
      if (res.data.status === "SUCCESS") {
        console.log("Response from server")
        console.log(res.data.post)
        let newPost={
          post_id: res.data.post._id,
          avatar: res.data.post.avatar,
          userName: res.data.post.user_name,
          postDate: new Date(res.data.post.posted_on),
          postTitle: res.data.post.title,
          postContent: res.data.post.content,
          postLikes: [...res.data.post.likes],
          comments: [...res.data.post.comments],
          media: res.data.post.media
        }
        dispatch({type:"ADD_FEED",payload: newPost});
        dispatch({ type: "CHANGE_SPINNER_TEXT", payload: "SUCCESS..." });
        await timeout(1500);
        dispatch({ type: "TOGGLE_SPINNER", payload: false });
      } else {
        console.log(res.data);
        dispatch({
          type: "CHANGE_SPINNER_TEXT",
          payload: "Couldn't create post..."
        });
        await timeout(1500);
        dispatch({ type: "TOGGLE_SPINNER", payload: false });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: "CHANGE_SPINNER_TEXT",
        payload: "Couldn't create post..."
      });
      await timeout(1500);
      dispatch({ type: "TOGGLE_SPINNER", payload: false });
    }
  },

  likePostAction: (post) => async dispatch => {

    const header = {
      "Content-Type": "application/json",
    };
    const url="/api/posts/like/" + post.postId;
    try {
      dispatch({type: "UPDATE_LIKES",payload: post});
      let res= await axios.post(url,null,header);

      if(res.data.status==="SUCCESS"){
        console.log(res.data);

      }else{
        throw Error("Error: An error occured while liking the post.")
      }

      
    } catch (error) {
      console.log(error);
      dispatch({type: "UPDATE_LIKES",payload: post});
    }
  }
};

export default feedPostsActions;
