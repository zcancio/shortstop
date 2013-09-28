Alloy.CFG.nav=$.nav;

if (OS_ANDROID){
	$.index.open();
}
else {
	$.nav.open();
}

function doClick(evt){
    Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);

    // Check for all of the possible names that clicksouce
    // can report for the left button/view.
    if (evt.clicksource == 'leftButton' || evt.clicksource == 'leftPane' ||
        evt.clicksource == 'leftView') {
        Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
};

function setRegion(evt) {
    // For the iOS platform, wait for the complete event to ensure the region is set
    if (OS_IOS) {
        $.mapview.region = {
            latitude:37.390749, longitude:-122.081651,
            latitudeDelta:0.01, longitudeDelta:0.01
        };
    }
}

function mapRegionChanged(e) {
	$.mapview.removeAllAnnotations();
	
	var yahoo = Titanium.Map.createAnnotation({
	    latitude:37.490749,
	    longitude:-122.181651,
	    title:"Yahoo",
	    subtitle:'Sunnyvale, CA',
	    pincolor:Titanium.Map.ANNOTATION_GREEN,
	    animate:true,
	    leftButton: '../images/appcelerator_small.png',
	    myid:2 // Custom property to uniquely identify this annotation.
	});	
	
	$.mapview.addAnnotation(yahoo);
}

// These parameters can also be defined in the TSS file.
$.mapview.annotations = [$.mountainView];
$.mapview.region = {latitude:37.390749, longitude:-122.081651, latitudeDelta:0.01, longitudeDelta:0.01};

// $.win.open