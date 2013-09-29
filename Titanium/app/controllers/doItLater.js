var tableView = $.tableView;

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
	return [item1, item2, item3];
}

function initializeViews() {
	var listItems = getMockData();
	var tableData = [];
	for (var item in listItems) {
		var row = Ti.UI.createTableViewRow();
		var nameLabel = Ti.UI.createLabel({
			left: "10dp",
			text: item.name
		});
		// var locationLabel = Ti.UI.createLabel({
			// left: "10dp",
			// top: "30dp",
			// text: item.location
		// });
		// var imageView = Ti.UI.createImageView({
			// url: item.imageUrl
		// });
		// row.add(nameLabel);
		// row.add(locationLabel);
		// row.add(imageView);
		
		tableData.push(row);
	}
	tableView.setData(tableData);
};

initializeViews();
