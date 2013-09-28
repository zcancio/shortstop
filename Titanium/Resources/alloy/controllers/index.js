function Controller() {
    function doClick(evt) {
        Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid);
        ("leftButton" == evt.clicksource || "leftPane" == evt.clicksource || "leftView" == evt.clicksource) && Ti.API.info("Annotation " + evt.title + ", left button clicked.");
    }
    function setRegion() {
        $.mapview.region = {
            latitude: 37.390749,
            longitude: -122.081651,
            latitudeDelta: .01,
            longitudeDelta: .01
        };
    }
    function mapRegionChanged() {
        $.mapview.removeAllAnnotations();
        var yahoo = Titanium.Map.createAnnotation({
            latitude: 37.490749,
            longitude: -122.181651,
            title: "Yahoo",
            subtitle: "Sunnyvale, CA",
            pincolor: Titanium.Map.ANNOTATION_GREEN,
            animate: true,
            leftButton: "../images/appcelerator_small.png",
            myid: 2
        });
        $.mapview.addAnnotation(yahoo);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win1 = Ti.UI.createWindow({
        id: "win1",
        title: "Red Window",
        backgroundColor: "red"
    });
    var __alloyId1 = [];
    $.__views.mountainView = Ti.Map.createAnnotation({
        latitude: 37.390749,
        longitude: -122.081651,
        id: "mountainView",
        title: "Appcelerator Headquarters",
        subtitle: "Mountain View, CA",
        pincolor: Titanium.Map.ANNOTATION_RED,
        leftButton: "/images/appcelerator_small.png",
        myid: "1"
    });
    __alloyId1.push($.__views.mountainView);
    $.__views.mapview = Ti.Map.createView({
        annotations: __alloyId1,
        id: "mapview",
        ns: Ti.Map,
        animate: "true",
        regionFit: "true",
        userLocation: "true",
        mapType: Ti.Map.STANDARD_TYPE
    });
    $.__views.win1.add($.__views.mapview);
    doClick ? $.__views.mapview.addEventListener("click", doClick) : __defers["$.__views.mapview!click!doClick"] = true;
    setRegion ? $.__views.mapview.addEventListener("complete", setRegion) : __defers["$.__views.mapview!complete!setRegion"] = true;
    mapRegionChanged ? $.__views.mapview.addEventListener("regionChanged", mapRegionChanged) : __defers["$.__views.mapview!regionChanged!mapRegionChanged"] = true;
    $.__views.nav = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.win1,
        id: "nav"
    });
    $.__views.nav && $.addTopLevelView($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.CFG.nav = $.nav;
    $.nav.open();
    $.mapview.annotations = [ $.mountainView ];
    $.mapview.region = {
        latitude: 37.390749,
        longitude: -122.081651,
        latitudeDelta: .01,
        longitudeDelta: .01
    };
    __defers["$.__views.mapview!click!doClick"] && $.__views.mapview.addEventListener("click", doClick);
    __defers["$.__views.mapview!complete!setRegion"] && $.__views.mapview.addEventListener("complete", setRegion);
    __defers["$.__views.mapview!click!doClick"] && $.__views.mapview.addEventListener("click", doClick);
    __defers["$.__views.mapview!complete!setRegion"] && $.__views.mapview.addEventListener("complete", setRegion);
    __defers["$.__views.mapview!regionChanged!mapRegionChanged"] && $.__views.mapview.addEventListener("regionChanged", mapRegionChanged);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;