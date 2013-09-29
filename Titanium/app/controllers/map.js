var current_longitude;
var current_latitude;

args=arguments[0] || {};
console.log(Ti.API.info(args));

function mapClicked(evt){
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid + "evt " + evt.clicksource);
    // Ti.API.info(Alloy.CFG.nav);
    // if (evt.clicksource == "rightButton") {
    	// Ti.API.info("Annotation " + evt.title + ", right button clicked.");
    	// var xpng=require('xpng');
		// xpng.openWin(Alloy.CFG.nav,'location',{myprop: "value"});
    // }
    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        evt.clicksource == "leftView") {
        Ti.API.info("Annotation " + evt.title + ", left button clicked.");
        
        // var xpng=require('xpng');
		// xpng.openWin(Alloy.CFG.nav,'location');
    // } else if (evt.clicksource == 'rightButton') {
    	// var xpng=require('xpng');
		// xpng.openWin(Alloy.CFG.nav,'location');
				// // xpng.openWin(Alloy.CFG.nav,'location', payload={annid:1});
    }
};

function setRegion(evt) {
    // For the iOS platform, wait for the complete event to ensure the region is set
    if (OS_IOS) {
        // $.mapview.region = {
            // latitude:37.390749, longitude:-122.081651,
            // latitudeDelta:0.01, longitudeDelta:0.01
        // };
        
    }
}



function mapRegionChanged(e) {
	$.mapview.removeAllAnnotations();
	
	var yahoo = Titanium.Map.createAnnotation({
	    latitude:current_latitude,
	    longitude:current_longitude,
	    title:"Yahoo",
	    subtitle:'Sunnyvale, CA',
	    pincolor:Titanium.Map.ANNOTATION_GREEN,
	    animate:true,
	    leftButton: '../images/appcelerator_small.png',
	    myid:2 // Custom property to uniquely identify this annotation.
	});	
	
	$.mapview.addAnnotation(yahoo);
}

function createAnnotationFromLocation(location) {
	return Titanium.Map.createAnnotation({
			    latitude:location.lat,
			    longitude:location.lng,
			    title:location.name,
			    pincolor:Titanium.Map.ANNOTATION_RED,
			    animate:true,
			    leftButton: '../images/appcelerator_small.png',
			    rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			    myid:location.id // Custom property to uniquely identify this annotation.
			});	
}

var my_location = Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.log('error: ' + JSON.stringify(e.error) );
	            return;
	        }
	   		current_longitude = e.coords.longitude;
			current_latitude = e.coords.latitude;
			$.mapview.region = {
				latitude:current_latitude, longitude:current_longitude,
            	latitudeDelta:0.004, longitudeDelta:0.004
			};
			
			var url = "http://www.ashortstop.com/venues/search?lat="+ current_latitude + "&" + current_longitude;
			 var client = Ti.Network.createHTTPClient({
			     onload : function(e) {
			         var locations = eval('('+this.responseText+')').venues;
			         var annotations = [];
			         for (var i = 0; i < locations.length; i++) {
			         	var location = locations[i];
			         	var ann = createAnnotationFromLocation(location);
			         	annotations[i] = ann;
			         }
			         $.mapview.annotations = annotations;
			     },
			     // function called when an error occurs, including a timeout
			     onerror : function(e) {
			         Ti.API.debug(e.error);
			     },
			     timeout : 5000  // in milliseconds
			 });
			 client.open("GET", url);
			 client.send();

	   });

// These parameters can also be defined in the TSS file.
// $.mapview.annotations = [$.mountainView];
// $.mapview.region = {latitude:37.390749, longitude:-122.081651, latitudeDelta:0.01, longitudeDelta:0.01};


// $.win.open