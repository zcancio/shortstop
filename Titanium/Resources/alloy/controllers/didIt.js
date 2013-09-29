function Controller() {
    function onPickImageClicked() {
        openGallery();
    }
    function onTakeImageClicked() {
        openCamera();
    }
    function onRateClicked() {
        Ti.include("sha-aws.js");
        Ti.include("utf8.js");
        Ti.include("date.js");
        var AWSAccessKeyID = "AKIAJGEX42OGJLP7AJNA";
        var AWSSecretAccessKey = "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";
        var AWSBucketName = "static.ashortstop.com";
        var AWSHost = "s3.amazonaws.com";
        var currentDateTime = formatDate(new Date(), "E, d MMM yyyy HH:mm:ss") + " -0700";
        var name = "testing.png";
        var xhr = Ti.Network.createHTTPClient();
        xhr.onerror = function(e) {
            var errorDetails = e.error + "\n";
            errorDetails += xhr.responseText;
            Ti.API.info(errorDetails);
        };
        xhr.onload = function() {
            Ti.API.info("got my response, http status code " + this.status);
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
            allowEditing: true
        });
    }
    function openGallery() {
        Titanium.Media.openPhotoGallery({
            success: function(event) {
                var cropRect = event.cropRect;
                var image = event.media;
                Ti.API.debug("Our type was: " + event.mediaType);
                if (event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
                    imageView.image = image;
                    selectedImage = image;
                }
                Titanium.API.info("PHOTO GALLERY SUCCESS cropRect.x " + cropRect.x + " cropRect.y " + cropRect.y + " cropRect.height " + cropRect.height + " cropRect.width " + cropRect.width);
            },
            cancel: function() {},
            error: function() {},
            allowEditing: true,
            popoverView: popoverView,
            arrowDirection: arrowDirection,
            mediaTypes: [ Ti.Media.MEDIA_TYPE_VIDEO, Ti.Media.MEDIA_TYPE_PHOTO ]
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "didIt";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    var __defers = {};
    $.__views.didItWindow = Ti.UI.createWindow({
        id: "didItWindow",
        title: "Did It",
        layout: "vertical",
        background: "white"
    });
    $.__views.didItWindow && $.addTopLevelView($.__views.didItWindow);
    $.__views.didItLabel = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Did It!",
        id: "didItLabel"
    });
    $.__views.didItWindow.add($.__views.didItLabel);
    $.__views.__alloyId0 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Do you want to share your own experience?",
        id: "__alloyId0"
    });
    $.__views.didItWindow.add($.__views.__alloyId0);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "horizontal",
        height: "50dp",
        id: "__alloyId1"
    });
    $.__views.didItWindow.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createButton({
        width: "150dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        title: "Take Image",
        left: "10dp",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    onTakeImageClicked ? $.__views.__alloyId2.addEventListener("click", onTakeImageClicked) : __defers["$.__views.__alloyId2!click!onTakeImageClicked"] = true;
    $.__views.__alloyId3 = Ti.UI.createButton({
        width: "150dp",
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        title: "Pick Image",
        right: "10dp",
        id: "__alloyId3"
    });
    $.__views.__alloyId1.add($.__views.__alloyId3);
    onPickImageClicked ? $.__views.__alloyId3.addEventListener("click", onPickImageClicked) : __defers["$.__views.__alloyId3!click!onPickImageClicked"] = true;
    $.__views.mainImageView = Ti.UI.createImageView({
        id: "mainImageView",
        height: "200dp"
    });
    $.__views.didItWindow.add($.__views.mainImageView);
    $.__views.__alloyId4 = Ti.UI.createLabel({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "20dp"
        },
        text: "Do you want to rate it?",
        id: "__alloyId4"
    });
    $.__views.didItWindow.add($.__views.__alloyId4);
    $.__views.__alloyId5 = Ti.UI.createButton({
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE,
        font: {
            fontSize: "16dp"
        },
        title: "Rate!!!",
        id: "__alloyId5"
    });
    $.__views.didItWindow.add($.__views.__alloyId5);
    onRateClicked ? $.__views.__alloyId5.addEventListener("click", onRateClicked) : __defers["$.__views.__alloyId5!click!onRateClicked"] = true;
    exports.destroy = function() {};
    _.extend($, $.__views);
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
    __defers["$.__views.__alloyId2!click!onTakeImageClicked"] && $.__views.__alloyId2.addEventListener("click", onTakeImageClicked);
    __defers["$.__views.__alloyId3!click!onPickImageClicked"] && $.__views.__alloyId3.addEventListener("click", onPickImageClicked);
    __defers["$.__views.__alloyId5!click!onRateClicked"] && $.__views.__alloyId5.addEventListener("click", onRateClicked);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;