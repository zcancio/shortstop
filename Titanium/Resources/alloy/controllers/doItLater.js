function Controller() {
    function getMockData() {
        var item1 = {
            name: "Item 1",
            location: "1 Sunnyvale",
            rating: "4.5",
            imageUrl: "http://whatscookingamerica.net/Foto3/ClamChowder.jpg"
        };
        var item2 = {
            name: "Item 2",
            location: "2 Sunnyvale",
            rating: "4.4",
            imageUrl: "http://img4-1.myrecipes.timeinc.net/i/recipes/ck/08/01/clam-chowder-ck-1696572-l.jpg"
        };
        var item3 = {
            name: "Item 3",
            location: "3 Sunnyvale",
            rating: "4.3",
            imageUrl: "http://img4-1.myrecipes.timeinc.net/i/recipes/ck/06/09/clam-chowder-ck-1227888-l.jpg"
        };
        return [ item1, item2, item3 ];
    }
    function initializeViews() {
        var listItems = getMockData();
        var tableData = [];
        for (var item in listItems) {
            var row = Ti.UI.createTableViewRow();
            Ti.UI.createLabel({
                left: "10dp",
                text: item.name
            });
            tableData.push(row);
        }
        tableView.setData(tableData);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "doItLater";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.doItLater = Ti.UI.createWindow({
        id: "doItLater",
        title: "Things To Do"
    });
    $.__views.doItLater && $.addTopLevelView($.__views.doItLater);
    $.__views.tableView = Ti.UI.createTableView({
        id: "tableView"
    });
    $.__views.doItLater.add($.__views.tableView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var tableView = $.tableView;
    initializeViews();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;