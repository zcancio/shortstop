function Controller() {
    function mapClicked(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid + "evt " + evt.clicksource);
        if ("rightButton" == evt.clicksource) {
            Ti.API.info("Annotation " + evt.title + ", right button clicked.");
            var xpng = require("xpng");
            xpng.openWin(Alloy.CFG.nav, "location", {
                myprop: "value"
            });
        }
        ("leftButton" == evt.clicksource || "leftPane" == evt.clicksource || "leftView" == evt.clicksource) && Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
    function setRegion() {}
    function mapRegionChanged() {
        $.mapview.removeAllAnnotations();
        var yahoo = Titanium.Map.createAnnotation({
            latitude: current_latitude,
            longitude: current_longitude,
            title: "Yahoo",
            subtitle: "Sunnyvale, CA",
            pincolor: Titanium.Map.ANNOTATION_GREEN,
            animate: true,
            leftButton: "../images/appcelerator_small.png",
            myid: 2
        });
        $.mapview.addAnnotation(yahoo);
    }
    function createAnnotationFromLocation(location) {
        return Titanium.Map.createAnnotation({
            latitude: location.lat,
            longitude: location.lng,
            title: location.name,
            pincolor: Titanium.Map.ANNOTATION_RED,
            animate: true,
            leftButton: "../images/appcelerator_small.png",
            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
            myid: location.id
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    var __parentSymbol = arguments[0] ? arguments[0]["__parentSymbol"] : null;
    var $model = arguments[0] ? arguments[0]["$model"] : null;
    var __itemTemplate = arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mapWindow = Ti.UI.createWindow({
        id: "mapWindow",
        title: "Map"
    });
    $.__views.mapWindow && $.addTopLevelView($.__views.mapWindow);
    var __alloyId30 = [];
    $.__views.mapview = Ti.Map.createView({
        annotations: __alloyId30,
        id: "mapview",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.mapWindow.add($.__views.mapview);
    mapClicked ? $.__views.mapview.addEventListener("click", mapClicked) : __defers["$.__views.mapview!click!mapClicked"] = true;
    setRegion ? $.__views.mapview.addEventListener("complete", setRegion) : __defers["$.__views.mapview!complete!setRegion"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    var current_longitude;
    var current_latitude;
    args = arguments[0] || {};
    console.log(Ti.API.info(args));
    var my_location = Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.log("error: " + JSON.stringify(e.error));
            return;
        }
        current_longitude = e.coords.longitude;
        current_latitude = e.coords.latitude;
        $.mapview.region = {
            latitude: current_latitude,
            longitude: current_longitude,
            latitudeDelta: .004,
            longitudeDelta: .004
        };
        var url = "http://www.ashortstop.com/venues/search?lat=" + current_latitude + "&" + current_longitude;
        var client = Ti.Network.createHTTPClient({
            onload: function(e) {
                var locations = eval("(" + this.responseText + ")").venues;
                var annotations = [];
                for (var i = 0; locations.length > i; i++) {
                    var location = locations[i];
                    var ann = createAnnotationFromLocation(location);
                    annotations[i] = ann;
                }
                $.mapview.annotations = annotations;
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
            },
            timeout: 5e3
        });
        client.open("GET", url);
        client.send();
    });
    __defers["$.__views.mapview!click!mapClicked"] && $.__views.mapview.addEventListener("click", mapClicked);
    __defers["$.__views.mapview!complete!setRegion"] && $.__views.mapview.addEventListener("complete", setRegion);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;