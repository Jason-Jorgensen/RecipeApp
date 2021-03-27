document.addEventListener('DOMContentLoaded',(event) => {
    if (event) {
        console.info('DOM loaded');
    };
    let ingredients = [];

    $('.click-to-toggle').click(function(){
        $(this).toggleClass('selected');
        ingredients.push($(this).text());
        console.log(ingredients);
     });

    const getRecipes = document.getElementById('recipeBtn');

    if (getRecipes) {
        getRecipes.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('working');
            location.href=`/search/${ingredients.join(",")}`
        // console.log(res.hbsObject));
        });


    };

    










});