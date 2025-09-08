// Remove blank lines from selected text in Illustrator
if (app.documents.length > 0 && app.selection.length > 0) {
    var sel = app.selection[0];
    if (sel.typename === "TextFrame") {
        var txt = sel.contents;

        // Replace multiple line breaks with a single line break
        txt = txt.replace(/(\r|\n){2,}/g, "\r");

        // Trim leading/trailing blank lines
        txt = txt.replace(/^(\r|\n)+|(\r|\n)+$/g, "");

        sel.contents = txt;
        alert("Blank lines removed!");
    } else {
        alert("Please select a text frame.");
    }
} else {
    alert("No text selected.");
}
