import mongoose from "mongoose";
import User from "../models/user";
import keys from "../config/keys";
import { Strategy as JwtStrat } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.SecretOrKey;

export default passport => {
  passport.use(
    new JwtStrat(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
