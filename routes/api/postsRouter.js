const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth");
const postModel = require("../../models/postModel");
const userModel = require("../../models/userModel");
const postValidation = require("../../middleware/postValidation");

//Get Posts feed...
router.get("/feed", tokenAuth, (req, res) => {
  if (req.authentication.status === "SUCCESS") {
    postModel
      .find(
        { is_deleted: false },
        "posted_on user_id title content likes comments",
        { skip: 0, limit: 20, sort: { posted_on: -1 } }
      )
      .populate({
        path: "user_id",
        select: "user_name first_name last_name -_id"
      })
      .exec(function(err, postsVal) {
        if (err) {
          console.log(err);
          res.send("Error: An error occured while getting the feed.");
        } else {
          let newPostsVal = postsVal.map(post => {
            let filterComments = post.comments.filter(
              comment => comment.is_deleted === false
            );
            post.comments = filterComments;
            return (newPost = post);
          });
          res.send(newPostsVal);
        }
      });
  } else {
    res.send("Error: Cannot get feed. Authentication Issue");
  }
});

// Get Single Post
router.get("/:post_id", tokenAuth, (req, res) => {
  if (req.authentication.status === "SUCCESS") {
    postModel
      .find(
        { is_deleted: false, _id: req.params.post_id },
        "posted_on user_id title content likes comments"
      )
      .populate({
        path: "user_id",
        select: "user_name first_name last_name -_id"
      })
      .exec((err, postVal) => {
        if (err) {
          console.log(err);
          res.send("Error: An error occured while getting the post.");
        } else if (postVal) {
            let newPostVal = postVal.map(post => {
                let filterComments = post.comments.filter(
                  comment => comment.is_deleted === false
                );
                post.comments = filterComments;
                return (newPost = post);
              });
          res.send(newPostVal);
        } else {
          res.status(400).send("Could not find the post");
        }
      });
  } else {
    res.send("Error: Cannot get feed. Authentication Issue");
  }
});

// Create new Post
router.post("/new", [tokenAuth, postValidation], (req, res) => {
  if (req.authentication.status === "SUCCESS") {
    if (req.validation.status === "SUCCESS") {
      newPost = postModel({
        user_id: req.authentication.user.id,
        title: req.body.title,
        content: req.body.content,
        likes: [],
        comments: [],
        posted_on: Date.now(),
        is_deleted: false
      });

      newPost
        .save()
        .then(postVal => {
          res.send(postVal);
        })
        .catch(err => {
          console.log(err);
          res
            .status(400)
            .send("Error: An error occured while creating the post.");
        });
    } else {
      res.send(req.validation);
    }
  } else {
    res.send("Error: Cannot get feed. Authentication Issue");
  }
});

// Delete a Post
router.put("/delete/:post_id", tokenAuth, (req, res) => {
  postModel
    .findOneAndUpdate(
      { _id: req.params.post_id, user_id: req.authentication.user.id },
      { is_deleted: true },
      { new: true }
    )
    .then(deletedPost => {
      if (deletedPost) {
        res.send(deletedPost);
      } else {
        throw Error(
          "Error: Could not delete the post. Post does not exist for the user"
        );
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).send("Error: An error occured while deleting post");
    });
});

// Like/Unlike a Post
router.post("/like/:post_id", tokenAuth, async (req, res) => {
  if (req.authentication.status === "SUCCESS") {
    try {
      let postInstance = await postModel.findOne({
        _id: req.params.post_id,
        is_deleted: false
      });

      if (postInstance) {
        console.log(postInstance.likes);
        let likedIndex = postInstance.likes.findIndex(
          element =>
            element.toString() === req.authentication.user.id.toString()
        );
        console.log(likedIndex);
        if (likedIndex !== -1) {
          postInstance.likes.splice(likedIndex, 1);
          let updatedLikes = await postInstance.save();
          res.send(updatedLikes.likes);
        } else {
          postInstance.likes.push(req.authentication.user.id);
          let updatedLikes = await postInstance.save();
          res.send(updatedLikes.likes);
        }
      } else {
        throw Error("Error: Post doesn't exist");
      }
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send("Error: An error occured while liking the post. Mongo Db Error");
    }
  } else {
    res
      .status(400)
      .send("Error: An error occured while liking post. Authentication issue");
  }
});

// Adding comments
router.post("/comment/:post_id", tokenAuth, async (req, res) => {
  if (req.authentication.status === "SUCCESS") {
    try {
      let postInstance = await postModel.findOne({ _id: req.params.post_id });

      if (postInstance) {
        postInstance.comments.push({
          user_id: req.authentication.user.id,
          comment: req.body.comment,
          commented_on: Date.now(),
          is_deleted: false
        });

        let updatedInstance = await postInstance.save();
        res.send(updatedInstance.comments);
      } else {
        throw Error("Error: Post doesn't exist");
      }
    } catch (err) {
      console.log(err);
      res
        .status(400)
        .send("Error: An error occured while creating the comment");
    }
  } else {
    res.status(400).send("Error: Could not find the post");
  }
});

// Delete a Comment
router.put(
  "/comment/:post_id/delete/:comment_id",
  tokenAuth,
  async (req, res) => {
    if (req.authentication.status === "SUCCESS") {
      try {
        let postInstance = await postModel.findOne({ _id: req.params.post_id });

        if (postInstance) {
          let commentIndex = postInstance.comments.findIndex(comment => {
            if (
              comment._id.toString() === req.params.comment_id.toString() &&
              comment.user_id.toString() ===
                req.authentication.user.id.toString()
            ) {
              return true;
            } else {
              return false;
            }
          });

          if (commentIndex !== -1) {
            postInstance.comments[commentIndex].is_deleted = true;
            let updatedInstance = await postInstance.save();
            res.send(updatedInstance.comments);
          } else {
            res.send("Error: Comment doesn't belong to the logged in user");
          }
        } else {
          throw Error("Error: Post doesn't exist");
        }
      } catch (err) {
        console.log(err);
        res
          .status(400)
          .send("Error: An error occured while deleting the comment");
      }
    } else {
      res.status(400).send("Error: Could not find the post");
    }
  }
);

module.exports = router;
