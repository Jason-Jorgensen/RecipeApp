document.addEventListener('DOMContentLoaded', (event) => {
    if (event) {
        console.info('DOM loaded');
    };
    let ingredients = [];

    $("#downButton").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".recipeBoxes").offset().top
        }, 1000);
    });
  

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
            // console.log('working');
            if (ingredients.length === 0) {
                alert("No Items were selected. Please select the items you have in your fridge and pantry and we'll find you some delicious recipes.");
            }else{
            location.href = `/search/${ingredients.join(",")}`
            }
            
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

    const goFavorites= document.getElementById('favoritesBtn');
    if (goFavorites) {
        goFavorites.addEventListener('click', (e) => {
            e.preventDefault();
            location.href = `/favorites/:userId`;
        });
    };

    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

});


