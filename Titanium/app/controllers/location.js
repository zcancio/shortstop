// $.mainlabel.text = annid;
// Ti.API.info($.annid);

args=arguments[0] || {};
console.log(Ti.API.info(args));
// $.mainlabel.text =args.myprop;
function onDidItClicked(event) {
	var xpng=require('xpng');
	xpng.openWin(Alloy.CFG.nav,'didIt',{myprop: "value"});
};

function onLaterClicked(event) {
	
};
