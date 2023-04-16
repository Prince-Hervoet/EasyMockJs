var proxy = function () {
    var realObject = new XMLHttpRequest();
    for (var content in realObject) {
        console.log(content + " " + typeof realObject[content]);
    }
};
proxy();
