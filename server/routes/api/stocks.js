import express from "express";
import Profile from "../../models/Profile";
import User from "../../models/user";
import mongoose, { ValidationError } from "mongoose";
import passport from "passport";
import ValidateProfileInput from "../../validation/profile";
import { request } from "https";
import Stock from "../../models/Stocks";
const router = express.Router();

//@route GET/api/personalStocks/test
//@desc Tests stocks route
//@access Public
router.get("/test", (req, res) => res.json({ msg: "Profile works" }));

//@route POST/api/personalStocks/AddStock
//@desc Add stock
//@access Private

router.post(
  "/AddStock/:symbol/:price/:change",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params);

    const newStock = new Stock({
      user: req.user.id,
      symbol: req.params.symbol,
      price: req.params.price,
      change: req.params.change
    });
    newStock
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json({ err: "Stock already added" }));
  }
);

//@route GET/api/personalStocks/findStock
//@desc find all user stocks
//@access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Stock.find()
      .then(posts => res.json(posts))
      .catch(err =>
        res.status(404).json({ nopostsfound: "No stocks found with that ID" })
      );
  }
);

//@route GET/api/personalStocks/findStock
//@desc find individual stock by id
//@access Private

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Stock.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err =>
        res.status(404).json({ nostockfound: "No stock found with that ID" })
      );
  }
);

//@route GET/api/personalStocks/findbyUser/:user
//@desc find stocks by user
//@access Private

router.get(
  "/findbyUser/:user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params);
    Stock.find(req.params)
      .then(post => res.json(post))
      .catch(err =>
        res
          .status(404)
          .json({ nostockfound: "No stock found with that user ID" })
      );
  }
);

//@route DELETE/api/personalStocks/deleteStock/:id
//@desc Delete stock
//@access Private

router.delete(
  "/deleteStock/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log(req.params.id);
    Stock.findById(req.params.id)
      .then(stock => {
        stock.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ stocknotfound: "Stock not found" }));
  }
);

//@route GET/api/personalStocks/updatePrice/:user
//@desc update prices of stocks
//@access Private

router.put("/updatePrice/:id/:price/:change", (req, res) => {
  Stock.findByIdAndUpdate(
    { _id: req.params.id },
    { $set: { price: req.params.price, change: req.params.change } },
    { new: true }
  )
    .then(post => res.json(post))
    .catch(err =>
      res
        .status(404)
        .json({ nostockfound: "No stocks found with that user ID" })
    );
});

export default router;
