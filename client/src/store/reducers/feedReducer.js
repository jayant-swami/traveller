const initialState = {
  feed: [
    //  {
    //   post_id: "",
    //   avatar: "default",
    //   userName: "",
    //   postDate: new Date(),
    //   postTitle: "",
    //   postContent: "",
    //   postLikes: [],
    //   comments: []
    //  }
  ]
};

const feedReducer = (state = initialState, action) => {
  if (action.type === "GET_FEED") {
    //   console.log("get_feed_reducer");
    //   console.log(action.payload);
    let newState = { ...state, feed: action.payload };
    return newState;
  }

  if (action.type === "ADD_FEED") {
    console.log(action.payload);
    let newState = { ...state, feed: [action.payload, ...state.feed] };
    return newState;
  }
  if (action.type === "UPDATE_LIKES") {
    console.log(action.payload);
    console.log(state.feed);
    let postIndex = state.feed.findIndex(
      post => post.post_id === action.payload.postId
    );
    if (postIndex !== -1) {
      let likeIndex = state.feed[postIndex].postLikes.findIndex(
        userVal => userVal === action.payload.userName
      );
      if (likeIndex !==-1) {
        let newLikes = [...state.feed[postIndex].postLikes];
        newLikes = newLikes.filter(
          userVal => userVal !== action.payload.userName
        );
        let newState = {
          ...state,
          feed: [
            ...state.feed.slice(0, postIndex),
            { ...state.feed[postIndex], postLikes: [...newLikes] },
            ...state.feed.slice(postIndex + 1)
          ]
        };
        return newState;
      } else {
        let newLikes = [
          ...state.feed[postIndex].postLikes,
          action.payload.userName
        ];
        let newState = {
          ...state,
          feed: [
            ...state.feed.slice(0, postIndex),
            { ...state.feed[postIndex], postLikes: [...newLikes] },
            ...state.feed.slice(postIndex + 1)
          ]
        };
        return newState;
      }
    }
  } else {
    return state;
  }
};

export default feedReducer;
