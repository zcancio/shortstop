exports.openWin = function(navGroup, winName, payload) {
    if ("undefined" == typeof Alloy) var w = winName; else var w = Alloy.createController(winName, payload).getView();
    w.addEventListener("open", function() {
        if (w.getActivity()) {
            actionBar = w.activity.actionBar;
            if (actionBar) {
                actionBar.displayHomeAsUp = true;
                actionBar.onHomeIconItemSelected = function() {
                    w.close();
                };
            }
            w.activity.invalidateOptionsMenu();
        } else Ti.API.error("Can't access action bar on a lightweight window.");
    });
    w.open();
};