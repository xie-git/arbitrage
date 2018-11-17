import express from "express";
import User from "../../models/user";
import gravatar from "gravatar";
import Bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../../config/keys";
import passport from "passport";
import ValidateRegisterInput from "../../validation/register";
import ValidateLoginInput from "../../validation/login";
const router = express.Router();

//@route GET/api/users/test
//@desc Tests users route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "User route works" }));

//@route POST/api/users/register
//@desc Register the user
//@access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = ValidateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: 200, //Size
        r: "pg", //Rating
        d: "mm" //Default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        Avatar: avatar,
        password: req.body.password
      });

      console.log(avatar);
      console.log(newUser);

      Bcrypt.genSalt(10, (err, salt) => {
        Bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log);
        });
      });
    }
  });
});

//@route GET/api/users/login
//@desc Log the user in
//@access Public

router.post("/login", (req, res) => {
  const { errors, isValid } = ValidateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json(errors);
    }
    Bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, name: user.name, Avatar: user.Avatar };
        jwt.sign(
          payload,
          keys.SecretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route GET/api/users/fblogin
//@desc Log the user in with their FB account
//@access Public

router.post("/fblogin", (req, res) => {
  const user = req.body;
  const email = user.email;
  User.findOne({ email }).then(retrievedUser => {
    if (!retrievedUser) {
      //use fb id since none exists
      const payload = { id: user.id, name: user.name };
      jwt.sign(payload, keys.SecretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({ success: true, token: "Bearer " + token });
      });
    } else {
      //use already existing id from retrieveduser
      //automatically allow sign in for facebook acccounts
      //no need for DB queries, encrypting token
      //with  jwt for log in/out
      const payload = { id: retrievedUser.id, name: user.name };
      jwt.sign(payload, keys.SecretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({ success: true, token: "Bearer " + token });
      });
    }
  });
});

//@route GET/api/users/glogin
//@desc Log the user in with their Google account
//@access Public

router.post("/glogin", (req, res) => {
  const user = req.body;
  const email = user.email;
  User.findOne({ email }).then(retrievedUser => {
    if (!retrievedUser) {
      //use google id since none exists
      const payload = { id: user.id, name: user.name };
      jwt.sign(payload, keys.SecretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({ success: true, token: "Bearer " + token });
      });
    } else {
      //use already existing id from retrieveduser
      //automatically allow sign in for facebook acccounts
      //no need for DB queries, encrypting token
      //with  jwt for log in/out
      const payload = { id: retrievedUser.id, name: user.name };
      jwt.sign(payload, keys.SecretOrKey, { expiresIn: 3600 }, (err, token) => {
        res.json({ success: true, token: "Bearer " + token });
      });
    }
  });
});

//@route GET/api/users/current
//@desc Return current user
//@access Private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

export default router;
