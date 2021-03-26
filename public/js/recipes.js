document.addEventListener('DOMContentLoaded',(event) => {
    if (event) {
        console.info('DOM loaded');
    };

    $('.click-to-toggle').click(function(){
        $(this).toggleClass('selected');
     });

    const getRecipes = document.getElementById('recipeBtn');

    if (getRecipes) {
        getRecipes.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('working');
            fetch("/api/search/:ingredients", {
                method:'POST',
            }).then((res) => 
        //     res.json(),
        //     ).then((response) => 
        //         console.log(response)
        // );
        console.log(res.hbsObject));
        });
    };











});