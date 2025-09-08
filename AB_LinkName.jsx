function test()

{

    var myItem = app.activeDocument.selection[0]; // be sure that a linked item (and not an embedded) is selected

    var myItemBounds = myItem.visibleBounds;

    var myItemHeight = Math.abs(myItemBounds[3] - myItemBounds[1]);

    var aTF = app.activeDocument.textFrames.add();

    var fileName = myItem.file.name;

    var textContents = fileName.replace(/\%20/g, " "); //change %20 to spaces

    textContents = textContents.replace(/\.[^\.]*$/, ""); //remove extension

    aTF.position = [myItemBounds[0], myItemBounds[1] - myItemHeight];

    aTF.contents = textContents; //add the textContents to the textFrame.

}

test();
