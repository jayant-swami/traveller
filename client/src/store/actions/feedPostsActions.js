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
          comments: [...postVal.comments]
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
    const body = { title: post.post_title, content: post.post_content };
    try {
      let res = await axios.post("/api/posts/new", body, header);
      if (res.data.status === "SUCCESS") {
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
    } catch (error) {}
  }
};

export default feedPostsActions;
