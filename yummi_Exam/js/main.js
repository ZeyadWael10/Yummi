//Start Global Variables 
let navbarWidth = 0,
isTrue = !0,
mealsArray = [],
uName = document.querySelector("#name"),
uEmail = document.querySelector("#email"),
uPhone = document.querySelector("#phone"),
uAge = document.querySelector("#age"),
uPassword = document.querySelector("#password"),
userNameAlert = document.querySelector("#namealert"),
userEmailAlert = document.querySelector("#emailalert"),
userPhoneAlert = document.querySelector("#phonealert"),
userAgeAlert = document.querySelector("#agealert"),
userpasswordAlert = document.querySelector("#passwordalert"),
rowDisplay = document.querySelector("#rowDisplay"),
nameFoucsed = false,
emailFoucsed = false,
phoneFoucsed = false,
ageFoucsed = false,
passwordFoucsed = false;
// End Global Variables
// Start Loading Screen Function
search("").then(() => {
    $(".loading-screen").fadeOut(500, () => {
        $("body").css("overflow", "visible")
    })
})
// End Loading Screen Function
// Start Scroll To Top Function
$(document).scroll((e) => {

    if ($(document).scrollTop()) {
        $(".sectionSetting").css("backgroundColor", "var(--mainColor)")
    }
})
// End Scroll To Top Function
// Start Sidebar Toggle Function
$(".toggleMenu").click(function () {
    isTrue ? ($(".navBar").addClass("open-menu").removeClass("close-menu"), navbarWidth = $(".navBar").width() - 10, $(".sideBar").css("left", navbarWidth), $(".fa-align-justify").toggleClass("fa-times"), $(".navBar .navTab1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1100), $(".navBar .navTab1").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1200), $(".navBar .navTab2").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1300), $(".navBar .navTab3").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1400), $(".navBar .navTab4").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1500), $(".navBar .navTab5").animate({
        opacity: "1",
        paddingTop: "25px"
    }, 1600), isTrue = !isTrue) : ($(".navBar").addClass("close-menu").removeClass("open-menu"), $(".fa-align-justify").toggleClass("fa-times"), $(".sideBar").css("left", 0), $(".navBar li").animate({
        opacity: "0",
    }, 500), isTrue = !isTrue)
});
// End Sidebar Toggle Function
////Start Displaying Functions
// Start Category Display Function
function displayCategories() {
    let category = ""
    for (var i = 0; i < mealsArray.length; i++) {
        category += `
    <div class="col-md-6 col-lg-3 my-3 ps-4 sectionSetting shadow">
        <div class="poster shadow rounded position-relative">
            <div onclick="filterByCategory('${mealsArray[i].strCategory}')" class="post">
                <img src='${mealsArray[i].strCategoryThumb}' class="w-100 rounded" />
                <div class="overlay d-flex align-items-center justify-content-center">
                    <div class="info p-2">
                        <h2>${mealsArray[i].strCategory}</h2>
                        <p>${mealsArray[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    }
    rowDisplay.innerHTML = category
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
// End Category Display Function
// Start Area Display Function
function displayArea() {
    let area = ""
    for (var i = 0; i < mealsArray.length; i++) area += `
    <div class="col-md-6 col-lg-3 my-3 ps-4 sectionSetting shadow">
        <div class="poster shadow rounded position-relative">
            <div onclick=(filterByArea('${mealsArray[i].strArea}')) class="post ">
                <i class="fa-solid fa-city fa-3x"></i>
                <h2 class="text-white">${mealsArray[i].strArea}</h2>
            </div>
        </div>
    </div>`
    rowDisplay.innerHTML = area;
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
// End Area Display Function
// Start Ingredient Display Function
function displayIngredients() {
    let Ingredient = ""
    for (var i = 0; i < mealsArray.length; i++) Ingredient += `
    <div class="col-md-6 col-lg-3 my-3 ps-4 sectionSetting shadow">
        <div onclick="getMainIngredient('${mealsArray[i].strIngredient}')" class="poster shadow rounded position-relative">
            <div class="post ">
                <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h2 class="text-white">${mealsArray[i].strIngredient}</h2>
                <p class="text-white">${mealsArray[i].strDescription.split(" ").splice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>`
    rowDisplay.innerHTML = Ingredient
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
// End Ingredient Display Function
// Start Meals Display Function
function displayMeals(mealsArray) {
    let meals = ""
    for (let i = 0; i < mealsArray.length; i++) {
        meals += `
        <div class="col-md-6 col-lg-3 my-3 ps-4 sectionSetting shadow">
            <div onclick="getMeal('${mealsArray[i].idMeal}')" class="poster shadow rounded position-relative">
                <div class="post ">
                    <img src='${mealsArray[i].strMealThumb}' class="w-100 rounded" />
                    <div class="overlay d-flex">
                        <div class="info p-2 align-items-center justify-content-center">
                            <h2>${mealsArray[i].strMeal}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>`
    }
    rowDisplay.innerHTML = meals
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
// End Meals Display Function
// Start One Meal Display Function
function displayMealIngredients(meal) {
    let mealIngredients = ""
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            mealIngredients += `<li class="my-3 mx-1 p-1 alert-success rounded">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }
    let tags = meal.strTags?.split(",") 
    let tagsStr = "" 
    for (let i = 0; i < tags?.length; i++) { 
        tagsStr += `<li class="my-3 mx-1 p-1 alert-danger rounded">${tags[i]}</li>` 
    } 
    let str = `
    <div class="col-md-4 sectionSetting ps-4 text-white">
					<img class="w-100" src="${meal.strMealThumb}">
					<h1>${meal.strMeal}</h1>
				</div>
				<div class="col-md-8 ps-4 text-white text-left">
					<h2>Instructions</h2>
					<p>${meal.strInstructions}</p>
					<p><span class="fw-bolder">Area:</span> ${meal.strArea}</p>
					<p><span class="fw-bolder">Category:</span> ${meal.strCategory}</p>
					<h3>Recipes :</h3>
					<ul class="d-flex list-unstyled" id="Recipes">
					</ul>
					<h3 class="my-2">Tags :</h3>
					<ul class="d-flex list-unstyled" id="Tags">
					</ul>					
					<a class="btn btn-success text-white" target="_blank" href="${meal.strSource}">Source</a>
					<a class="btn youtube text-white" target="_blank" href="${meal.strYoutube}">Youtub</a>
				</div>`
                rowDisplay.innerHTML = str
    document.getElementById("Recipes").innerHTML = mealIngredients
    document.getElementById("Tags").innerHTML = tagsStr
    $("html, body").animate({
        scrollTop: 0
    }, 200)
}
// End One Meal Display Function
////End Displaying Functions
////Start Fetching Functions
// Start Fetching Meal By Name Function
async function search(e) {
    $(".loadingBox").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loadingBox").fadeOut(400)
    return meals
}
// End Fetching Meal By Name Function
// Start Fetching Main Ingredient Function
async function getMainIngredient(ingredientName) {
    $(".loadingBox").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
    meal = await meal.json()
    displayMeals(meal.meals)
    $(".loadingBox").fadeOut(500)
}
// End Fetching Main Ingredient Function
// Start Fetching Meal By Id Function
async function getMeal(mealID) {
    $(".loadingBox").fadeIn(100)
    let meal = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    meal = await meal.json()
    displayMealIngredients(meal.meals[0])
    $(".loadingBox").fadeOut(500)
}
// End Fetching Meal By Id Function
// Start Fetching Meal Category Function
async function getCategories(categories) {
    category = await fetch(`https://www.themealdb.com/api/json/v1/1/${categories}`);
    getCategory = await category.json()
    return getCategory;
}
// End Fetching Meal Category Function
// Start Fetching Meal By Letter Function
async function getByLetter(letter) {
    if (letter) {
        $(".loadingBox").fadeIn(100)
        let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        meals = await meals.json()
        if (meals.meals) {
            displayMeals(meals.meals)
        }
        $(".loadingBox").fadeOut(100)
    }
}
// End Fetching Meal By Letter Function
// Start Fetching Filter Meal Function
async function filterByCategory(category) {
    $(".loadingBox").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    meals = await meals.json()
    displayMeals(meals.meals)
    $(".loadingBox").fadeOut(500)
}
// End Fetching Filter Meal Function
async function filterByArea(area) {
    $(".loadingBox").fadeIn(100)
    let meals = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    meals = await meals.json()
    displayMeals(meals.meals.slice(0, 20))
    $(".loadingBox").fadeOut(500)
}
// End Fetching Filter Meal Function
////End Fetching Functions
// Start Navgation Toggling Function
$(".nav-item a").click(async (e) => {
    let listBy = e.target.getAttribute("data-list")

    document.getElementById("searchBox").innerHTML = ""
    rowDisplay.innerHTML = ""
    $("html, body").animate({
        scrollTop: 0
    }, 200)
    if (listBy == "search") {
        rowDisplay.innerHTML = ""
        document.getElementById("searchBox").innerHTML = `
        <div class="row align-items-center">
				<div class="col-sm-12 col-md-6">
                <input id="searchInput" class="form-control mb-2" placeholder="Search By Name">
				</div>
				<div class="col-sm-12 col-md-6">
					<input class="form-control mb-2" type="text" maxlength="1" id="SearchByLetterInput" placeholder="Search Meals By First Letter">
				</div>
			</div>`
        $("#searchInput").keyup((e) => {
            search(e.target.value)
        })
        $("#SearchByLetterInput").keyup((e) => {
            getByLetter(e.target.value)
        })

        $('#SearchByLetterInput').on("input", function () {
            if (this.value.length > 1)
                this.value = this.value.slice(0, 1);
        });
    }

    let x;

    if (listBy == "categories") {
        $(".loadingBox").fadeIn(100)
        x = await getCategories(listBy + ".php")
        mealsArray = x.categories.splice(0, 20);
        displayCategories()
        $(".loadingBox").fadeOut(500)
    } else if (listBy == "a") {
        $(".loadingBox").fadeIn(100)

        x = await getCategories("list.php?a=list")
        mealsArray = x.meals.splice(0, 20);
        displayArea()
        $(".loadingBox").fadeOut(500)
    } else if (listBy == "i") {
        $(".loadingBox").fadeIn(100)

        x = await getCategories("list.php?i=list")
        mealsArray = x.meals.splice(0, 20);
        displayIngredients()
        $(".loadingBox").fadeOut(500)
    }
    if (listBy == "contact") {

        rowDisplay.innerHTML = `
        <section id="contact" class="container ps-4 w-75 mx-auto mb-5">
		<div class="p-2">
			<h2 class="text-light mb-5">Contact Us</h2>
			<div class="row gy-5">
				<div class="col-md-6">
					<div class="form-group">
						<input class="form-control shadow " onkeyup="regexValidation()" id="name"
							placeholder="Enter Your Name">
						<div class="alert mt-1 alert-danger d-none" id="namealert" role="alert">
							Please Enter Your Name
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="regexValidation()" class="form-control" id="email" placeholder="Enter Email">
						<div class="alert mt-1 alert-danger d-none" id="emailalert" role="alert">
                        Please Enter A Valid E-Mail
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="regexValidation()" class="form-control" id="phone" placeholder="Enter phone">
						<div class="alert mt-1 alert-danger  d-none" id="phonealert" role="alert">
							Please Enter A valid Number
						</div>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group">
						<input onkeyup="regexValidation()" class="form-control" id="age" placeholder="Enter Age">
						<div class="alert mt-1 alert-danger  d-none" id="agealert" role="alert">
							Please Enter Your Age
						</div>
					</div>
				</div>
				<div class="col-sm-12">
					<div class="form-group">
						<input onkeyup="regexValidation()" class="form-control" type="password" id="password"
							placeholder="Enter Password">
						<div class="alert mt-1 alert-danger d-none" id="passwordalert" role="alert">
							Please Enter A Strong Password <span>Minimum eight characters, at least one letter and one number</span>
						</div>
					</div>
				</div>
			<button type="submit" disabled id="submitBtn" class="btn btn-outline-danger my-5">Submit</button>
		</div>
	</section>`

        uName.addEventListener("focus", () => {
            nameFoucsed = true
        })
        uEmail.addEventListener("focus", () => {
            emailFoucsed = true
        })
        uPhone.addEventListener("focus", () => {
            phoneFoucsed = true
        })
        uAge.addEventListener("focus", () => {
            ageFoucsed = true
        })
        uPassword.addEventListener("focus", () => {
            passwordFoucsed = true
        })
    }
})
// End Navgation Toggling Function
//// Start Validations Function
// Start Name Validation Function
function nameRegexValid() {
    return /^[a-zA-Z ]+$/.test(uName.value)
}
// End Name Validation Function
// Start Email Validtion Function
function emailRegexValid() {
    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail.value)
}
// End Email Validation Function
// Start Phone Validation Function
function phoneRegexValid() {
    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(uPhone.value)
}
// End Phone Validation Function
// Start Age Validation Function
function ageRegexValid() {
    return /^[1-9][0-9]?$|^100$/.test(uAge.value)
}
// End Age Validation Function
// Start Password Validation Function
function passwordRegexValid() {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(uPassword.value)
}
// End Password Validation Function
// Start Validation Check Function
function regexValidation() {
    if (nameFoucsed) {
        if (nameRegexValid()) {
            userNameAlert.classList.replace("d-block", "d-none")
        } else {
            userNameAlert.classList.replace("d-none", "d-block")
        }
    }
    if (emailFoucsed) {
        if (emailRegexValid()) {
            userEmailAlert.classList.replace("d-block", "d-none")
        } else {
            userEmailAlert.classList.replace("d-none", "d-block")
        }
    }
    if (phoneFoucsed) {
        if (phoneRegexValid()) {
            userPhoneAlert.classList.replace("d-block", "d-none")
        } else {
            userPhoneAlert.classList.replace("d-none", "d-block")
        }
    }
    if (ageFoucsed) {
        if (ageRegexValid()) {
            userAgeAlert.classList.replace("d-block", "d-none")
        } else {
            userAgeAlert.classList.replace("d-none", "d-block")
        }
    }
    if (passwordFoucsed) {
        if (passwordRegexValid()) {
            userpasswordAlert.classList.replace("d-block", "d-none")
        } else {
            userpasswordAlert.classList.replace("d-none", "d-block")
        }
    }
    if (nameRegexValid() && emailRegexValid() && phoneRegexValid() && ageRegexValid() && passwordRegexValid()) {
        document.getElementById("submitBtn").removeAttribute("disabled")
    } else {
        document.getElementById("submitBtn").setAttribute("disabled", "true")
    }
}
// End Validation Check Function
//// End Validations Function
