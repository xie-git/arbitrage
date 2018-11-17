import express from "express";
import passport from "passport";
import Profile from "../../models/Profile";
import mongoose from "mongoose";
import validatePostInput from "../../validation/post";
import Post from "../../models/Post";
const router = express.Router();

//@route GET/api/posts/test
//@desc Tests posts route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Post route works" }));

//@route GET/api/posts
//@desc Get posts
//@access Public

router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(404).json({ nopostsfound: "No posts found with that ID" })
    );
});

//@route GET/api/posts/:id
//@desc Get posts by id
//@access Public

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found with that ID" })
    );
});

//@route POST/api/posts
//@desc Create Post
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      Avatar: req.user.Avatar
    });
    newPost.save().then(post => res.json(post));
  }
);

//@route POST/api/posts/like/:id
//@desc Like post
//@access Private

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if user already liked the post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this post" });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

//@route POST/api/posts/unlike/:id
//@desc Unlike post
//@access Private

router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //check if user already liked the post
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "You have not liked the post" });
          }

          // Get removeIndex
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out the array
          post.likes.splice(removeIndex, 1);

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: "Not liked" }));
    });
  }
);

//@route POST/api/posts/comment/:id
//@desc Add a comment to post
//@access Private

router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          Avatar: req.user.Avatar,
          user: req.user.id
        };

        // Add to the comments array
        post.comments.unshift(newComment);

        //save to db
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

export default router;
