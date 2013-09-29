var actionBarHelper = function(win) {
    if (true && Ti.Platform.Android.API_LEVEL > 11) {
        this.win = win;
        this.activity = win.getActivity();
        this.actionBar = this.activity.actionBar;
    } else console.log("This is an Android-only library.");
};

actionBarHelper.prototype.setTitle = function(title) {
    var that = this;
    true && Ti.Platform.Android.API_LEVEL > 11 && (that.activity ? that.actionBar ? that.actionBar.title = title : console.log("Error: I don't see an action bar here") : console.log("Error: Unable to get activity...weird"));
};

actionBarHelper.prototype.setUpAction = function(action) {
    var that = this;
    if (true && Ti.Platform.Android.API_LEVEL > 11) if (that.activity) if (that.actionBar) if (action) {
        that.actionBar.displayHomeAsUp = true;
        that.actionBar.onHomeIconItemSelected = action;
    } else {
        that.actionBar.displayHomeAsUp = false;
        that.actionBar.onHomeIconItemSelected = null;
    } else console.log("Error: I don't see an action bar here"); else console.log("Error: Unable to get activity...weird");
};

actionBarHelper.prototype.setBackgroundImage = function(image) {
    var that = this;
    true && Ti.Platform.Android.API_LEVEL > 11 && (that.activity ? that.actionBar ? that.actionBar.backgroundImage = image : console.log("Error: I don't see an action bar here") : console.log("Error: Unable to get activity...weird"));
};

actionBarHelper.prototype.setIcon = function(icon) {
    var that = this;
    if (true && Ti.Platform.Android.API_LEVEL > 11) if (that.activity) if (that.actionBar) {
        that.actionBar.icon = icon;
        that.actionBar.logo = icon;
    } else console.log("Error: I don't see an action bar here"); else console.log("Error: Unable to get activity...weird");
};

actionBarHelper.prototype.hide = function() {
    var that = this;
    true && Ti.Platform.Android.API_LEVEL > 11 && (that.activity ? that.actionBar ? that.actionBar.hide() : console.log("Error: I don't see an action bar here") : console.log("Error: Unable to get activity...weird"));
};

actionBarHelper.prototype.show = function() {
    var that = this;
    true && Ti.Platform.Android.API_LEVEL > 11 && (that.activity ? that.actionBar ? that.actionBar.show() : console.log("Error: I don't see an action bar here") : console.log("Error: Unable to get activity...weird"));
};

actionBarHelper.prototype.reloadMenu = function() {
    var that = this;
    true && Ti.Platform.Android.API_LEVEL > 11 && (that.activity ? that.activity.invalidateOptionsMenu() : console.log("Error: Unable to get activity...weird"));
};

exports.actionBarHelper = actionBarHelper;