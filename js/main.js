
/*
variables
*/

let filmArray = [];
let imgpath = "https://image.tmdb.org/t/p/w500";
let results = [];
let category = "now_playing";
let searchInput = document.getElementById('searchInput');
let titleSearchInput = document.getElementById('titleSearchInput');
let userName = document.getElementById('userName');
let userEmail = document.getElementById('userEmail');
let userNumber = document.getElementById('userNumber');
let userAge = document.getElementById('userAge');
let userPassword = document.getElementById('userPassword');
let userRepassword = document.getElementById('userRepassword');

/* close dark list*/
$('#close').click(function () {

        $('#darkList ul li ').css({ "transform": "translateY(420px)", "opacity": "0" }, 1000)
        $('#darkList').animate({ 'margin-left': '-250px' }, 700)
        $('#whiteList').animate({ 'margin-left': '0px' }, 700)

        $('#close').hide();
        $('#bars').show();



})

/*  open dark list*/
$('#bars').click(function () {
        $('#darkList ul li ').css({ "transform": "translateY(0px)", "opacity": "1" }, 1000)
        $('#darkList').animate({ 'margin-left': '0px' }, 500)
        $('#whiteList').animate({ 'margin-left': '250px' }, 500)
        $('#bars').hide();
        $('#close').show();
})

/*  trending*/

$('#trendingLink').click(async function trending() {

        let response = await fetch(` https://api.themoviedb.org/3/trending/all/day?api_key=b7ed3ef8d2fddd67928ca17512db61f4`)

        filmArray = await response.json();

        results = filmArray.results;

        display();
});

/*  selecting category by using of elements in dark list*/

$('ul li a').click(function cate(e) {
        category = $(e.target).attr('filmCtegory');
        data(category);
})

/*  getting data of movies by using category*/

async function data(category) {

        let response = await fetch(`https://api.themoviedb.org/3/movie/${category}?api_key=b7ed3ef8d2fddd67928ca17512db61f4`)

        filmArray = await response.json();

        results = filmArray.results;


        display();
}
data(category);

/*  display data of movies*/

function display() {
        let container = '';
        for (let i = 0; i < results.length; i++) {

                container += `
<div class="col-md-4 film  mb-4  " id="film">
<div class="position-relative overflow-hidden">
<img src="${imgpath + results[i].poster_path}" class="w-100" alt="">

    <div class="layer text-center p-2" >
    <h3>${results[i].original_title}</h3>
    <p class=" mt-5">${results[i].overview}</p>
    <p class=" mt-5">rate:${results[i].vote_average}</p>
    <h6 class=" mt-5">${results[i].release_date}</h6>    
    </div>
    
    </div>

</div>`
                document.getElementById('dataRow').innerHTML = container;

        }
}

/* search for specific movie by any character included in its title */


async function search() {
        let text = searchInput.value;
        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=b7ed3ef8d2fddd67928ca17512db61f4&language=en-US&query=${text}&page=1&include_adult=false`)
        filmArray = await response.json();
        results = filmArray.results;
        console.log(filmArray)
        display();
}

/* search for specific movie in the same page by its title */

function titleSearch() {
        let titleSearchVal = titleSearchInput.value;
        let searchContainer = '';
        if (titleSearchVal == "") {
                document.getElementById('searchRow').innerHTML = "";

        }
        else {
                for (let i = 0; i < results.length; i++) {

                        results = filmArray.results;
                        let titleVal = results[i].title;
                        if (titleVal.includes(titleSearchVal) == true) {
                                searchContainer += `<div class="col-md-4 film  mb-4  " id="film">
                                  <div class="position-relative overflow-hidden">
                                     <img src="${imgpath + results[i].poster_path}" class="w-100" alt="">

                                           <div class="layer text-center p-2" >
                                         <h3>${results[i].original_title}</h3>
                                         <p class=" mt-5">${results[i].overview}</p>
                                         <p class=" mt-5">rate:${results[i].vote_average}</p>
                                         <h6 class=" mt-5">${results[i].release_date}</h6>    
                                        
                                            </div>
    
                                            </div>

                                         </div>`
                        }
                }
                document.getElementById('searchRow').innerHTML = searchContainer;
        }
}

/* check name validation */

function nameValidation() {
        let validName = userName.value;
        if (validName == "") {

                $('#invalidName').css("display", "block");
        }
        else {
                $('#invalidName').css("display", "none")
        }
}

/* check email validation */

function emailValidation() {

        let validEmail = userEmail.value;
        let regex = /^([a-zA-Z]|[0-9]){1,}@[a-zA-Z]{1,}\.[a-zA-z]{2,3}/;

        if (regex.test(validEmail) == true) {

                $('#invalidEmail').css("display", "none");

        }
        else {
                $('#invalidEmail').css("display", "block");
        }

}

/* check pjone number validation */

function numberValidation() {

        let validNumber = userNumber.value;
        let regex = /^(002){0,1}01[0125][0-9]{8}$/;

        if (regex.test(validNumber) == true) {

                $('#invalidNumber').css("display", "none");

        }
        else {
                $('#invalidNumber').css("display", "block");
        }

}

/* check age validation */

function ageValidation() {

        let validAge = userAge.value;
        let regex = /^([1-9])$|^([1-9][0-9])$|^(100)$/;

        if (regex.test(validAge) == true) {

                $('#invalidAge').css("display", "none");

        }
        else {
                $('#invalidAge').css("display", "block");
        }

}

/* check password validation */
function passwordValidation() {

        let validPassword = userPassword.value;
        let regex = /^([a-zA-Z]|[0-9]){8,}([a-zA-Z]|[0-9])$/;

        if (regex.test(validPassword) == true) {

                $('#invalidPassword').css("display", "none");

        }
        else {
                $('#invalidPassword').css("display", "block");
        }

}

/* check reenter password validation */
function repasswordValidation() {
        let validRepassword = userRepassword.value;
        let validPassword = userPassword.value;
        if (validRepassword == validPassword) {

                $('#invalidRepassword').css("display", "none");


        }
        else {
                $('#invalidRepassword').css("display", "block");
        }

}
$('#userName').click(function inputFocus(e) {
        $(e.target).next().css("display", "block")




});

/* scroll to contact section smoothly*/
$('#contactLink').click(function () {

        let sectionOffset = $('#contactUs').offset().top;
        $('html', 'body').animate({ scrollTop: sectionOffset }, 1000);




})