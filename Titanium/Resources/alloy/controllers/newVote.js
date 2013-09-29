function Controller() {
    function getDataForAndroidPicker() {
        var url = "http://www.ashortstop.com/venues/search?lat=" + current_latitude + "&" + current_longitude;
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                var locations = eval("(" + this.responseText + ")").venues;
                var tempArray = new Array();
                for (var i = 0; locations.length > i; i++) {
                    var location = locations[i];
                    var aLocation = {
                        id: location.id,
                        name: location.name
                    };
                    Ti.API.info(aLocation);
                    tempArray[i] = aLocation;
                }
                resultLocations = tempArray;
                selectedLocation = resultLocations[0];
                Ti.API.info(resultLocations);
                initAndroidPicker();
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function initAndroidPicker() {
        var androidPicker = Ti.UI.createPicker({});
        var data = [];
        resultLocations.forEach(function(item) {
            var row = Ti.UI.createPickerRow({
                title: item.name
            });
            data.push(row);
        });
        androidPicker.add(data);
        $.foodButton.enabled = true;
        $.drinkButton.enabled = true;
        $.funButton.enabled = true;
        androidPicker.addEventListener("change", function(event) {
            console.log(JSON.stringify(event.row));
            selectedLocation = resultLocations[event.rowIndex];
        });
        $.pickVenueView.add(androidPicker);
    }
    function getDataForAndroidThingPicker() {
        var url = "http://www.ashortstop.com/venues/" + selectedLocation.id + "/things?category=" + selectedCategory;
        Ti.API.info(url);
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                var things = eval("(" + this.responseText + ")").things;
                var tempArray = new Array();
                for (var i = 0; things.length > i; i++) {
                    var thing = things[i];
                    var aThing = {
                        id: thing.id,
                        name: thing.name
                    };
                    tempArray[i] = aThing;
                }
                resultThings = tempArray;
                selectedThing = resultThings[0];
                initAndroidThingPicker();
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function initAndroidThingPicker() {
        var androidPicker = Ti.UI.createPicker({});
        var data = [];
        resultThings.forEach(function(item) {
            var row = Ti.UI.createPickerRow({
                title: item.name
            });
            data.push(row);
        });
        androidPicker.add(data);
        $.voteButton.enabled = true;
        androidPicker.addEventListener("change", function(event) {
            console.log(JSON.stringify(event.row));
            selectedThing = resultThings[event.rowIndex];
        });
        $.pickThingView.add(androidPicker);
    }
    function pickVenueClicked(event) {
        var url = "http://www.ashortstop.com/venues/search?lat=" + current_latitude + "&" + current_longitude;
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                var locations = eval("(" + this.responseText + ")").venues;
                var tempArray = new Array();
                for (var i = 0; locations.length > i; i++) {
                    var location = locations[i];
                    var aLocation = {
                        id: location.id,
                        name: location.name
                    };
                    Ti.API.info(aLocation);
                    tempArray[i] = aLocation;
                }
                resultLocations = tempArray;
                Ti.API.info(resultLocations);
                selectedLocation = resultLocations[0];
                var picker_view = Titanium.UI.createView({
                    height: 251,
                    bottom: -251
                });
                var locationPicker = Ti.UI.createPicker({
                    top: 50
                });
                var data = [];
                for (var i = 0; resultLocations.length > i; i++) data[i] = Ti.UI.createPickerRow({
                    title: resultLocations[i].name
                });
                locationPicker.add(data);
                locationPicker.selectionIndicator = true;
                locationPicker.setUseSpinner = true;
                locationPicker.addEventListener("change", function(event) {
                    selectedLocation = resultLocations[event.rowIndex];
                });
                var cancel = Titanium.UI.createButton({
                    title: "Cancel",
                    width: "100dp",
                    left: "10dp"
                });
                cancel.addEventListener("click", function() {
                    win.remove(picker_view);
                });
                var done = Titanium.UI.createButton({
                    title: "Done",
                    width: "100dp",
                    right: "10dp"
                });
                done.addEventListener("click", function() {
                    win.remove(picker_view);
                    $.venueLabel.text = selectedLocation.name;
                    $.foodButton.enabled = true;
                    $.drinkButton.enabled = true;
                    $.funButton.enabled = true;
                });
                var spacer = Titanium.UI.createButton({
                    width: "80dp"
                });
                var toolbar = Titanium.UI.createToolbar({
                    top: 0,
                    items: [ cancel, spacer, done ]
                });
                picker_view.add(locationPicker);
                picker_view.add(toolbar);
                win.add(picker_view);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function pickThingClicked(event) {
        var url = "http://www.ashortstop.com/venues/" + selectedLocation.id + "/things?category=" + selectedCategory;
        Ti.API.info(url);
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                var things = eval("(" + this.responseText + ")").things;
                var tempArray = new Array();
                for (var i = 0; things.length > i; i++) {
                    var thing = things[i];
                    var aThing = {
                        id: thing.id,
                        name: thing.name
                    };
                    tempArray[i] = aThing;
                }
                resultThings = tempArray;
                resultThings.length > 0 && (selectedThing = resultThings[0]);
                var picker_view = Titanium.UI.createView({
                    height: 251,
                    bottom: -251
                });
                var locationPicker = Ti.UI.createPicker({
                    top: 50
                });
                var data = [];
                for (var i = 0; resultThings.length > i; i++) data[i] = Ti.UI.createPickerRow({
                    title: resultThings[i].name
                });
                locationPicker.add(data);
                locationPicker.selectionIndicator = true;
                locationPicker.setUseSpinner = true;
                locationPicker.addEventListener("change", function(event) {
                    selectedThing = resultThings[event.rowIndex];
                });
                var cancel = Titanium.UI.createButton({
                    title: "Cancel",
                    width: "100dp",
                    left: "10dp"
                });
                cancel.addEventListener("click", function() {
                    win.remove(picker_view);
                });
                var done = Titanium.UI.createButton({
                    title: "Done",
                    width: "100dp",
                    right: "10dp"
                });
                done.addEventListener("click", function() {
                    win.remove(picker_view);
                    $.thingLabel.text = selectedThing.name;
                    $.voteButton.enabled = true;
                });
                var spacer = Titanium.UI.createButton({
                    width: "80dp"
                });
                var toolbar = Titanium.UI.createToolbar({
                    top: 0,
                    items: [ cancel, spacer, done ]
                });
                picker_view.add(locationPicker);
                picker_view.add(toolbar);
                win.add(picker_view);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    }
    function foodClicked() {
        selectedCategory = "food";
        $.drinkButton.enabled = false;
        $.funButton.enabled = false;
        $.pickThingButton.enabled = true;
        $.pickThingButton.enabled = true;
    }
    function drinkClicked() {
        selectedCategory = "drink";
        $.foodButton.enabled = false;
        $.funButton.enabled = false;
        $.pickThingButton.enabled = true;
        $.pickThingButton.enabled = true;
    }
    function funClicked() {
        selectedCategory = "fun";
        $.foodButton.enabled = false;
        $.drinkButton.enabled = false;
        $.pickThingButton.enabled = true;
    }
    function voteClicked() {
        var url = "http://www.ashortstop.com/things/" + selectedThing.id + "/votes";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                var xpng = require("xpng");
                var payload = {
                    location: selectedLocation.name,
                    thing: selectedThing.name,
                    thingId: selectedThing.id
                };
                xpng.openWin(Alloy.CFG.nav, "review", payload);
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 5e3
        });
        client.open("POST", url);
        client.send();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "newVote";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.voteWindow = Ti.UI.createWindow({
        backgroundImage: "bg.png",
        id: "voteWindow",
        title: "New Vote",
        layout: "vertical",
        backgroundColor: "white"
    });
    $.__views.voteWindow && $.addTopLevelView($.__views.voteWindow);
    $.__views.__alloyId21 = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        layout: "vertical",
        height: "100dp",
        id: "__alloyId21"
    });
    $.__views.voteWindow.add($.__views.__alloyId21);
    $.__views.__alloyId22 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Find Venue",
        top: "5dp",
        id: "__alloyId22"
    });
    $.__views.__alloyId21.add($.__views.__alloyId22);
    $.__views.pickVenueButton = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        title: "Pick Venue",
        id: "pickVenueButton"
    });
    $.__views.__alloyId21.add($.__views.pickVenueButton);
    pickVenueClicked ? $.__views.pickVenueButton.addEventListener("click", pickVenueClicked) : __defers["$.__views.pickVenueButton!click!pickVenueClicked"] = true;
    $.__views.venueLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Not selected",
        id: "venueLabel"
    });
    $.__views.__alloyId21.add($.__views.venueLabel);
    $.__views.__alloyId23 = Ti.UI.createView({
        backgroundImage: "divider.png",
        height: "2dp",
        id: "__alloyId23"
    });
    $.__views.voteWindow.add($.__views.__alloyId23);
    $.__views.__alloyId24 = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        layout: "vertical",
        height: "50dp",
        id: "__alloyId24"
    });
    $.__views.voteWindow.add($.__views.__alloyId24);
    $.__views.__alloyId25 = Ti.UI.createView({
        width: Ti.UI.FILL,
        top: "5dp",
        height: "40dp",
        layout: "horizontal",
        id: "__alloyId25"
    });
    $.__views.__alloyId24.add($.__views.__alloyId25);
    $.__views.foodView = Ti.UI.createView({
        id: "foodView",
        width: "33%"
    });
    $.__views.__alloyId25.add($.__views.foodView);
    $.__views.foodButton = Ti.UI.createButton({
        width: "80dp",
        height: "37dp",
        font: {
            fontSize: "16dp"
        },
        backgroundImage: "/food-button.png",
        id: "foodButton",
        enabled: "false"
    });
    $.__views.foodView.add($.__views.foodButton);
    foodClicked ? $.__views.foodButton.addEventListener("click", foodClicked) : __defers["$.__views.foodButton!click!foodClicked"] = true;
    $.__views.drinkView = Ti.UI.createView({
        id: "drinkView",
        width: "33%"
    });
    $.__views.__alloyId25.add($.__views.drinkView);
    $.__views.drinkButton = Ti.UI.createButton({
        width: "80dp",
        height: "37dp",
        font: {
            fontSize: "16dp"
        },
        backgroundImage: "/drink-button.png",
        id: "drinkButton",
        enabled: "false"
    });
    $.__views.drinkView.add($.__views.drinkButton);
    drinkClicked ? $.__views.drinkButton.addEventListener("click", drinkClicked) : __defers["$.__views.drinkButton!click!drinkClicked"] = true;
    $.__views.funView = Ti.UI.createView({
        id: "funView",
        width: "33%"
    });
    $.__views.__alloyId25.add($.__views.funView);
    $.__views.funButton = Ti.UI.createButton({
        width: "80dp",
        height: "37dp",
        font: {
            fontSize: "16dp"
        },
        backgroundImage: "/fun-button.png",
        id: "funButton",
        enabled: "false"
    });
    $.__views.funView.add($.__views.funButton);
    funClicked ? $.__views.funButton.addEventListener("click", funClicked) : __defers["$.__views.funButton!click!funClicked"] = true;
    $.__views.__alloyId26 = Ti.UI.createView({
        backgroundImage: "divider.png",
        height: "2dp",
        id: "__alloyId26"
    });
    $.__views.voteWindow.add($.__views.__alloyId26);
    $.__views.__alloyId27 = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        layout: "vertical",
        height: "100dp",
        id: "__alloyId27"
    });
    $.__views.voteWindow.add($.__views.__alloyId27);
    $.__views.__alloyId28 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Select Thing",
        id: "__alloyId28"
    });
    $.__views.__alloyId27.add($.__views.__alloyId28);
    $.__views.pickThingButton = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        title: "Pick Thing",
        id: "pickThingButton",
        enabled: "false"
    });
    $.__views.__alloyId27.add($.__views.pickThingButton);
    pickThingClicked ? $.__views.pickThingButton.addEventListener("click", pickThingClicked) : __defers["$.__views.pickThingButton!click!pickThingClicked"] = true;
    $.__views.thingLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Not selected",
        id: "thingLabel"
    });
    $.__views.__alloyId27.add($.__views.thingLabel);
    $.__views.__alloyId29 = Ti.UI.createView({
        backgroundImage: "divider.png",
        height: "2dp",
        id: "__alloyId29"
    });
    $.__views.voteWindow.add($.__views.__alloyId29);
    $.__views.__alloyId30 = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        layout: "vertical",
        height: "50dp",
        id: "__alloyId30"
    });
    $.__views.voteWindow.add($.__views.__alloyId30);
    $.__views.voteButton = Ti.UI.createButton({
        width: "276dp",
        height: "42dp",
        font: {
            fontSize: "16dp"
        },
        backgroundImage: "/count-it-button.png",
        id: "voteButton",
        enabled: "false",
        top: "4dp"
    });
    $.__views.__alloyId30.add($.__views.voteButton);
    voteClicked ? $.__views.voteButton.addEventListener("click", voteClicked) : __defers["$.__views.voteButton!click!voteClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var win = $.voteWindow;
    var current_longitude, current_latitude;
    var selectedCategory;
    var resultLocations;
    var resultThings;
    var selectedLocation;
    var selectedThing;
    var my_location = Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.log("error: " + JSON.stringify(e.error));
            return;
        }
        current_longitude = e.coords.longitude;
        current_latitude = e.coords.latitude;
    });
    __defers["$.__views.pickVenueButton!click!pickVenueClicked"] && $.__views.pickVenueButton.addEventListener("click", pickVenueClicked);
    __defers["$.__views.foodButton!click!foodClicked"] && $.__views.foodButton.addEventListener("click", foodClicked);
    __defers["$.__views.drinkButton!click!drinkClicked"] && $.__views.drinkButton.addEventListener("click", drinkClicked);
    __defers["$.__views.funButton!click!funClicked"] && $.__views.funButton.addEventListener("click", funClicked);
    __defers["$.__views.pickThingButton!click!pickThingClicked"] && $.__views.pickThingButton.addEventListener("click", pickThingClicked);
    __defers["$.__views.voteButton!click!voteClicked"] && $.__views.voteButton.addEventListener("click", voteClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;