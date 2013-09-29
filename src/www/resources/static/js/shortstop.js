

var center = null;
var map = null;
var markers = [];
var current_category = "food";

var foodMarkerImages = [];
var drinkMarkerImages = [];
var funMarkerImages = [];

var markerImages = {

	"food"  : [],
	"drink" : [],
	"fun" : []

}

for (key in markerImages){

	for (var i = 1; i < 11; i++){

		markerImages[key].push(
			{
			  	url: '/static/img/' + key + '-mark-' +  i + '.png',
			  	size: new google.maps.Size(45, 56),
			  	origin: new google.maps.Point(0, 0),
			  	anchor: new google.maps.Point(45, 20),
			}
		)
	}

}


var categoryTitles = {
	"food"  : "Food",
	"drink" : "Drink",
	"fun" : "Fun"
}


var categoryOverlayClasses = {
	"food"  : "hungry",
	"drink" : "sober",
	"fun" : "bored"
}




function initApp() {

	updater.poll();

	initMap();

	navigator.geolocation.getCurrentPosition(function(position) {
		console.log(position);
		refreshMap(position.coords.latitude, position.coords.longitude);
	});

	$('.pure-button.hungry').on('click', function(e){
		current_category = "food";
		refreshMap(center.lat(),center.lng());
	});


	$('.pure-button.sober').on('click', function(e){
		current_category = "drink";
		refreshMap(center.lat(),center.lng());
	});

	$('.pure-button.bored').on('click', function(e){
		current_category = "fun";
		refreshMap(center.lat(),center.lng());
	});





	

}



function initMap(lat,lng){


	center = new google.maps.LatLng(39.8282, -98.5795);


	map = new google.maps.Map(document.getElementById('map'), {
		zoom: 18,
		disableDefaultUI: true,
		scrollwheel: false,
		center: center,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);

	});

	var zoom_in_btn = $('.zoom-in');
	var zoom_out_btn = $('.zoom-out');

	zoom_in_btn.on('click', function(){
		console.log('zoom-in');
		var current_zoom = map.getZoom();
		map.setZoom(current_zoom+1);

		var map_center = map.getCenter();
		refreshMap(map_center.lat(),map_center.lng());


	});

	zoom_out_btn.on('click', function(){
		console.log('zoom-out');
		var current_zoom = map.getZoom();
		map.setZoom(current_zoom-1);
		
		var map_center = map.getCenter();
		refreshMap(map_center.lat(),map_center.lng());
	});

	

}



