function Controller() {
    function voteClicked() {
        var xpng = require("xpng");
        xpng.openWin(Alloy.CFG.nav, "newVote", {});
    }
    function searchClicked() {
        var xpng = require("xpng");
        xpng.openWin(Alloy.CFG.nav, "map", {});
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
        backgroundColor: "white",
        layout: "vertical",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.win1 = Ti.UI.createWindow({
        layout: "vertical",
        id: "win1",
        title: "ShortStop"
    });
    $.__views.__alloyId12 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        width: "80%",
        height: "40%",
        top: "5%",
        layout: "vertical",
        id: "__alloyId12"
    });
    $.__views.win1.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Vote",
        top: "10%",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createButton({
        width: "206dp",
        height: "107dp",
        font: {
            fontSize: "16dp"
        },
        backgroundImage: "/vote-btn.png",
        id: "__alloyId14"
    });
    $.__views.__alloyId12.add($.__views.__alloyId14);
    voteClicked ? $.__views.__alloyId14.addEventListener("click", voteClicked) : __defers["$.__views.__alloyId14!click!voteClicked"] = true;
    $.__views.__alloyId15 = Ti.UI.createView({
        backgroundColor: "#ffffff",
        width: "80%",
        height: "40%",
        top: "5%",
        layout: "vertical",
        id: "__alloyId15"
    });
    $.__views.win1.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Search",
        top: "10%",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    $.__views.__alloyId17 = Ti.UI.createButton({
        width: "206dp",
        height: "107dp",
        font: {
            fontSize: "16dp"
        },
        backgroundImage: "/search-btn.png",
        id: "__alloyId17"
    });
    $.__views.__alloyId15.add($.__views.__alloyId17);
    searchClicked ? $.__views.__alloyId17.addEventListener("click", searchClicked) : __defers["$.__views.__alloyId17!click!searchClicked"] = true;
    $.__views.nav = Ti.UI.iPhone.createNavigationGroup({
        window: $.__views.win1,
        id: "nav"
    });
    $.__views.index.add($.__views.nav);
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.CFG.nav = $.nav;
    $.index.open();
    __defers["$.__views.__alloyId8!click!voteClicked"] && $.__views.__alloyId8.addEventListener("click", voteClicked);
    __defers["$.__views.__alloyId11!click!searchClicked"] && $.__views.__alloyId11.addEventListener("click", searchClicked);
    __defers["$.__views.__alloyId14!click!voteClicked"] && $.__views.__alloyId14.addEventListener("click", voteClicked);
    __defers["$.__views.__alloyId17!click!searchClicked"] && $.__views.__alloyId17.addEventListener("click", searchClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;