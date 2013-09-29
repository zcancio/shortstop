function Controller() {
    function feelingBoredClicked() {
        var xpng = require("xpng");
        xpng.openWin(Alloy.CFG.nav, "map", {});
    }
    function feelingHungryClicked() {
        var xpng = require("xpng");
        xpng.openWin(Alloy.CFG.nav, "location", {});
    }
    function viewToDoLaterClicked() {
        var xpng = require("xpng");
        xpng.openWin(Alloy.CFG.nav, "doItLater", {});
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.index = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "white",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.win1 = Ti.UI.createWindow({
        layout: "vertical",
        id: "win1",
        title: "ShortStop"
    });
    $.__views.feelingBoredButton = Ti.UI.createButton({
        width: "150",
        height: "50",
        font: {
            fontSize: "16dp"
        },
        id: "feelingBoredButton",
        title: "Feeling bored",
        top: "10"
    });
    $.__views.win1.add($.__views.feelingBoredButton);
    feelingBoredClicked ? $.__views.feelingBoredButton.addEventListener("click", feelingBoredClicked) : __defers["$.__views.feelingBoredButton!click!feelingBoredClicked"] = true;
    $.__views.feelingHungryButton = Ti.UI.createButton({
        width: "150",
        height: "50",
        font: {
            fontSize: "16dp"
        },
        id: "feelingHungryButton",
        title: "Feeling hungry",
        top: "10"
    });
    $.__views.win1.add($.__views.feelingHungryButton);
    feelingHungryClicked ? $.__views.feelingHungryButton.addEventListener("click", feelingHungryClicked) : __defers["$.__views.feelingHungryButton!click!feelingHungryClicked"] = true;
    $.__views.viewToDoLaterButton = Ti.UI.createButton({
        width: "200dp",
        height: "50dp",
        font: {
            fontSize: "16dp"
        },
        id: "viewToDoLaterButton",
        title: "Your List",
        top: "10"
    });
    $.__views.win1.add($.__views.viewToDoLaterButton);
    viewToDoLaterClicked ? $.__views.viewToDoLaterButton.addEventListener("click", viewToDoLaterClicked) : __defers["$.__views.viewToDoLaterButton!click!viewToDoLaterClicked"] = true;
    $.__views.nav = Ti.UI.iPhone.createNavigationGroup({
        window: $.__views.win1,
        id: "nav"
    });
    $.__views.index.add($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.CFG.nav = $.nav;
    $.index.open();
    __defers["$.__views.feelingBoredButton!click!feelingBoredClicked"] && $.__views.feelingBoredButton.addEventListener("click", feelingBoredClicked);
    __defers["$.__views.feelingHungryButton!click!feelingHungryClicked"] && $.__views.feelingHungryButton.addEventListener("click", feelingHungryClicked);
    __defers["$.__views.viewToDoLaterButton!click!viewToDoLaterClicked"] && $.__views.viewToDoLaterButton.addEventListener("click", viewToDoLaterClicked);
    __defers["$.__views.feelingBoredButton!click!feelingBoredClicked"] && $.__views.feelingBoredButton.addEventListener("click", feelingBoredClicked);
    __defers["$.__views.feelingHungryButton!click!feelingHungryClicked"] && $.__views.feelingHungryButton.addEventListener("click", feelingHungryClicked);
    __defers["$.__views.viewToDoLaterButton!click!viewToDoLaterClicked"] && $.__views.viewToDoLaterButton.addEventListener("click", viewToDoLaterClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;