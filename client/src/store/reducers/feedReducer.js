const initialState = {
  feed: [
    {
      post_id: "",
      avatar: "default",
      userName: "",
      postDate: new Date(),
      postTitle: "",
      postContent:"",
      postLikes: [],
      comments: []
    }
  ]
};

const feedReducer = (state = initialState, action) => {
  if (action.type === "GET_FEED") {
    //   console.log("get_feed_reducer");
    //   console.log(action.payload);
    let newState = { ...state,
    feed: action.payload };
    return newState;
  } else {
    return state;
  }
};

export default feedReducer;
