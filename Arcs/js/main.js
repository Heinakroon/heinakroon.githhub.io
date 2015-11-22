// config page js
function getConfigData() {
	var colorTheme = document.getElementById("item-radio");
	//var highContrastCheckbox = document.getElementById("high_contrast_checkbox");

	var options = {
		//"watch_face_checkbox": backgroundColorPicker.value,
		"color_theme": colorTheme.checked
	};

	// Save for next launch
	//localStorage["background_color"] = options["background_color"];
	localStorage["color_theme"] = options["color_theme"];

	console.log("Got options: " + JSON.stringify(options));
	return options;
}

function getQueryParam(variable, defaultValue) {
	var query = location.search.substring(1);
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] === variable) {
			return decodeURIComponent(pair[1]);
		}
	}
	return defaultValue || false;
}

var submitButton = document.getElementById("submit_button");
submitButton.addEventListener("click", function() {
	console.log("Submit");

	// Set the return URL depending on the runtime environment
	var return_to = getQueryParam("return_to", "pebblejs://close#");
	document.location = return_to + encodeURIComponent(JSON.stringify(getConfigData()));
});

(function() {
	//var backgroundColorPicker = document.getElementById("background_color_picker");
	var colorTheme = document.getElementById("item-radio");

	// Load any previously saved configuration, if available
	if(localStorage["color_theme"]) {
		colorTheme.checked = JSON.parse(localStorage["color_theme"]);
		//backgroundColorPicker.value = localStorage["background_color"];
	}
})();