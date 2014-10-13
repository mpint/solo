//test
console.log('panel.js loaded')

var myDropzone = new Dropzone(document.body, { // Make the whole body a dropzone
  url: "./save.js", // Set the url
  previewsContainer: "#previews", // Define the container to display the previews
  clickable: "#clickable" // Define the element that should be used as click trigger to select files.
});

myDropzone.on("addedfile", function(file) { console.log('addListener on')});

myDropzone.on("maxfilesexceeded", function(file) { this.removeFile(file); });