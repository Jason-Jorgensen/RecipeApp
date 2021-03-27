// Requiring path to so we can use relative routes to our HTML files
const { reverse } = require("dns");
const path = require("path");
const axios = require('axios');

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  const items = [
    {
      dairy: ["butter", "egg", "milk", "parmesan", "cheddar", "american cheese", "sour cream", "cream cheese", "mozzarella", "yogurt", "cream", "evaporated milk", "whipped cream", "half and half", "feta", "monterey jack cheese", "condensed milk", "cottage cheese", "ice cream", "swiss cheese", "velveeta", "frosting", "buttermilk", "ricotta", "goat cheese", "provolone", "blue cheese", "powdered milk", "colby cheese", "pepper jack", "italian cheese", "soft cheese", "gouda", "pepperjack cheese", "romano", "brie", "pizza cheese", "ghee", "creme fraiche", "cheese soup", "gruyere", "pecorino cheese", "custard", "muenster", "queso fresco cheese", "hard cheese", "havarti cheese", "asiago", "mascarpone", "neufchatel", "halloumi", "paneer", "brick cheese", "camembert cheese", "goat milk", "garlic herb cheese", "edam cheese", "manchego", "fontina", "stilton cheese", "emmenthaler cheese", "red leicester cheese", "jarlsberg cheese", "bocconcini cheese", "farmer cheese", "creme de cassis", "wensleydale cheese", "longhorn cheese", "double gloucester cheese", "raclette cheese", "lancashire cheese", "cheshire cheese"],
    },
    {
      meat: ["ground beef", "turkey"],
    },
    {
      grains: ["flour", "bread", "tortilla"],
    }
  ];

  // [{type:"milk"},{type:"butter"},{type:"eggs"}];
  app.get("/", (req, res) => {
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
    res.render("login");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/search/:ingredients", (req, res) => {
    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${req.params.ingredients}&apiKey=51f3cdfc80964978a1b1035f9bf64575`, {
    }).then(function (response) {
      
      console.log(response.data);
      
      // res.json(response.data);
    
      res.render("recipes", {recipes: response.data});
      
    })
    .catch(function (error) {
      console.log(error);
    });
  });

  app.get("/recipes/:id", (req, res) => {
    axios.get(`https://api.spoonacular.com/recipes/${req.params.id}/information?apiKey=51f3cdfc80964978a1b1035f9bf64575`, {
    }).then(function (response) {
      
      console.log(response.data);
      
      // res.json(response.data);
    
      res.render("recipe", {recipe: response.data});
      
    })
    .catch(function (error) {
      console.log(error);
    });
  });
};
