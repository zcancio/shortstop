args=arguments[0] || {};
console.log(Ti.API.info(args));

$.thingLabel.text = args.thing;
$.locationLabel.text = args.location;
var thingId = args.thingId;
var imageView = $.mainImageView;

function onPickImageClicked(event) {
	openGallery();
}

function onTakeImageClicked(event) {
	openCamera();
}

var xhr = Ti.Network.createHTTPClient();

xhr.ondatastream = function(e)
{
    alert('Success?  Check your S3 bucket to be sure.');
};

xhr.onerror = function(e)
{
	var errorDetails = e.error + '\n';
	errorDetails += xhr.responseText;
	alert(errorDetails);
};

xhr.onload = function() {
    Ti.API.info('got my response, http status code ' + this.status);
};

function submitWithInfo(imageUrl, comment) {
	var url = "http://www.ashortstop.com/things/" + thingId + "/reviews";
	var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	        Ti.API.info("Received text: " + this.responseText);
	        alert('thank you, review received');
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	         Ti.API.debug(e.error);
	         alert('error');
	     },
	     timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("POST", url);
	 // Send the request.
	 var params = {
	 	"image_url": imageUrl,
	 	"text": comment
	 };
	 client.send(params);
}

function onSubmitClicked(event) {
	Ti.include('sha-aws.js'); 	// file comes from this URL's project: http://aws.amazon.com/code/Amazon-S3/3236824658053653
	Ti.include('utf8.js'); 		// code for this file from this URL: http://www.webtoolkit.info/javascript-utf8.html
	Ti.include('date.js'); 		// file comes from this URL: http://www.mattkruse.com/javascript/date/source.html
	
	var AWSAccessKeyID = "AKIAJGEX42OGJLP7AJNA";
	var AWSSecretAccessKey = "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";
 
	var AWSBucketName = "static.ashortstop.com";
	var AWSHost = "s3.amazonaws.com";
	
	var currentDateTime = formatDate(new Date(),'E, d MMM yyyy HH:mm:ss') + ' -0700';
	// var name = "testing.png";
	var name = Math.floor(Math.random()*1000000) + "-" + Math.floor(Math.random()*1000000) + ".png";
	
	var xhr = Ti.Network.createHTTPClient();
	
	xhr.onerror = function(e) {
		var errorDetails = e.error + '\n';
		errorDetails += xhr.responseText;
		Ti.API.info(errorDetails);
	};
	
	xhr.onload = function() {
	    Ti.API.info('got my response, http status code ' + this.status);
	    var imageUrl = "static.ashortstop.com.s3.amazonaws.com/" + name;
	 	submitWithInfo(imageUrl, $.commentTextArea.value);
	};
	
	//ensure we have time to upload
 	xhr.setTimeout(99000);
	
	xhr.open('PUT', 'http://' + AWSHost + '/' + AWSBucketName + '/' + name, false);
 
	var StringToSign = 'PUT\n\n' + "image/png" + "\n" + currentDateTime + '\nx-amz-acl:public-read\n/'+AWSBucketName+'/' + name;
 
	var AWSSignature = b64_hmac_sha1(AWSSecretAccessKey, Utf8.encode(StringToSign));
	var AuthorizationHeader = 'AWS ' + AWSAccessKeyID + ':' + AWSSignature;
	
	xhr.setRequestHeader('Authorization', AuthorizationHeader);
	xhr.setRequestHeader('X-Amz-Acl', 'public-read');
	xhr.setRequestHeader('Host', AWSHost);
	xhr.setRequestHeader('Content-Type', "image/png");
	xhr.setRequestHeader('Date', currentDateTime);
	
 
	xhr.send(selectedImage);
}

var popoverView, arrowDirection, imageView, selectedImage;
imageView = $.mainImageView;

function openCamera() {
	Titanium.Media.showCamera({
	success:function(event)
	{
		Ti.API.info("success! event: " + JSON.stringify(event));
		var image = event.media;
		imageView.image = image;
		selectedImage = image;
	},
	cancel:function()
	{

	},
	error:function(error)
	{
	},
	allowEditing:false
});
}

function openGallery() {
	Titanium.Media.openPhotoGallery({
	
		success:function(event)
		{
			var cropRect = event.cropRect;
			var image = event.media;
	
			// set image view
			Ti.API.debug('Our type was: '+event.mediaType);
			if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
			{
				imageView.image = image;
				selectedImage = image;
			}
			else
			{
				// is this necessary?
			}
	
			// Titanium.API.info('PHOTO GALLERY SUCCESS cropRect.x ' + cropRect.x + ' cropRect.y ' + cropRect.y  + ' cropRect.height ' + cropRect.height + ' cropRect.width ' + cropRect.width);
	
		},
		cancel:function()
		{
	
		},
		error:function(error)
		{
		},
		allowEditing:false,
		popoverView:popoverView,
		arrowDirection:arrowDirection,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO]
	});
}

function onWriteReviewClicked(event) {
	
}
