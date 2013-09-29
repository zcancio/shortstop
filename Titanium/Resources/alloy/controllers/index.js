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
        exitOnClose: "true",
        navBarHidden: "false",
        id: "index"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId6 = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        height: "60dp",
        id: "__alloyId6"
    });
    $.__views.index.add($.__views.__alloyId6);
    $.__views.__alloyId7 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        text: "Vote for you favorite",
        id: "__alloyId7"
    });
    $.__views.__alloyId6.add($.__views.__alloyId7);
    $.__views.__alloyId8 = Ti.UI.createView({
        backgroundImage: "divider.png",
        height: "2dp",
        id: "__alloyId8"
    });
    $.__views.index.add($.__views.__alloyId8);
    $.__views.__alloyId9 = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        height: "60dp",
        id: "__alloyId9"
    });
    $.__views.index.add($.__views.__alloyId9);
    $.__views.__alloyId10 = Ti.UI.createButton({
        width: "200dp",
        height: "50dp",
        font: {
            fontSize: "16dp"
        },
        backgroundColor: "#f8f8f8",
        title: "Vote",
        id: "__alloyId10"
    });
    $.__views.__alloyId9.add($.__views.__alloyId10);
    voteClicked ? $.__views.__alloyId10.addEventListener("click", voteClicked) : __defers["$.__views.__alloyId10!click!voteClicked"] = true;
    $.__views.__alloyId11 = Ti.UI.createView({
        backgroundImage: "divider.png",
        height: "2dp",
        id: "__alloyId11"
    });
    $.__views.index.add($.__views.__alloyId11);
    $.__views.__alloyId12 = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        height: "60dp",
        id: "__alloyId12"
    });
    $.__views.index.add($.__views.__alloyId12);
    $.__views.__alloyId13 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        backgroundColor: "#f8f8f8",
        text: "Search",
        id: "__alloyId13"
    });
    $.__views.__alloyId12.add($.__views.__alloyId13);
    $.__views.__alloyId14 = Ti.UI.createView({
        backgroundImage: "divider.png",
        height: "2dp",
        id: "__alloyId14"
    });
    $.__views.index.add($.__views.__alloyId14);
    $.__views.__alloyId15 = Ti.UI.createView({
        backgroundColor: "#f8f8f8",
        height: "60dp",
        id: "__alloyId15"
    });
    $.__views.index.add($.__views.__alloyId15);
    $.__views.__alloyId16 = Ti.UI.createButton({
        width: "200dp",
        height: "50dp",
        font: {
            fontSize: "16dp"
        },
        backgroundColor: "#f8f8f8",
        title: "Search",
        id: "__alloyId16"
    });
    $.__views.__alloyId15.add($.__views.__alloyId16);
    searchClicked ? $.__views.__alloyId16.addEventListener("click", searchClicked) : __defers["$.__views.__alloyId16!click!searchClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    Alloy.CFG.nav = $.nav;
    $.index.open();
    __defers["$.__views.__alloyId10!click!voteClicked"] && $.__views.__alloyId10.addEventListener("click", voteClicked);
    __defers["$.__views.__alloyId16!click!searchClicked"] && $.__views.__alloyId16.addEventListener("click", searchClicked);
    __defers["$.__views.__alloyId21!click!voteClicked"] && $.__views.__alloyId21.addEventListener("click", voteClicked);
    __defers["$.__views.__alloyId27!click!searchClicked"] && $.__views.__alloyId27.addEventListener("click", searchClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;