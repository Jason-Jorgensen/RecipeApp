// const { response } = require("express");


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

    const saveRecipes = document.getElementById('favStar');

    if (saveRecipes) {
        saveRecipes.addEventListener('click', (e) => {
            e.preventDefault();
            $.get("/api/user_data").then(data => {
               let userEmail = data.email;
               console.log(userEmail);
                if (userEmail ===undefined) {
                    alert("Please create an account or login to begin saving recipes.");
                }else{
                    const save = {
                        user: userEmail,
                        recipeId: parseInt($(".recipeCard").attr("id")),
                        title: $("#recipeTitle").text(),
                        image: $("#recipeImgUrl").attr("src"),
                        url: $("#recipeSource").attr("href"),
                    };
                    console.log(save);
                    fetch("/api/savedRecipe", {
                        method: "POST",
                        headers: {
                            "Content-Type" : "application/json",
                        },
                        body: JSON.stringify(save)
                    }).then(alert("Saved Successfully"));
                }
              })
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
            location.href = `/member/members`;
        });
    };

    const logout = document.getElementById('logoutBtn');
    if (logout) {
        logout.addEventListener('click', (e) => {
            e.preventDefault();
            location.href = `/logout`;
        });
    };

    
    $.get("/api/returnSaved").then(data => {
    res.render("favorites", data);
    console.log(data);
    });



    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);

});


