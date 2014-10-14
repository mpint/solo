var grantedBytes = grantedBytes;

window.navigator.webkitPersistentStorage.requestQuota( 20*1024*1024, function(grantedBytes) {
    console.log("I was granted "+grantedBytes+" bytes.");
    window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, errorHandler);
}, errorHandler);

// var resourceURL = "resources.zip"; 
// var fetchResource = function () {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType="arraybuffer";
//     xhr.open("GET", resourceURL,true);
//     xhr.onload = function(e) {
//         if(this.status == 200) {
//           alert('Success!');
//         }
//     }
//     xhr.send();
// };

var resourceDIRLOC = "photos";

var onInitFs = function (fs) { 
  // creates a file log.txt if it doesnt exist, fetches it if it does
  // var fileSystem = fs;
  
  // fileSystem.root.getDirectory(fs.root.fullPath + '/' + resourceDIRLOC, {create:true}, function(dir) {
  //   resourceDIR = dir;

  //   if(localStorage["resourceLastModified"]) {
  //       var xhr = new XMLHttpRequest();
  //       xhr.open("HEAD", resourceURL );
  //       xhr.onload = function(e) {
  //           if(this.status == 200) {
  //               if(this.getResponseHeader("Last-Modified") != localStorage["resourceLastModified"]) {
  //                   fetchResource();
  //               } else {
  //                   console.log("Not fetching the zip, my copy is kosher.");
  //               }
  //           }
  //       }
  //       xhr.send();
  //   } else {
  //       fetchResource();
  //   }

  // fs.root.getFile('log.txt', {create: false}, function(fileEntry) {
  //   // Create a FileWriter object for our FileEntry (log.txt).
  //   fileEntry.createWriter(function(fileWriter) {
  //     fileWriter.seek(fileWriter.length); // Start write position at EOF.
  //     // Create a new Blob and write it to log.txt.
  //     var blob = new Blob(['Hello World'], {type: 'text/plain'});
  //     fileWriter.write(blob);
  //   }, errorHandler);
  // }, errorHandler);

};

  document.querySelector('#drop-zone').onchange = function(e) {
    var files = this.files;
    var resourceDIRLOC = "photos";
    fileSystem.root.getDirectory(fs.root.fullPath + '/' + resourceDIRLOC, {create:true}, function(dir) {
      resourceDIR = dir;
      window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function(fs) {
      // Duplicate each file the user selected to the app's fs.
      for (var i = 0, file; file = files[i]; ++i) {
        // Capture current iteration's file in local scope for the getFile() callback.
        (function(f) {
          fs.root.getFile(f.name, {create: true, exclusive: true}, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
              fileWriter.write(f); // Note: write() can take a File or Blob object.
            }, errorHandler);
          }, errorHandler);
        })(file);
      }
    }, errorHandler);
  });
};

function errorHandler(e) {
  var msg = '';
  console.dir(e);
  switch (e.code) {
    case FileError.QUOTA_EXCEEDED_ERR:
      msg = 'QUOTA_EXCEEDED_ERR';
      break;
    case FileError.NOT_FOUND_ERR:
      msg = 'NOT_FOUND_ERR';
      break;
    case FileError.SECURITY_ERR:
      msg = 'SECURITY_ERR';
      break;
    case FileError.INVALID_MODIFICATION_ERR:
      msg = 'INVALID_MODIFICATION_ERR';
      break;
    case FileError.INVALID_STATE_ERR:
      msg = 'INVALID_STATE_ERR';
      break;
    default:
      msg = 'Unknown Error';
      break;
  };

  console.log('Error: ' + msg);
}

// Requests access to FileSystem
// window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
// window.requestFileSystem(type, size, successCallback, opt_errorCallback);

// ref: http://www.html5rocks.com/en/tutorials/file/filesystem/

// window.webkitStorageInfo.requestQuota(PERSISTENT, 1024*1024, function(grantedBytes) {
//   window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
// }, function(e) {
//   console.log('Error', e);
// });

// // When filesystem is successfully created, onInitFs is passed a filesystem (fs) object


// }

// IMPORTANT -- SAVING
//watches element for upload and then saves the files
// document.querySelector('#myfile').onchange = function(e) {
//   var files = this.files;

//   window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
//     // Duplicate each file the user selected to the app's fs.
//     for (var i = 0, file; file = files[i]; ++i) {

//       // Capture current iteration's file in local scope for the getFile() callback.
//       (function(f) {
//         fs.root.getFile(f.name, {create: true, exclusive: true}, function(fileEntry) {
//           fileEntry.createWriter(function(fileWriter) {
//             fileWriter.write(f); // Note: write() can take a File or Blob object.
//           }, errorHandler);
//         }, errorHandler);
//       })(file);

//     }
//   }, errorHandler);

// };
// IMPORTANT -- REMOVAL
// // removes a file
// window.requestFileSystem(window.TEMPORARY, 1024*1024, function(fs) {
//   fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

//     fileEntry.remove(function() {
//       console.log('File removed.');
//     }, errorHandler);

//   }, errorHandler);
// }, errorHandler);

//IMPORTANT -- OBTAINING FILESYSTEM URL
// var img = document.createElement('img');
// img.src = fileEntry.toURL(); // filesystem:http://example.com/temporary/myfile.png
// document.body.appendChild(img);

// window.resolveLocalFileSystemURL = window.resolveLocalFileSystemURL ||
//                                    window.webkitResolveLocalFileSystemURL;

// var url = 'filesystem:http://example.com/temporary/myfile.png';
// window.resolveLocalFileSystemURL(url, function(fileEntry) {
//   ...
// });