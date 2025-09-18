// Save as AB_TodaysDate.jsx
function insertTodaysDate() {
    var doc = app.activeDocument;
    var today = new Date();

    // Month names
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Format: September 18, 2025
    var dateStr = months[today.getMonth()] + " " + today.getDate() + ", " + today.getFullYear();

    // Check if a text frame is selected
    if (app.selection.length > 0 && app.selection[0].typename === "TextFrame") {
        app.selection[0].contents = dateStr;
    } else {
        // If no text frame is selected, create a new one in the center
        var textFrame = doc.textFrames.add();
        textFrame.contents = dateStr;

        var artboard = doc.artboards[doc.artboards.getActiveArtboardIndex()];
        var rect = artboard.artboardRect; // [left, top, right, bottom]
        textFrame.position = [(rect[0] + rect[2]) / 2, (rect[1] + rect[3]) / 2];
    }
}
insertTodaysDate();
