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
    function getMockAnnotations() {
        var yahoo = Titanium.Map.createAnnotation({
            latitude: current_latitude - .003,
            longitude: current_longitude - .002,
            title: "Yahoo",
            subtitle: "Sunnyvale, CA",
            pincolor: Titanium.Map.ANNOTATION_GREEN,
            animate: true,
            leftButton: "../images/appcelerator_small.png",
            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
            myid: 1
        });
        var google = Titanium.Map.createAnnotation({
            latitude: current_latitude + .005,
            longitude: current_longitude + .004,
            title: "Yahoo",
            subtitle: "Sunnyvale, CA",
            pincolor: Titanium.Map.ANNOTATION_GREEN,
            animate: true,
            leftButton: "../images/appcelerator_small.png",
            rightButton: Titanium.UI.iPhone.SystemButton.DISCLOSURE,
            myid: 2
        });
        return [ yahoo, google ];
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.mapWindow = Ti.UI.createWindow({
        id: "mapWindow",
        title: "Map"
    });
    $.__views.mapWindow && $.addTopLevelView($.__views.mapWindow);
    var __alloyId2 = [];
    $.__views.mapview = Ti.Map.createView({
        annotations: __alloyId2,
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
    Titanium.Geolocation.getCurrentPosition(function(e) {
        if (e.error) {
            Ti.API.log("error: " + JSON.stringify(e.error));
            return;
        }
        current_longitude = e.coords.longitude;
        current_latitude = e.coords.latitude;
        $.mapview.region = {
            latitude: current_latitude,
            longitude: current_longitude,
            latitudeDelta: .01,
            longitudeDelta: .01
        };
        var annotations = getMockAnnotations();
        $.mapview.addAnnotations(annotations);
    });
    __defers["$.__views.mapview!click!mapClicked"] && $.__views.mapview.addEventListener("click", mapClicked);
    __defers["$.__views.mapview!complete!setRegion"] && $.__views.mapview.addEventListener("complete", setRegion);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;