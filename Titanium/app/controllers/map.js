var current_longitude;
var current_latitude;

args=arguments[0] || {};
console.log(Ti.API.info(args));

function mapClicked(evt){
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid + "evt " + evt.clicksource);
    // Ti.API.info(Alloy.CFG.nav);
    if (evt.clicksource == "rightButton") {
    	Ti.API.info("Annotation " + evt.title + ", right button clicked.");
    	var xpng=require('xpng');
		xpng.openWin(Alloy.CFG.nav,'location',{myprop: "value"});
		// xpng.openWin(Alloy.CFG.nav,'map');
		// w=Alloy.createController("location",{v: "123"}).getView();
		// xpng.openWin(Alloy.CFG.nav,'location',{myprop:'my value'});

		
    }
    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        evt.clicksource == 'leftView') {
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

function getMockAnnotations() {
	var yahoo = Titanium.Map.createAnnotation({
			    latitude:current_latitude - 0.003,
			    longitude:current_longitude - 0.002,
				title:"Yahoo",
			    subtitle:'Sunnyvale, CA',
			    pincolor:Titanium.Map.ANNOTATION_GREEN,
			    animate:true,
			    leftButton: '../images/appcelerator_small.png',
			    rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			    myid:1 // Custom property to uniquely identify this annotation.
			});	
	var google = Titanium.Map.createAnnotation({
			    latitude:current_latitude + 0.005,
			    longitude:current_longitude + 0.004,
			    title:"Yahoo",
			    subtitle:'Sunnyvale, CA',
			    pincolor:Titanium.Map.ANNOTATION_GREEN,
			    animate:true,
			    leftButton: '../images/appcelerator_small.png',
			    rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
			    myid:2 // Custom property to uniquely identify this annotation.
			});	
	return [yahoo, google];
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
            	latitudeDelta:0.01, longitudeDelta:0.01
			};

			var annotations = getMockAnnotations();
			$.mapview.addAnnotations(annotations);

	   });

// These parameters can also be defined in the TSS file.
// $.mapview.annotations = [$.mountainView];
// $.mapview.region = {latitude:37.390749, longitude:-122.081651, latitudeDelta:0.01, longitudeDelta:0.01};


// $.win.open