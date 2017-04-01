var tweetLink = "https://twitter.com/intent/tweet?text=";  //standard link to send tweets on Twitter. after "=" we will add content of tweet
var quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?"; //link to API Forismatic which can give us random citations

//download Quote
function getQuote() {
	$.ajax({
		dataType: "json",
		url: quoteUrl,
		data: null,
		success: createTweet
	});
}

//Create Tweet with hook to button to Tweet
//JS will interprate 0 like false but "!" will reverse to true
function createTweet(input) {
	if (!input.quoteAuthor.length) {  //If quoteAuthor is empty string function will put "Unknow author"
		input.quoteAuthor = "Unknown author";
	}
	//Content of tweet
	var tweetText = "Quote of the day - " + input.quoteText + ". Author: " + input.quoteAuthor;
	//Check tweet length
	if (tweetText.length > 140) {
		getQuote();
	}
	else {
		var tweet = tweetLink + encodeURIComponent(tweetText); // variable with two elements: link to generate new tweets and tweet text
		$('.quote').text(input.quoteText); // content of quote
		$('.author').text("Author: " + input.quoteAuthor); // elememt will give us author
		$('.tweet').attr('href', tweet); // chose element with tweet class and modified with atribute href fow URL tweet variable.
	}
}

$(document).ready(function() {
	getQuote();
	$('.trigger').click(function() {
		getQuote();
	});
});