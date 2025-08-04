var idoc = app.activeDocument;
var r = idoc.artboards[idoc.artboards.getActiveArtboardIndex()].artboardRect;
idoc.pathItems.rectangle(r[1], r[0], r[2]-r[0], r[1]-r[3]);
