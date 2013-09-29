var win = $.voteWindow;
var current_longitude, current_latitude;
var selectedCategory;
var resultLocations;
var resultThings;
var selectedLocation;
var selectedThing;

var my_location = Titanium.Geolocation.getCurrentPosition(function(e) {
	        if (e.error) {
	            Ti.API.log('error: ' + JSON.stringify(e.error) );
	            return;
	        }
	   		current_longitude = e.coords.longitude;
			current_latitude = e.coords.latitude;
	   });
	   
// function setAndroidActionBar(event) {
	// if (OS_ANDROID) {
		// ABH=require('actionbarhelper').actionBarHelper;
		// actionBarHelper = new ABH($.voteWindow);
		// actionBarHelper.setUpAction(function (event) {
			// $.voteWindow.close();
		// });
	// }
// } 
	  
function getDataForAndroidPicker() {
	var url = "http://www.ashortstop.com/venues/search?lat="+ current_latitude + "&" + current_longitude;
	 var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	         var locations = eval('('+this.responseText+')').venues;
	         var tempArray = new Array();
	         for (var i = 0; i < locations.length; i++) {
	         	var location = locations[i];
	         	var aLocation = {
	         		'id': location.id,
	         		'name': location.name
	         	};
	         	Ti.API.info(aLocation);
	         	tempArray[i] = aLocation;
	         }
	         resultLocations = tempArray;
	         selectedLocation = resultLocations[0];
	         Ti.API.info(resultLocations);
	         initAndroidPicker();
	      },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	     },
	     timeout : 5000  // in milliseconds
	 	});
	 client.open("GET", url);
	 client.send();
}

if (OS_ANDROID) {
	getDataForAndroidPicker();
}


function initAndroidPicker() {
	var androidPicker = Ti.UI.createPicker({
	});
	var data = [];
	// data.push(Ti.UI.createPickerRow({title:"Please Select"}));
	resultLocations.forEach(function (item){
		var row = Ti.UI.createPickerRow({title:item.name});
		data.push(row);
	});
	androidPicker.add(data);
	$.foodButton.enabled = true;
	$.drinkButton.enabled = true;
	$.funButton.enabled = true;
	androidPicker.addEventListener('change', function(event) {
		console.log(JSON.stringify(event.row));
		// if (event.rowIndex > 0) {
		selectedLocation = resultLocations[event.rowIndex];
		// }
		// $.venueLabel.text = selectedLocation.name;
	});
	$.pickVenueView.add(androidPicker);
}

function getDataForAndroidThingPicker() {
	var url = "http://www.ashortstop.com/venues/" + selectedLocation.id + "/things?category=" + selectedCategory;
	Ti.API.info(url);
	 var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	         var things = eval('('+this.responseText+')').things;
	         // Ti.API.info(eval('('+this.responseText+')'));
	      
	         var tempArray = new Array();
	         for (var i = 0; i < things.length; i++) {
	         	var thing = things[i];
	         	var aThing = {
	         		'id': thing.id,
	         		'name': thing.name
	         	};
	         	// Ti.API.info(aLocation);
	         	tempArray[i] = aThing;
	         }
	         resultThings = tempArray;
	         selectedThing = resultThings[0];
	         // Ti.API.info(resultThings);
			initAndroidThingPicker();
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	     },
	     timeout : 5000  // in milliseconds
	 });
	 client.open("GET", url);
	 client.send();
}

function initAndroidThingPicker() {
	var androidPicker = Ti.UI.createPicker({
	});
	var data = [];
	// data.push(Ti.UI.createPickerRow({title:"Please Select"}));
	resultThings.forEach(function (item){
		var row = Ti.UI.createPickerRow({title:item.name});
		data.push(row);
	});
	androidPicker.add(data);
	$.voteButton.enabled = true;
	androidPicker.addEventListener('change', function(event) {
		console.log(JSON.stringify(event.row));
		// if (event.rowIndex > 0) {
		selectedThing = resultThings[event.rowIndex];
		// }
		// $.venueLabel.text = selectedLocation.name;
		
	});
	$.pickThingView.add(androidPicker);
}

function pickVenueClicked(event) {
	var url = "http://www.ashortstop.com/venues/search?lat="+ current_latitude + "&" + current_longitude;
	 var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	         var locations = eval('('+this.responseText+')').venues;
	         var tempArray = new Array();
	         for (var i = 0; i < locations.length; i++) {
	         	var location = locations[i];
	         	var aLocation = {
	         		'id': location.id,
	         		'name': location.name
	         	};
	         	Ti.API.info(aLocation);
	         	tempArray[i] = aLocation;
	         }
	         resultLocations = tempArray;
	         Ti.API.info(resultLocations);
	         
			//--- Picker
			selectedLocation = resultLocations[0];		
			
			var picker_view = Titanium.UI.createView({
				height:251,
				bottom:-251
			});

			
			var locationPicker = Ti.UI.createPicker({
			  top:50
			});
				
			var data = [];
			for (var i = 0; i < resultLocations.length; i++) {
				data[i]=Ti.UI.createPickerRow({title:resultLocations[i].name});
			}
			
			locationPicker.add(data);
			locationPicker.selectionIndicator = true;
			locationPicker.setUseSpinner = true;
			
			locationPicker.addEventListener('change', function(event) {
				selectedLocation = resultLocations[event.rowIndex];
			});
			
			//CREATE SELECTOR BUTTONS
			var cancel =  Titanium.UI.createButton({
				title:"Cancel",
				width: "100dp",
				left: "10dp"
				// style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
			cancel.addEventListener('click', function(event) {
				win.remove(picker_view);
			});
			
			var done =  Titanium.UI.createButton({
				title:"Done",
				width: "100dp",
				right: "10dp"
				// style:Titanium.UI.iPhone.SystemButtonStyle.DONE
			});
			done.addEventListener('click', function(event) {
				win.remove(picker_view);
				$.venueLabel.text = selectedLocation.name;
				$.foodButton.enabled = true;
				$.drinkButton.enabled = true;
				$.funButton.enabled = true;
			});
			
			var spacer =  Titanium.UI.createButton({
				// systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
				width: "80dp"
			});
			
			var toolbar =  Titanium.UI.createToolbar({
				top:0,
				items:[cancel, spacer, done]
			});
			
			picker_view.add(locationPicker);
			picker_view.add(toolbar);
			win.add(picker_view);
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	     },
	     timeout : 5000  // in milliseconds
	 });
	 client.open("GET", url);
	 client.send();
}

