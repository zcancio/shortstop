

var center = null;
var map = null;
var markers = [];


var foodMarkerimage = {
  url: '/static/img/food-mark.png',
  size: new google.maps.Size(45, 56),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(45, 20),
};

var drinkMarkerimage = {
  url: '/static/img/drink-mark.png',
  size: new google.maps.Size(45, 56),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(45, 20),
};

var funMarkerimage = {
  url: '/static/img/fun-mark.png',
  size: new google.maps.Size(45, 56),
  origin: new google.maps.Point(0, 0),
  anchor: new google.maps.Point(45, 20),
};

function initApp() {

	initMap();

	navigator.geolocation.getCurrentPosition(function(position) {
		refreshMap(position.coords.latitude, position.coords.longitude);
	});


	

}



function initMap(lat,lng){


	center = new google.maps.LatLng(39.8282, -98.5795);


	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 20,
		disableDefaultUI: true,
		scrollwheel: false,
		center: center,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);

	});

	


}



function refreshMap(lat,lng){

	// 1. get new venues
	// 2. recenter map
    // 3. show new pins
	var data = {
		'lat' : lat,
		'lng' : lng
	};

    $.ajax({
        url: "/venues/search",
        dataType: 'json',
        data: data,
        type: 'GET',
        success: function(results, textStatus, jqXHR) {
        	console.log(results);

        	refreshMarkers(results['venues']);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown){
        	console.log(errorThrown);
        }
    });


    center = new google.maps.LatLng(lat, lng);
    map.setCenter(center);



	

}

function refreshMarkers(venues){

	for (var i in markers) {
		markers[i].setMap(null);
	}

	for (var i in venues) {
		var venue = venues[i];

		var marker = new google.maps.Marker({
			position: new google.maps.LatLng(venue['location']['lat'],venue['location']['lng']),
			map: map,
			icon: funMarkerimage
			// icon: image // This path is the custom pin to be shown. Remove this line and the proceeding comma to use default pin
		});



		markers.push(marker);

		showVenueOverlay(marker, venue, i);

	}
}


// The five markers show a secret message when clicked
// but that message is not within the marker's instance data.
function showVenueOverlay(marker, venue, number) {
  

  	google.maps.event.addListener(marker, 'click', function() {
  		console.log(venue);

  		$('.venue h2').text(venue['name']);

  		window.location.hash = "#overlay";

  	});
}
	
	//http://www.evoluted.net/thinktank/web-development/google-maps-api-v3-custom-location-pins



	// Add listener for a click on the pin


	// Add information window
	// var infowindow1 = new google.maps.InfoWindow({
	// 	content:  createInfo('Evoluted New Media', 'Ground Floor,
	// 	35 Lambert Street,
	// 	Sheffield,
	// 	South Yorkshire,
	// 	S3 7BH
	// 	<a title="Click to view our website" href="http://www.evoluted.net">Our Website</a>')
	// });

	// // Create information window
	// function createInfo(title, content) {
	// 			return '
	// 	<div class="infowindow"><strong>'+ title +'</strong>
	// 	'+content+'</div>
	// 	';
	// }



