// Gets projects
let projectContainer;
const userName = "mitchell-lng"
const baseUrl = "https://api.github.com/users/" + userName;

const operations = [["_", " "], ["-", " "]]
function cleanName(text) {
    operations.map((operation) => {
        text = text.replaceAll(operation[0], operation[1])
    })

    return text;
}

// Create each of the card components
function createProject(data) {
    if (data.name == userName) {
        return;
    }

    // Initialize chips
    let chips = $("<ul class='chips'></ul>");

    // Get the data for the language data
    $.getJSON(data.languages_url, function (data) {
        // Add each of the languages
        $.each(data, function (key, val) {
            chips.append($(`<li>${key}</li>`))
        })
    });

    // Create new card
    let card = $("<div data-aos='fade-up' data-aos-anchor-placement='top-bottom'></div>");
    card.addClass("card");

    // Add basic information
    card.append($(`<h3>${cleanName(data.name)}</h3>`));

    // Add the languages to the card
    card.append(chips);

    // Github icon to visit the repo
    card.append($(`<a target="_blank" href="${data.html_url}""><i class="fa-brands fa-github"></i></a>`));

    // Add the card to the containers
    projectContainer.append(card);
}

// Get projects from github
function getProjects() {
    // Reset the projects in case this function is run again
    projectContainer.innerHTML = "";

    // Get the repos from the github link
    $.getJSON(baseUrl + "/repos", function (data) {
        // Create a project for each of the values
        $.each(data, function (key, val) {
            createProject(val);
        })
    })
}

// Create the copyright in the footer
function copyright() {
    const year = new Date().getFullYear();

    // Base copyright
    let copyright = "© Copyright 2022";
    if (year != 2022) {
        // Add the new year if it is no longer 2022
        copyright += " - " + year;
    }

    // Actually set the copyright on the page
    document.getElementById("copyright").innerHTML = copyright;
}

function modal() {
    // Open the model if there is no internet connection
    if (!navigator.onLine) {
        $(".modal").css("display", "flex");
    }
}

// On page load
$(function() {
    // Get the project container once the page has loaded
    projectContainer = $("#projects")
    
    // Initialize the animate on scoll.
    AOS.init();
    getProjects();
    copyright();
    modal();

    // Set the onEventListeners
    $("#close_modal").click(function() {
        $(".modal").css("display", "none")
    })
    
    $(".close_navigation").click(function() {
        $("aside").removeClass("navigation_open");
    })

    $("#hamburger").click(function() {
        $("aside").addClass("navigation_open");
    })

    // Close the loading screen very nicely
    setTimeout(
        () => {
            $(".loading").addClass("close_loading");
            setTimeout(
                () => {
                    $(".loading").css("display", "none")
                }, 2000);
            }, 2000);
        }
    )
    
    // Close navigation when the escape key is pressed
    window.addEventListener("keydown", e => {
        if (e.defaultPrevented) { return; }

        if (e.key === "Escape" || e.key === "Esc") {
            $("aside").removeClass("navigation_open");
            return;
        }
    }
)