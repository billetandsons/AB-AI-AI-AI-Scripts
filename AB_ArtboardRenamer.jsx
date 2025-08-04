// Rename Artboards with File Name or Custom Master Name + A, B, C...

function main() {
    if (app.documents.length === 0) {
        alert("No document open.");
        return;
    }

    var doc = app.activeDocument;
    var fileName = doc.name.replace(/\.[^\.]+$/, ""); // Strip extension
    var artboardCount = doc.artboards.length;

    // Custom dialog
    var win = new Window("dialog", "Rename Artboards");
    win.orientation = "column";
    win.alignChildren = "left";

    var useFileName = win.add("checkbox", undefined, "Use file name as master name (" + fileName + ")");
    useFileName.value = true;

    var customNameGroup = win.add("group");
    customNameGroup.add("statictext", undefined, "Or enter Master Name:");
    var nameInput = customNameGroup.add("edittext", undefined, "");
    nameInput.characters = 25;

    var buttonGroup = win.add("group");
    buttonGroup.alignment = "right";
    var okBtn = buttonGroup.add("button", undefined, "OK");
    var cancelBtn = buttonGroup.add("button", undefined, "Cancel");

    okBtn.onClick = function () {
        win.close(1);
    };
    cancelBtn.onClick = function () {
        win.close(0);
    };

    var result = win.show();

    if (result !== 1) {
        alert("Operation cancelled.");
        return;
    }

    var masterName = useFileName.value ? fileName : nameInput.text;
    if (!masterName) {
        alert("Please provide a master name.");
        return;
    }

    // Convert index to A, B, ..., Z, AA, AB...
    function indexToLetters(index) {
        var letters = '';
        index++;
        while (index > 0) {
            var rem = (index - 1) % 26;
            letters = String.fromCharCode(65 + rem) + letters;
            index = Math.floor((index - 1) / 26);
        }
        return letters;
    }

    // Rename artboards
    for (var i = 0; i < artboardCount; i++) {
        var suffix = indexToLetters(i);
        doc.artboards[i].name = masterName + " " + suffix;
    }

    alert("Renamed " + artboardCount + " artboards.");
}

main();
