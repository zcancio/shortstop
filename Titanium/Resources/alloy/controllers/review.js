function Controller() {
    function onPickImageClicked() {
        openGallery();
    }
    function onTakeImageClicked() {
        openCamera();
    }
    function submitWithInfo(imageUrl, comment) {
        var url = "http://www.ashortstop.com/things/" + thingId + "/reviews";
        var client = Ti.Network.createHTTPClient({
            onload: function() {
                Ti.API.info("Received text: " + this.responseText);
                alert("thank you, review received");
            },
            onerror: function(e) {
                Ti.API.debug(e.error);
                alert("error");
            },
            timeout: 5e3
        });
        client.open("POST", url);
        var params = {
            image_url: imageUrl,
            text: comment
        };
        client.send(params);
    }
    function onSubmitClicked() {
        Ti.include("sha-aws.js");
        Ti.include("utf8.js");
        Ti.include("date.js");
        var AWSAccessKeyID = "AKIAJGEX42OGJLP7AJNA";
        var AWSSecretAccessKey = "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";
        var AWSBucketName = "static.ashortstop.com";
        var AWSHost = "s3.amazonaws.com";
        var currentDateTime = formatDate(new Date(), "E, d MMM yyyy HH:mm:ss") + " -0700";
        var name = Math.floor(1e6 * Math.random()) + "-" + Math.floor(1e6 * Math.random()) + ".png";
        var xhr = Ti.Network.createHTTPClient();
        xhr.onerror = function(e) {
            var errorDetails = e.error + "\n";
            errorDetails += xhr.responseText;
            Ti.API.info(errorDetails);
        };
        xhr.onload = function() {
            Ti.API.info("got my response, http status code " + this.status);
            var imageUrl = "static.ashortstop.com.s3.amazonaws.com/" + name;
            submitWithInfo(imageUrl, $.commentTextArea.value);
        };
        xhr.setTimeout(99e3);
        xhr.open("PUT", "http://" + AWSHost + "/" + AWSBucketName + "/" + name, false);
        var StringToSign = "PUT\n\nimage/png\n" + currentDateTime + "\nx-amz-acl:public-read\n/" + AWSBucketName + "/" + name;
        var AWSSignature = b64_hmac_sha1(AWSSecretAccessKey, Utf8.encode(StringToSign));
        var AuthorizationHeader = "AWS " + AWSAccessKeyID + ":" + AWSSignature;
        xhr.setRequestHeader("Authorization", AuthorizationHeader);
        xhr.setRequestHeader("X-Amz-Acl", "public-read");
        xhr.setRequestHeader("Host", AWSHost);
        xhr.setRequestHeader("Content-Type", "image/png");
        xhr.setRequestHeader("Date", currentDateTime);
        xhr.send(selectedImage);
    }
    function openCamera() {
        Titanium.Media.showCamera({
            success: function(event) {
                Ti.API.info("success! event: " + JSON.stringify(event));
                var image = event.media;
                imageView.image = image;
                selectedImage = image;
            },
            cancel: function() {},
            error: function() {},
            allowEditing: false
        });
    }
    function openGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                event.cropRect;
                var image = event.media;
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    imageView.image = image;
                    selectedImage = image;
                }
            },
            cancel: function() {},
            error: function() {},
            allowEditing: false,
            popoverView: popoverView,
            arrowDirection: arrowDirection,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "review";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.voteWindow = Ti.UI.createWindow({
        id: "voteWindow",
        title: "New Vote",
        layout: "vertical",
        backgroundColor: "white"
    });
    $.__views.voteWindow && $.addTopLevelView($.__views.voteWindow);
    $.__views.__alloyId34 = Ti.UI.createScrollView({
        layout: "vertical",
        height: "100%",
        width: "100%",
        id: "__alloyId34"
    });
    $.__views.voteWindow.add($.__views.__alloyId34);
    $.__views.__alloyId35 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId35"
    });
    $.__views.__alloyId34.add($.__views.__alloyId35);
    $.__views.__alloyId36 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        text: "+1 vote",
        id: "__alloyId36"
    });
    $.__views.__alloyId35.add($.__views.__alloyId36);
    $.__views.thingLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        text: "Hackathon",
        id: "thingLabel"
    });
    $.__views.__alloyId35.add($.__views.thingLabel);
    $.__views.locationLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        color: "#000",
        font: {
            fontSize: "20dp"
        },
        text: "Yahoo",
        id: "locationLabel"
    });
    $.__views.__alloyId35.add($.__views.locationLabel);
    $.__views.mainImageView = Ti.UI.createImageView({
        id: "mainImageView",
        height: "150dp"
    });
    $.__views.__alloyId35.add($.__views.mainImageView);
    $.__views.__alloyId37 = Ti.UI.createView({
        layout: "horizontal",
        height: "60dp",
        id: "__alloyId37"
    });
    $.__views.__alloyId35.add($.__views.__alloyId37);
    $.__views.__alloyId38 = Ti.UI.createButton({
        width: "60dp",
        height: "60dp",
        font: {
            fontSize: "16dp"
        },
        backgroundImage: "photo-icon.png",
        left: "80dp",
        right: "20dp",
        id: "__alloyId38"
    });
    $.__views.__alloyId37.add($.__views.__alloyId38);
    onTakeImageClicked ? $.__views.__alloyId38.addEventListener("click", onTakeImageClicked) : __defers["$.__views.__alloyId38!click!onTakeImageClicked"] = true;
    $.__views.__alloyId39 = Ti.UI.createButton({
        width: "60dp",
        height: "60dp",
        font: {
            fontSize: "16dp"
        },
        backgroundImage: "image-icon.png",
        left: "20dp",
        right: "80dp",
        id: "__alloyId39"
    });
    $.__views.__alloyId37.add($.__views.__alloyId39);
    onPickImageClicked ? $.__views.__alloyId39.addEventListener("click", onPickImageClicked) : __defers["$.__views.__alloyId39!click!onPickImageClicked"] = true;
    $.__views.commentTextArea = Ti.UI.createTextArea({
        id: "commentTextArea",
        borderWidth: "1",
        borderColor: "#bbb",
        borderRadius: "5",
        color: "#888",
        textAlign: "left",
        value: "",
        width: "300",
        height: "50"
    });
    $.__views.__alloyId35.add($.__views.commentTextArea);
    $.__views.__alloyId40 = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        title: "Submit",
        id: "__alloyId40"
    });
    $.__views.__alloyId35.add($.__views.__alloyId40);
    onSubmitClicked ? $.__views.__alloyId40.addEventListener("click", onSubmitClicked) : __defers["$.__views.__alloyId40!click!onSubmitClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
    args = arguments[0] || {};
    console.log(Ti.API.info(args));
    $.thingLabel.text = args.thing;
    $.locationLabel.text = args.location;
    var thingId = args.thingId;
    var imageView = $.mainImageView;
    var xhr = Ti.Network.createHTTPClient();
    xhr.ondatastream = function() {
        alert("Success?  Check your S3 bucket to be sure.");
    };
    xhr.onerror = function(e) {
        var errorDetails = e.error + "\n";
        errorDetails += xhr.responseText;
        alert(errorDetails);
    };
    xhr.onload = function() {
        Ti.API.info("got my response, http status code " + this.status);
    };
    var popoverView, arrowDirection, imageView, selectedImage;
    imageView = $.mainImageView;
    __defers["$.__views.__alloyId38!click!onTakeImageClicked"] && $.__views.__alloyId38.addEventListener("click", onTakeImageClicked);
    __defers["$.__views.__alloyId39!click!onPickImageClicked"] && $.__views.__alloyId39.addEventListener("click", onPickImageClicked);
    __defers["$.__views.__alloyId40!click!onSubmitClicked"] && $.__views.__alloyId40.addEventListener("click", onSubmitClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;