document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    };
    let ingredients = [];

    $('.click-to-toggle').click(function () {
        $(this).toggleClass('selected');
        if (ingredients.includes($(this).text())) {
            ingredients = ingredients.filter(food => food != $(this).text());
        } else {
            ingredients.push($(this).text());
        };
        console.log(ingredients);
    });

    const getRecipes = document.getElementById('recipeBtn');

    if (getRecipes) {
        getRecipes.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('working');
            location.href = `/search/${ingredients.join(",")}`
            // console.log(res.hbsObject));
        });
    };

    const goHome= document.getElementById('home');
    if (goHome) {
        goHome.addEventListener('click', (e) => {
            e.preventDefault();
            location.href = `/`;
        });
    };

    // const goFavorites= document.getElementById('favoritesBtn');
    // if (goFavorites) {
    //     goFavorites.addEventListener('click', (e) => {
    //         e.preventDefault();
    //         location.href = `/favorites/:userId`;
    //     });
    // };

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

    // module.exports = ingredients;
});