function pickThingClicked(event) {
	var url = "http://www.ashortstop.com/venues/" + selectedLocation.id + "/things?category=" + selectedCategory;
	Ti.API.info(url);
	 var client = Ti.Network.createHTTPClient({
	     onload : function(e) {
	         var things = eval('('+this.responseText+')').things;
	         // Ti.API.info(eval('('+this.responseText+')'));
	      
	         var tempArray = new Array();
	         for (var i = 0; i < things.length; i++) {
	         	var thing = things[i];
	         	var aThing = {
	         		'id': thing.id,
	         		'name': thing.name
	         	};
	         	// Ti.API.info(aLocation);
	         	tempArray[i] = aThing;
	         }
	         resultThings = tempArray;
	         // Ti.API.info(resultThings);
	         
			//---		
			if (resultThings.length > 0) {
				selectedThing = resultThings[0];
			}
// 			
			var picker_view = Titanium.UI.createView({
				height:251,
				bottom:-251
			});

			
			var locationPicker = Ti.UI.createPicker({
			  top:50
			});
				
			var data = [];
			for (var i = 0; i < resultThings.length; i++) {
				data[i]=Ti.UI.createPickerRow({title:resultThings[i].name});
			}
			
			locationPicker.add(data);
			locationPicker.selectionIndicator = true;
			locationPicker.setUseSpinner = true;
			
			locationPicker.addEventListener('change', function(event) {
				selectedThing = resultThings[event.rowIndex];
			});
			
			//CREATE SELECTOR BUTTONS
			var cancel =  Titanium.UI.createButton({
				title:"Cancel",
				width: "100dp",
				left: "10dp"
				// style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
			});
			cancel.addEventListener('click', function(event) {
				win.remove(picker_view);
			});
			
			var done =  Titanium.UI.createButton({
				title:"Done",
				width: "100dp",
				right: "10dp"
				// style:Titanium.UI.iPhone.SystemButtonStyle.DONE
			});
			done.addEventListener('click', function(event) {
				win.remove(picker_view);
				$.thingLabel.text = selectedThing.name;
				$.voteButton.enabled = true;
			});
			
			var spacer =  Titanium.UI.createButton({
				// systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
				width: "80dp"
			});
			
			var toolbar =  Titanium.UI.createToolbar({
				top:0,
				items:[cancel, spacer, done]
			});
			
			picker_view.add(locationPicker);
			picker_view.add(toolbar);
			win.add(picker_view);
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	     },
	     timeout : 5000  // in milliseconds
	 });
	 client.open("GET", url);
	 client.send();
}

function foodClicked(event) {
	selectedCategory = "food";
	$.drinkButton.enabled = false;
	$.funButton.enabled = false;
	if (OS_IOS) {
		$.pickThingButton.enabled = true; 
	}
	if (OS_IOS) {
		$.pickThingButton.enabled = true; 
	} else {
		getDataForAndroidThingPicker();
	}
}

function drinkClicked(event) {
	selectedCategory = "drink";
	$.foodButton.enabled = false;
	$.funButton.enabled = false;
	if (OS_IOS) {
		$.pickThingButton.enabled = true; 
	}
	if (OS_IOS) {
		$.pickThingButton.enabled = true; 
	} else {
		getDataForAndroidThingPicker();
	}
}

function funClicked(event) {
	selectedCategory = "fun";
	$.foodButton.enabled = false;
	$.drinkButton.enabled = false;
	if (OS_IOS) {
		$.pickThingButton.enabled = true; 
	} else {
		getDataForAndroidThingPicker();
	}
}

function voteClicked(event) {
	var url = "http://www.ashortstop.com/things/" + selectedThing.id + "/votes";
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	         Ti.API.info("Received text: " + this.responseText);
	         // alert('thank you, vote received');
	         var xpng=require('xpng');
	         var payload = {
	         	"location": selectedLocation.name,
	         	"thing": selectedThing.name,
	         	"thingId": selectedThing.id
	         };
			xpng.openWin(Alloy.CFG.nav,'review', payload);
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	         alert('error');
	     },
	     timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("POST", url);
	 // Send the request.
	 client.send();
}
