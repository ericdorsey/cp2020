window.onload = function() {
    "use strict";
    var feedback = document.getElementById("feedback");
    var comments = document.getElementById("comments");
    feedback.onchange = feedbackChange;
    feedbackChange();
};

function feedbackChange() {
    "use strict";
    console.log("feedbackChange() fired");
    var selection = document.getElementById("selection");
    var feedback = document.getElementById("feedback");
    console.log(feedback.options[feedback.selectedIndex]);
    //var selected = feedback.options[feedback.selectedIndex];
    //console.log(feedback.options[feedback.selectedIndex].text);
    selection.value = feedback.options[feedback.selectedIndex].text;
    console.log(selection.value);
}