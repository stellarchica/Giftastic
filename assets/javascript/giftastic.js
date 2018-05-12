$(document).ready(function(){

var topics = ["Michael Scott", "Jim Halpert", "Dwight Schrute"];

function displayImg(){
    $("#display-images").empty();
    var input = $(this).attr("data-name");
    // limits to 10 results
    var limit = 10;
    // pulls information
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=w5e96dbVI8AsHaCjBmWMYYgjVTOjnKS7";   

    $.ajax({
        url: queryURL, 
        method: "GET"
    }).done(function(response) {

        for(var j = 0; j < limit; j++) {    
            // div to hold images
            var displayDiv = $("<div>");
            displayDiv.addClass("holder");
            
            var image = $("<img>");
            image.attr("src", response.data[j].images.original_still.url);
            image.attr("data-still", response.data[j].images.original_still.url);
            image.attr("data-animate", response.data[j].images.original.url);
            image.attr("data-state", "still");
            image.attr("class", "gif");
            displayDiv.append(image);

            // pulls rating and displays
            var rating = response.data[j].rating;
            console.log(response);
            var pRating = $("<p>").text("Rating: " + rating);
            displayDiv.append(pRating)

            $("#display-images").append(displayDiv);
        }
    });
}

// allows new buttons to populate
function renderButtons(){ 

    $("#display-buttons").empty();

    for (var i = 0; i < topics.length; i++){
        // user can enter/create new buttons
        var newButton = $("<button>") 
        newButton.attr("class", "btn btn-default");
        newButton.attr("id", "input")  
        newButton.attr("data-name", topics[i]); 
        newButton.text(topics[i]); 
        $("#display-buttons").append(newButton); 
    }
}

// animation as a function, lets user action take effect
function imageChangeState() {          

    var state = $(this).attr("data-state");
    var animateImage = $(this).attr("data-animate");
    var stillImage = $(this).attr("data-still");

    if(state == "still") {
        $(this).attr("src", animateImage);
        $(this).attr("data-state", "animate");
    }

    else if(state == "animate") {
        $(this).attr("src", stillImage);
        $(this).attr("data-state", "still");
    }   
}

// final step for user to create button, pull info from Giphy
$("#submitPress").on("click", function(){

    var input = $("#user-input").val().trim();
    form.reset();
    topics.push(input);
            
    renderButtons();

    return false;
})

renderButtons();

$(document).on("click", "#input", displayImg);
$(document).on("click", ".gif", imageChangeState);
});