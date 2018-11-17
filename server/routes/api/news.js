import express from "express";
import passport from "passport";
import webhoseio from "webhoseio";

const logic = express.Router();

const client = webhoseio.config({token: 'ad4ead69-e506-4979-be04-e12ec7eb4d0d'});
const query_params = {
"q": "language:english site_type:news site_category:financial_news thread.section_title:finance",
"ts": "1540928705348",
"sort": "relevancy"
}

logic.get("/getNews", function(req, res) {
  var newUser = req.body;
  console.log("calling");
  console.log("User LOGOUT request recieved>", newUser);
  client.query("filterWebContent", query_params).then(output => {
    res.json(output);
  });
});

logic.get("/test", (req, res) => res.json(console.log({ msg: "GOT IT" })));

export default logic;
