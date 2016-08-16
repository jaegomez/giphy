// My main array which will be the permanent list of my
// Personal favorite athletes
// all my code for my buttons and array will be the first half
// then the second half of code is actually getting gifs to pop up
// and their movements and pausing/restarting

var topics = ["Michael Jordan", "Lebron James","Allen Iverson",
				"Chauncey Billups", "Mike Vick", "Ed Reed",
				"Phillip Buchanon", "Ray Lewis", "Randy Moss",
				"Floyd Mayweather", "Brock Lesnar", "Anderson Silva",
				"Aaron Rodgers"];


// basic for loop for my topic buttons and will also add add
// additional buttons

function addsButton(){
	$("#athletes").empty();
	for (var i = 0; i < topics.length; i++){
		var b = $('<button>');
		b.addClass('gif' + i);
		b.attr('data-name', topics[i]);
		b.text(topics[i]);
		$('#athletes').append(b)
	};
};

// thats the submit click. then takes that and adds it to the array topics
$('#addedAthlete').on('click',function(){
	newAthlete = $("#userInput").val().trim();

	topics.push(newAthlete);
	addsButton();
	$("#userInput").val('');
	return false;
});

// function will be using AJAX making the API call to get the gifs
// from the giphy API
function showGifs(){
	$('#gifsOutput').empty();
	var newAthlete = $(this).attr('data-name');

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newAthlete + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url:queryURL,
		data: {
			limit: 10,
		},
		method: 'GET'
	})


// this function will retrieve the gifs and size them 
// will also set them to be paused when they pop up aka not animated

.done(function(response){
	var results = response.data;
	for (var i = 0; i < results.length; i++){

		var divGif = $('<div class="gif">');
		var giphyRating = results[i].rating;
		var rateHere = $('<p>').text("Rated: " + giphyRating);
		var imageGif = $('<img>');
		imageGif.attr('id', 'anyImage');
		imageGif.attr('data-still', results[i].images.fixed_width.url);
		imageGif.attr('data-animate', results[i].images.fixed_width.url);
		imageGif.attr('data-state', 'animate');
		imageGif.attr('src', results[i].images.fixed_width_still.url);
		imageGif.on('click', whenPressed);
		divGif.append(rateHere);
		divGif.append(imageGif);

		$('#gifsOutput').prepend(divGif);
	};
});
return false;
}

// if statement for logic to animate or not
function whenPressed(){
	position = $(this).attr('data-state');
	if (position === 'still') {
		var dancingUrl = $(this).attr('data-animate');
		$(this).attr('src', dancingUrl);
		$(this).attr('data-state', 'animate');
	} else {
		var pausedUrl = $(this).attr('data-still');
		$(this).attr('src', pausedUrl);
		$(this).attr('data-state', 'still');
	};
};

$(document).on('click', 'button', showGifs);
addsButton();



