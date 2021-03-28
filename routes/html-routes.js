// Requiring path to so we can use relative routes to our HTML files
const { reverse } = require("dns");
const path = require("path");
const axios = require('axios');
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function (app) {

  const items = [
    {
        name: "Dairy",
        ingredients: ["butter", "egg", "milk", "parmesan", "cheddar", "american cheese", "sour cream", "cream cheese", "mozzarella", "yogurt", "cream", "evaporated milk", "whipped cream", "half and half", "feta", "monterey jack cheese", "condensed milk", "cottage cheese", "ice cream", "swiss cheese", "velveeta", "frosting", "buttermilk", "ricotta", "goat cheese", "provolone", "blue cheese", "powdered milk", "colby cheese", "pepper jack", "italian cheese", "soft cheese", "gouda", "pepperjack cheese", "romano", "brie", "pizza cheese", "ghee", "creme fraiche", "cheese soup", "gruyere", "pecorino cheese", "custard", "muenster", "queso fresco cheese", "hard cheese", "havarti cheese", "asiago", "mascarpone", "neufchatel", "halloumi", "paneer", "brick cheese", "camembert cheese", "goat milk", "garlic herb cheese", "edam cheese", "manchego", "fontina", "stilton cheese", "emmenthaler cheese", "red leicester cheese", "jarlsberg cheese", "bocconcini cheese", "farmer cheese", "creme de cassis", "wensleydale cheese", "longhorn cheese", "double gloucester cheese", "raclette cheese", "lancashire cheese", "cheshire cheese"]
    },
    {
      name: "Meat",
      ingredients: ["chicken breast",	"ground beef",	"bacon",	"sausage",	"beef steak",	"ham",	"hot dog",	"pork chops",	"chicken thighs",	"ground turkey",	"cooked chicken",	"turkey",	"pork",	"pepperoni",	"whole chicken",	"chicken leg",	"ground pork",	"chorizo",	"chicken wings",	"beef roast",	"polish sausage",	"salami",	"pork roast",	"ground chicken",	"pork ribs",	"spam",	"venison",	"pork shoulder",	"bologna",	"bratwurst",	"prosciutto",	"lamb",	"corned beef",	"chicken roast",	"lamb chops",	"pancetta",	"ground lamb",	"beef ribs",	"duck",	"pork belly",	"beef liver",	"leg of lamb",	"canadian bacon",	"beef shank",	"veal",	"chicken giblets",	"cornish hen",	"lamb shoulder",	"lamb shank",	"deer",	"ground veal",	"pastrami",	"rabbit",	"sliced turkey",	"pork loin",	"elk",	"beef suet",	"veal cutlet",	"lamb loin",	"marrow bones",	"goose",	"chicken tenders",	"veal chops",	"quail",	"oxtail",	"pheasant",	"lamb liver",	"moose",	"turkey liver",	"pork liver",	"veal shank",	"foie gras",	"beef sirloin",	"liver sausage",	"sweetbread",	"wild boar",	"snail",	"pigeon",	"duck liver",	"goose liver",	"grouse",	"ostrich",	"soppressata"],
    },
    {
      name: "Grains",
      ingredients: ["rice",	"pasta",	"flour",	"bread",	"baking powder",	"baking soda",	"bread crumbs",	"cornstarch",	"rolled oats",	"noodle",	"flour tortillas",	"pancake mix",	"yeast",	"cracker",	"quinoa",	"brown rice",	"cornmeal",	"self rising flour",	"cake mix",	"saltines",	"popcorn",	"macaroni cheese mix",	"corn tortillas",	"ramen",	"cereal",	"biscuits",	"stuffing mix",	"couscous",	"pie crust",	"bisquick",	"chips",	"angel hair",	"coconut flake",	"bread flour",	"croutons",	"lasagne",	"pizza dough",	"bagel",	"puff pastry",	"hot dog bun",	"barley",	"multigrain bread",	"potato flakes",	"pretzel",	"cornbread",	"english muffin",	"cornflour",	"crescent roll dough",	"cream of wheat",	"coconut flour",	"pita",	"risotto",	"muffin mix",	"bicarbonate of soda",	"ravioli",	"wheat",	"rice flour",	"polenta",	"baguette",	"gnocchi",	"vermicelli",	"semolina",	"wheat germ",	"buckwheat",	"croissants",	"bread dough",	"filo dough",	"yeast flake",	"pierogi",	"matzo meal",	"rye",	"tapioca flour",	"shortcrust pastry",	"potato starch",	"breadsticks",	"ciabatta",	"spelt",	"angel food",	"tapioca starch",	"starch",	"whole wheat flour",	"gram flour",	"sourdough starter",	"wafer",	"bran",	"challah",	"sponge cake",	"malt extract",	"sorghum flour"],
    },
    {
      name: "Vegetables",
      ingredients: ["onion","garlic","tomato","lettuce","potato","carrot","bell pepper","basil","parsley","broccoli","corn","spinach","mushroom","green beans","ginger","chili pepper","celery","rosemary","salad greens","red onion","cucumber","sweet potato","pickle","avocado","zucchini","cilantro","frozen vegetables","olive","asparagus","cabbage","cauliflower","dill","kale","mixed vegetable","pumpkin","squash","mint","scallion","sun dried tomato","shallot","eggplant","beet","butternut squash","horseradish","leek","caper","brussels sprout","artichoke heart","chia seeds","radish","sauerkraut","artichoke","portobello mushroom","sweet pepper","arugula","spaghetti squash","capsicum","bok choy","parsnip","okra","yam","fennel","turnip","snow peas","bean sprouts","seaweed","chard","collard","canned tomato","pimiento","watercress","tomatillo","rocket","mustard greens","bamboo shoot","rutabaga","endive","broccoli rabe","jicama","kohlrabi","hearts of palm","butternut","celery root","daikon","radicchio","porcini","chinese broccoli","jerusalem artichoke","cress","water chestnut","dulse","micro greens","burdock","chayote"],
    },
    {
      name: "Fruits",
      ingredients: ["lemon",	"apple",	"banana",	"lime",	"strawberry",	"orange",	"pineapple",	"blueberry",	"raisin",	"coconut",	"grape",	"peach",	"raspberry",	"cranberry",	"mango",	"pear",	"blackberry",	"cherry",	"date",	"watermelon",	"berries",	"kiwi",	"grapefruit",	"mandarin",	"craisins",	"cantaloupe",	"plum",	"apricot",	"clementine",	"prunes",	"apple butter",	"pomegranate",	"nectarine",	"fig",	"tangerine",	"papaya",	"rhubarb",	"sultanas",	"plantain",	"currant",	"passion fruit",	"guava",	"persimmons",	"lychee",	"lingonberry",	"tangelos",	"kumquat",	"boysenberry",	"star fruit",	"quince",	"honeydew",	"crabapples"],
    },
    {
      name: "Sweeteners",
      ingredients: ["sugar",	"brown sugar",	"honey",	"confectioners sugar",	"maple syrup",	"corn syrup",	"molasses",	"artificial sweetener",	"agave nectar"],
    },
    {
      name: "Fish",
      ingredients: ["canned tuna",	"salmon",	"tilapia",	"fish fillets",	"cod",	"canned salmon",	"anchovy",	"smoked salmon",	"sardines",	"tuna steak",	"whitefish",	"halibut",	"trout",	"haddock",	"flounder",	"catfish",	"mahi mahi",	"mackerel",	"sole",	"sea bass",	"red snapper",	"swordfish",	"pollock",	"herring",	"perch",	"grouper",	"caviar",	"monkfish",	"rockfish",	"lemon sole",	"pike",	"barramundi",	"eel",	"bluefish",	"carp",	"cuttlefish",	"pompano",	"arctic char",	"john dory",	"marlin",	"amberjack",	"sturgeon"],
    },
    {
      name: "Condiments",
      ingredients: ["mayonnaise",	"ketchup",	"mustard",	"vinegar",	"soy sauce",	"balsamic vinegar",	"worcestershire",	"hot sauce",	"barbecue sauce",	"ranch dressing",	"wine vinegar",	"apple cider vinegar",	"cider vinegar",	"italian dressing",	"rice vinegar",	"salad dressing",	"tabasco",	"fish sauce",	"teriyaki",	"steak sauce",	"tahini",	"enchilada sauce",	"vinaigrette dressing",	"oyster sauce",	"honey mustard",	"sriracha",	"caesar dressing",	"taco sauce",	"mirin",	"blue cheese dressing",	"sweet and sour sauce",	"thousand island",	"picante sauce",	"buffalo sauce",	"french dressing",	"tartar sauce",	"cocktail sauce",	"marsala",	"adobo sauce",	"tzatziki sauce",	"sesame dressing",	"ponzu",	"duck sauce",	"pickapeppa sauce",	"yuzu juice",	"cream sauce"],
    },
    {
      name: "Oils",
      ingredients: ["olive oil",	"vegetable oil",	"cooking spray",	"canola oil",	"shortening",	"sesame oil",	"coconut oil",	"peanut oil",	"sunflower oil",	"lard",	"grape seed oil",	"corn oil",	"almond oil",	"avocado oil",	"safflower oil",	"walnut oil",	"hazelnut oil",	"palm oil",	"soybean oil",	"mustard oil",	"pistachio oil",	"soya oil"],
    },
    {
      name: "Seasoning",
      ingredients: ["bouillon",	"ground ginger",	"sesame seed",	"cream of tartar",	"chili sauce",	"soya sauce",	"apple cider",	"hoisin sauce",	"liquid smoke",	"rice wine",	"vegetable bouillon",	"poppy seed",	"balsamic glaze",	"miso",	"wasabi",	"fish stock",	"rose water",	"pickling salt",	"champagne vinegar",	"bbq rub",	"jamaican jerk spice",	"accent seasoning",	"pickling spice",	"mustard powder",	"mango powder",	"adobo seasoning",	"kasuri methi",	"caribbean jerk seasoning",	"brine",	"matcha powder",	"cassia"],
    },
    {
      name: "Sauces",
      ingredients: ["tomato sauce",	"tomato paste",	"salsa",	"pesto",	"alfredo sauce",	"beef gravy",	"curry paste",	"chicken gravy",	"cranberry sauce",	"turkey gravy",	"mushroom gravy",	"sausage gravy",	"onion gravy",	"cream gravy",	"pork gravy",	"tomato gravy",	"giblet gravy"]
    },
  ];

  // [{type:"milk"},{type:"butter"},{type:"eggs"}];
  app.get("/", (req, res) => {
    // res.render("index");
    // res.render('index', { ingredients: dairy });
    res.render('index', {
      items:items,
    });
  });

  app.get("/user/:id", (req, res) => {
    // res.render("index");
    // res.render('index', { ingredients: dairy });
    res.render('index', {
      items:items,
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
    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${req.params.ingredients}&ranking=2&apiKey=51f3cdfc80964978a1b1035f9bf64575`, {
    }).then(function (response) {
      
      console.log(response.data.map(recipe => recipe.missedIngredientCount > 0 ? ({...recipe, missedIngredientCount: true}) : ({...recipe, missedIngredientCount: false})));
      
      // res.json(response.data);
    
      res.render("recipes", {
        recipes: response.data.map(recipe => recipe.missedIngredientCount > 0 ? ({...recipe, missedIngredientCount: true}) : ({...recipe, missedIngredientCount: false})),
      
      });
      
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
      res.render("recipe", {
        recipe: response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  });


  app.get("/favorites/:userId", (req, res) => {
    // If the user already has an account send them to the members page
    res.render("favorites");
  });

  
};
