// config page js
function getConfigData() {
	var backgroundColorPicker = document.getElementById("background_color_picker");
	var highContrastCheckbox = document.getElementById("high_contrast_checkbox");

	var options = {
		"watch_face_checkbox": backgroundColorPicker.value,
		"date_display_checkbox": highContrastCheckbox.checked
	};

	// Save for next launch
	localStorage["background_color"] = options["background_color"];
	localStorage["high_contrast"] = options["high_contrast"];

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
	var backgroundColorPicker = document.getElementById("background_color_picker");
	var highContrastCheckbox = document.getElementById("high_contrast_checkbox");

	// Load any previously saved configuration, if available
	if(localStorage["high_contrast"]) {
		highContrastCheckbox.checked = JSON.parse(localStorage["high_contrast"]);
		backgroundColorPicker.value = localStorage["background_color"];
	}
})();