document.addEventListener('DOMContentLoaded',(event) => {
    if (event) {
        console.info('DOM loaded');
    };
    const axios = require('axios');
    const getRecipes = document.getElementById('recipeBtn');

    if (getRecipes) {
        getRecipes.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('working');

            axios.get('https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples&apiKey=51f3cdfc80964978a1b1035f9bf64575', {
            }).then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        })
    };











});