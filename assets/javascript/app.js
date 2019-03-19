$( document ).ready(function() {

var topic = ["Phillies", "Mets", "Marlins", "Nationals", "Braves", "Diamondbacks", "Cubs","Reds","Rockies", "Dodgers", "Brewers","Pirates", "Padres", "Giants", "Cardinals", "Orioles", "Red Sox", "White Sox", "Indians", "Tigers", "Astros", "Royals", "Angels", "Twins", "Yankees", "Athletics", "Mariners", "Rays", "Rangers", "Blue Jays"];

function displayGifButtons() {
	$("#gifButtonsView").empty();
	for (var i = 0; i < topic.length; i++) {
		var gifButton = $("<button>");
		gifButton.addClass("team");
		gifButton.addClass("btn btn-primary")
		gifButton.attr("data-name", topic[i]);
		gifButton.text(topic[i]);
		$("#gifButtonsView").append(gifButton);
	}
}

function addNewButton() {
	$("#addGif").on("click", function() {
		var team = $("#topicInput").val().trim();
		if (team == ""){
			return false;
		}
		topic.push(team);

		displayGifButtons();
		return false;
		});
}

function removeLastButton() {
	$("removeGif").on("click", function() {
		topic.pop(team);
		displayGifButtons();
		return false;
	});

}


function displayGifs() {
	var team = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&api_key=DAEBgFapYttTnz8XwuesEJ7lTosRpcZC&limit=10";
	
	$.ajax({
		url: queryURL,
		method: 'GET'
	})

	.done(function(response) {
		$("#gifsView").empty();
		var results = response.data;
		if (results == ""){
			alert("There isn't a giffy for this!");	
		}
		for (var i = 0; i<results.length; i++){
			var gifDiv = $("<div1>");
			var gifRating = $("<p>").text("Rating " + results[i].rating);
			gifDiv.append(gifRating);

			var gifImage = $("<img>");
			gifImage.attr("src", results[i].images.fixed_height_small_still.url);
			gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
			gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
			gifImage.attr("data-state", "still");
			gifImage.addClass("image");
			gifDiv.append(gifImage);
			$("#gifsView").prepend(gifDiv);
		}
	});
}


displayGifButtons();
addNewButton();
removeLastButton();



$(document).on("click", ".team", displayGifs);
$(document).on("click", ".image", function() {
	var state = $(this).attr('data-state');
	if (state == 'still') {
		$(this).attr('src', $(this).data('animate'));
		$(this).attr('data-state', 'animate');
	}else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}

	});

});