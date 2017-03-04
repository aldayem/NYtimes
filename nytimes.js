<!-- // search terms  -->
<!-- // number of queries  -->
<!-- // start year -->
<!-- // end year -->


 // authkey needed for use of NYT API
 var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";


$(document).ready(function(){

	 // on submit of form, we execute the following function -->
	// You must have e to represent the 'event' so we can preventDefault() down below.  -->
	$('#search').on('click', function(e){

		// grabs value on input fields on form submission -->
		var qID = $('#searchTerm').val();
		var records = $('#numberOfRecordsToRetrieve').val(); 
		var bDate = $('#startYear').val();
		var eDate = $('#endYear').val();

		 // base URL for NYT API -->
		var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

		 // base URL + using the param method in jQuery, we create the API query properites and insert the  -->
		// values from the input fields above.  -->
		url += '?' + $.param({
  		'api-key': authKey,
  		'q': qID,
  		'page': records,
  		'begin_date': bDate,
  		'end_date': eDate


		});

		// this prevents default submission method in form.  -->
		// basically prevents page from reloading so we dont lose the data -->
		e.preventDefault();

		 <!-- AJAX call to NYT API.  -->
		$.ajax({
  			url: url,
  			method: 'GET'
		}).done(function(response) {

			// console log the full object we get back to we can easily see how to traverse the obj tree
  			console.log(response);

  			// Since the obj tree is long, creating a variable for easy reuse. 
  			var results = response.response.docs;

  			// loop through the array and create places for it in the html
  			for(var i = 0; i<results.length; i++){

  				var newDiv = $('<div>').addClass('resultsDiv');
  				var titleP = $('<p>');
  				var abstractP = $('<p>');
  				var webURL = results[i].web_url; 
  				var titleA = $('<a>').attr('href', webURL);
  				var articleTitle = results[i].headline.main;
  				var articleAbstract = results[i].abstract;

  				// On first go noticed that some abstracts were null. 
  				// in this case, we want to put something in the html, 
  				// we are using the snippet vs. abstract is abstract is null
  				if (articleAbstract === null){

  					var articleAbstract = results[i].snippet;
  				}

  				// now that we have everything in place, let's append everything to create the right HTML tree 
  				$('#topArticles').append(newDiv);

  				titleA.append(titleP);
  				newDiv.append(titleA).append(abstractP);

  				titleP.append(articleTitle);
  				abstractP.append(articleAbstract);

  			}

  		// incase something fails, we show an error.  
		}).fail(function(err) {
  			throw err;
		});

	})
})