function refreshMap(lat,lng){

    center = new google.maps.LatLng(lat, lng);
    map.setCenter(center);

    var bounds = map.getBounds();

    sw = bounds.getSouthWest();
    ne = bounds.getNorthEast();

    // console.log(sw);
    // console.log(ne);


	// 1. get new venues
	// 2. recenter map
    // 3. show new pins
	var data = {
		'sw_lat' : sw.lat(),
		'sw_lng' : sw.lng(),
		'ne_lat' : ne.lat(),
		'ne_lng' : ne.lng(),
		'category' : current_category
	};


    $.ajax({
        url: "/venues/search-by-things",
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

    // update overlay navbar
    var overlay_header = $(".category");
    var overlay_header_text = $(".category h2");

    overlay_header_text.text(categoryTitles[current_category]);

    overlay_header.removeClass('hungry');
    overlay_header.removeClass('sober');
    overlay_header.removeClass('bored');


    overlay_header.addClass(categoryOverlayClasses[current_category]);


	

}

function refreshMarkers(venues){

	for (var i in markers) {
		markers[i].setMap(null);
	}

	markers = [];

	for (var i in venues) {
		var venue = venues[i];


		var marker = new google.maps.Marker({
			// position: new google.maps.LatLng(venue['location']['lat'],venue['location']['lng']),
			position: new google.maps.LatLng(venue['lat'],venue['lng']),
			map: map,
			icon: markerImages[current_category][i]
			// icon: image // This path is the custom pin to be shown. Remove this line and the proceeding comma to use default pin
		});



		markers.push(marker);

		showVenueOverlay(marker, venue, i);

	}
}


// The five markers show a secret message when clicked
// but that message is not within the marker's instance data.
function showVenueOverlay(marker, venue, number) {


    var current_thing_index = 0;

  	var item_arrow = $('.item .arrow');
  	var item_back_arrow = $('.item .back-arrow');
  	var item_text = $('.item h2');

  	var venue_text = $('.venue h2');
  	var venue_arrow = $('.venue .arrow');
  	var venue_back_arrow = $('.venue .back-arrow');

  	var do_it_btn = $('.do-button .pure-button');

  	google.maps.event.addListener(marker, 'click', function() {


  		/* venue */
  		venue_text.text(venue['name']);

  		var next_number = parseInt(number) + 1;

  		if (next_number < markers.length-1){
  			venue_arrow.removeClass('disabled');
  			venue_arrow.off('click');
	  		venue_arrow.on('click', function(e){
	  			var next_marker = markers[next_number];
				google.maps.event.trigger(next_marker, 'click');
	  		});
  		} else {
  			venue_arrow.addClass('disabled');
  		}


  		var previous_number = parseInt(number) - 1;
  		if (previous_number >= 0){
  			venue_back_arrow.removeClass('disabled');
  			venue_back_arrow.off('click');
	  		venue_back_arrow.on('click', function(e){
	  			var previous_marker = markers[previous_number];
				google.maps.event.trigger(previous_marker, 'click');
	  		});
  		} else {
  			venue_back_arrow.addClass('disabled');
  		}

  		/* thing */
  		if (venue['things'].length === 0){
  			item_text.text('+ Create thing');
	  		item_arrow.addClass('disabled');
  		} else {
	  		var thing = venue['things'][current_thing_index];

	  		item_arrow.removeClass('disabled');


	  		item_text.text(thing['name']);
			item_arrow.off('click');
	  		item_arrow.on('click', function(e){

	  			if (current_thing_index < (venue['things'].length -1)){
	  				current_thing_index += 1;
	  			}

	  			if (current_thing_index === (venue['things'].length -1)){
	  				item_arrow.addClass('disabled');
	  			}

	 			if (current_thing_index > 0){
	  				item_back_arrow.removeClass('disabled');
	  			}

	  			var thing = venue['things'][current_thing_index];
	  			item_text.text(thing['name']);

	  		});

			item_back_arrow.off('click');
	  		item_back_arrow.on('click', function(e){

	  			if (current_thing_index > 0){
	  				current_thing_index -= 1;
	  			}

	  			if (current_thing_index === 0){
	  				item_back_arrow.addClass('disabled');
	  			}

	 			if (current_thing_index < (venue['things'].length -1)){
	  				item_arrow.removeClass('disabled');
	  			}

	  			var thing = venue['things'][current_thing_index];
	  			item_text.text(thing['name']);

	  		});
	  	}

	  	/* do it */
	  	do_it_btn.off('click');
	  	do_it_btn.on('click', function(e){
	  		e.preventDefault();
	  		var thing = venue['things'][current_thing_index];
	  		renderDoItOverlay(marker, number, venue, thing)


	  	});


  		window.location.hash = "#overlay";

  	});
}


function renderDoItOverlay(marker, marker_number, venue, thing){

	var item_text = $('.do-it-content h2');
	var venue_text = $('.do-it-content p');

	item_text.text(thing['name']);
	venue_text.text(venue['name']);


	window.location.hash = "#do-it";



}



var updater = {
    errorSleepTime: 500,
    cursor: null,

    poll: function() {
    	console.log('polling');
        // var args = {"_xsrf": getCookie("_xsrf")};
        var args = {};

        if (updater.cursor) {
        	args.cursor = updater.cursor;
        }

        $.ajax({
        	url: "/a/messages/updates", 
        	type: "POST", 
        	dataType: "json",
            data: $.param(args), 
            success: updater.onSuccess,
            error: updater.onError
        });
    },

    onSuccess: function(response) {
    	console.log(response);

        try {
            updater.newMessages(response);

            return;
        } catch (e) {
            updater.onError();
            return;
        }
        updater.errorSleepTime = 500;
        window.setTimeout(updater.poll, 0);
    },

    onError: function(response) {
        updater.errorSleepTime *= 2;
        console.log("Poll error; sleeping for", updater.errorSleepTime, "ms");
        window.setTimeout(updater.poll, updater.errorSleepTime);
    },

    newMessages: function(response) {

    	console.log(response);


        if (!response.messages) {
        	return;
        }

        updater.cursor = response.cursor;
        var messages = response.messages;
        updater.cursor = messages[messages.length - 1].id;
        console.log(messages.length, "new messages, cursor:", updater.cursor);
        
        var last_message = messages[messages.length-1];
        thing_id = last_message.thing_id;

        console.log(last_message)

		$.ajax({
	        url: "/things/" + thing_id,
	        dataType: 'json',
	        type: 'GET',
	        success: function(results, textStatus, jqXHR) {
	        	console.log(results);

	        	var thing = results['thing'];
	        	var venue = thing['venue'];
	        	var do_vote = confirm("Vote for " + thing.name + " @" + venue.name);


	        	if (do_vote === true){
	        		console.log('vote');
	        	}

	        },
	        error: function(XMLHttpRequest, textStatus, errorThrown){
	        	console.log(errorThrown);
	        }
		});

        // for (var i = 0; i < messages.length; i++) {
        //     updater.showMessage(messages[i]);
        // }
    },

    showMessage: function(message) {
        var existing = $("#m" + message.id);
        if (existing.length > 0) return;
        var node = $(message.html);
        node.hide();
        $("#inbox").append(node);
        node.slideDown();
    }
};

