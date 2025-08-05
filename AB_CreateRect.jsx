if (app.documents.length > 0) {
    var doc = app.activeDocument;

    var layerName = prompt("Enter the name for the top layer:", "Overlay");

    if (layerName !== null && layerName !== "") {
        var topLayer;

        try {
            topLayer = doc.layers.getByName(layerName);
        } catch (e) {
            topLayer = doc.layers.add();
            topLayer.name = layerName;
        }

        // Move to top
        topLayer.zOrder(ZOrderMethod.SENDTOBACK);
        for (var i = 0; i < doc.layers.length - 1; i++) {
            doc.layers[doc.layers.length - 1].zOrder(ZOrderMethod.BRINGFORWARD);
        }

        // Lock all other layers
        for (var l = 0; l < doc.layers.length; l++) {
            if (doc.layers[l].name !== layerName) {
                doc.layers[l].locked = true;
            }
        }

        // Loop through all artboards and draw rectangle
        for (var i = 0; i < doc.artboards.length; i++) {
            var ab = doc.artboards[i];
            var rect = ab.artboardRect; // [left, top, right, bottom]
            var width = rect[2] - rect[0];
            var height = rect[1] - rect[3];

            var rectPath = doc.pathItems.rectangle(
                rect[1], // top
                rect[0], // left
                width,
                height
            );

            rectPath.stroked = false;
            rectPath.filled = true;
            rectPath.fillColor = getRandomColor();

            rectPath.move(topLayer, ElementPlacement.PLACEATBEGINNING);
        }

        alert("Rectangles created on top layer: " + layerName);
    } else {
        alert("Layer name was not provided.");
    }
} else {
    alert("No document open.");
}

function getRandomColor() {
    var color = new RGBColor();
    color.red = Math.random() * 255;
    color.green = Math.random() * 255;
    color.blue = Math.random() * 255;
    return color;
}
