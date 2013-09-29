function Controller() {
    function onDidItClicked() {}
    function onLaterClicked() {}
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "location";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.locationWindow = Ti.UI.createWindow({
        backgroundColor: "white",
        layout: "vertical",
        id: "locationWindow",
        title: "Location"
    });
    $.__views.locationWindow && $.addTopLevelView($.__views.locationWindow);
    $.__views.doItLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        text: "Do It!",
        id: "doItLabel"
    });
    $.__views.locationWindow.add($.__views.doItLabel);
    $.__views.mainImageView = Ti.UI.createImageView({
        id: "mainImageView",
        image: "http://whatscookingamerica.net/Foto3/ClamChowder.jpg"
    });
    $.__views.locationWindow.add($.__views.mainImageView);
    $.__views.thingNameLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        text: "Clam Chowder",
        id: "thingNameLabel"
    });
    $.__views.locationWindow.add($.__views.thingNameLabel);
    $.__views.locationNameLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        text: "Boudin Restaurant",
        id: "locationNameLabel"
    });
    $.__views.locationWindow.add($.__views.locationNameLabel);
    $.__views.reviewsLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        text: "Reviews",
        id: "reviewsLabel"
    });
    $.__views.locationWindow.add($.__views.reviewsLabel);
    $.__views.actionsView = Ti.UI.createView({
        id: "actionsView",
        layout: "horizontal"
    });
    $.__views.locationWindow.add($.__views.actionsView);
    $.__views.__alloyId0 = Ti.UI.createButton({
        width: "150dp",
        height: "50dp",
        font: {
            fontSize: "16dp"
        },
        left: "10dp",
        title: "Did It!",
        id: "__alloyId0"
    });
    $.__views.actionsView.add($.__views.__alloyId0);
    onDidItClicked ? $.__views.__alloyId0.addEventListener("click", onDidItClicked) : __defers["$.__views.__alloyId0!click!onDidItClicked"] = true;
    $.__views.__alloyId1 = Ti.UI.createButton({
        width: "150dp",
        height: "50dp",
        font: {
            fontSize: "16dp"
        },
        right: "10dp",
        title: "Later",
        id: "__alloyId1"
    });
    $.__views.actionsView.add($.__views.__alloyId1);
    onLaterClicked ? $.__views.__alloyId1.addEventListener("click", onLaterClicked) : __defers["$.__views.__alloyId1!click!onLaterClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    args = arguments[0] || {};
    console.log(Ti.API.info(args));
    __defers["$.__views.__alloyId0!click!onDidItClicked"] && $.__views.__alloyId0.addEventListener("click", onDidItClicked);
    __defers["$.__views.__alloyId1!click!onLaterClicked"] && $.__views.__alloyId1.addEventListener("click", onLaterClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;