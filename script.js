// Gets projects
let projectContainer;
const baseUrl = "https://api.github.com/users/mitchell-lng"

const operations = [["_", " "], ["-", " "]]
function cleanName(text) {
    operations.map((operation) => {
        text = text.replaceAll(operation[0], operation[1])
    })

    return text;
}

// Create each of the card components
function createProject(data) {

    let card = $("<div data-aos='fade-up' data-aos-anchor-placement='top-bottom'></div>");
    card.addClass("card");

    card.append($(`<h3>${cleanName(data.name)}</h3>`));
    let chips = $("<ul class='chips'></ul>");

    $.getJSON(data.languages_url, function (data) {
        $.each(data, function (key, val) {
            chips.append($(`<li>${key}</li>`))
        })
    });

    card.append(chips);

    card.append($(`<a target="_blank" href="${data.html_url}""><i class="fa-brands fa-github"></i></a>`));

    projectContainer.append(card);
}

// Get projects from github
function getProjects() {
    projectContainer.innerHTML = "";

    $.getJSON(baseUrl + "/repos", function (data) {
        $.each(data, function (key, val) {
            createProject(val);
        })
    })
}

function copyright() {
    const year = new Date().getFullYear();

    let copyright = "© Copyright 2022";
    if (year != 2022) {
        copyright += " - " + year;
    }

    document.getElementById("copyright").innerHTML = copyright;
}

function modal() {
    if (!navigator.onLine) {
        $(".modal").css("display", "flex");
    }
}

$(function() {
    projectContainer = $("#projects")
    
    AOS.init();
    getProjects();
    copyright();
    modal();

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
            }, 4000);
        }
    )
    
    window.addEventListener("keydown", e => {
        if (e.defaultPrevented) { return; }

        if (e.key === "Escape" || e.key === "Esc") {
            $("aside").removeClass("navigation_open");
            return;
        }
    }
)