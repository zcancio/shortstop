function Controller() {
    function openBlueWindow() {
        var xpng = require("xpng");
        xpng.openWin(Alloy.CFG.nav, "win2");
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "win1content";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.win1content = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        title: "Open Blue Window",
        id: "win1content"
    });
    $.__views.win1content && $.addTopLevelView($.__views.win1content);
    openBlueWindow ? $.__views.win1content.addEventListener("click", openBlueWindow) : __defers["$.__views.win1content!click!openBlueWindow"] = true;
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
    __defers["$.__views.win1content!click!openBlueWindow"] && $.__views.win1content.addEventListener("click", openBlueWindow);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;