// Requiring path to so we can use relative routes to our HTML files
const { reverse } = require("dns");
const path = require("path");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  const items = [
    {
      dairy:["milk","butter","cream","cheese"],
    },
    {
      meat:["ground beef","turkey"],
    },
    {
      grains:["flour", "bread", "tortilla"],
    } 
  ];
  
  // [{type:"milk"},{type:"butter"},{type:"eggs"}];
  app.get("/", (req,res) => {
    // res.render("index");
    // res.render('index', { ingredients: dairy });
    res.render('index', {
      dairy: items[0],
      meat: items[1],
      grains: items[2],
    });
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/search/:ingredients", (req,res) => {
    res.render("recipes");
  });
};
