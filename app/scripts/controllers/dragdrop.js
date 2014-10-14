
angular.module('familyphotos.dragdrop', ['angularFileUpload']);

var DragDropCtrl = [ '$scope', '$upload', function($scope, $upload) {
  // $scope.onFileSelect = function($files) {
  //   //$files: an array of files selected, each file has name, size, and type.
  //   for (var i = 0; i < $files.length; i++) {
  //     var file = $files[i];
  //     $scope.upload = $upload.upload({
  //       url: 'server/upload/url', //upload.php script, node.js route, or servlet url
  //       //method: 'POST' or 'PUT',
  //       //headers: {'header-key': 'header-value'},
  //       //withCredentials: true,
  //       data: {myObj: $scope.myModelObj},
  //       file: file, // or list of files ($files) for html5 only
  //       //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
  //       // customize file formData name ('Content-Disposition'), server side file variable name. 
  //       //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
  //       // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
  //       //formDataAppender: function(formData, key, val){}
  //     }).progress(function(evt) {
  //       console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
  //     }).success(function(data, status, headers, config) {
  //       // file is uploaded successfully
  //       console.log(data);
  //     });
  //     //.error(...)
  //     //.then(success, error, progress); 
  //     // access or attach event listeners to the underlying XMLHttpRequest.
  //     //.xhr(function(xhr){xhr.upload.addEventListener(...)})
  //   }
  //   /* alternative way of uploading, send the file binary with the file's content-type.
  //      Could be used to upload files to CouchDB, imgur, etc... html5 FileReader is needed. 
  //      It could also be used to monitor the progress of a normal http post/put request with large data*/
  //   // $scope.upload = $upload.http({...})  see 88#issuecomment-31366487 for sample code.
  // };
  var grantedBytes = grantedBytes;

  window.navigator.webkitPersistentStorage.requestQuota( 20*1024*1024, function(grantedBytes) {
    console.log("I was granted "+grantedBytes+" bytes.");
    window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, onInitFs, errorHandler);
  }, errorHandler);

var fileSystem = null;
var onInitFs = function (fs) { 
  fileSystem = fs; 
  console.log('Filesystem is:', fileSystem);
};

$scope.onFileSelect = function($files) {
  console.log('FILES', $files);
    var resourceDIRLOC = "photos";
    fileSystem.root.getDirectory(fileSystem.root.fullPath + '/' + resourceDIRLOC, {create:true}, function(dir) {
      resourceDIR = dir;
      window.webkitRequestFileSystem(window.PERSISTENT, grantedBytes, function(fs) {
      // Duplicate each file the user selected to the app's fs.
      for (var i = 0, file; file = $files[i]; ++i) {
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
}];
// // credit to: http://buildinternet.com/2013/08/drag-and-drop-file-upload-with-angularjs/

// (function() {
//   'use strict';
//   angular.module('familyphotos.dragdrop', [])

//   .controller('DragDropCtrl', function($scope) {
//         $scope.image = null
//         $scope.imageFileName = ''
//     })

//   .directive('fileDropzone', function() {
//     return {
//       restrict: 'A',
//       scope: {
//         file: '=',
//         fileName: '='
//       },
//       link: function(scope, element, attrs) {
//         var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
//         processDragOverOrEnter = function(event) {
//           if (event != null) {
//             event.preventDefault();
//           }
//           event.dataTransfer.effectAllowed = 'copy';
//           return false;
//         };
//         validMimeTypes = attrs.fileDropzone;
//         checkSize = function(size) {
//           var _ref;
//           if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
//             return true;
//           } else {
//             alert("File must be smaller than " + attrs.maxFileSize + " MB");
//             return false;
//           }
//         };
//         isTypeValid = function(type) {
//           if ((validMimeTypes === (void 0) || validMimeTypes === '') || validMimeTypes.indexOf(type) > -1) {
//             return true;
//           } else {
//             alert("Invalid file type.  File must be one of following types " + validMimeTypes);
//             return false;
//           }
//         };
//         element.bind('dragover', processDragOverOrEnter);
//         element.bind('dragenter', processDragOverOrEnter);
//         return element.bind('drop', function(event) {
//           var file, name, reader, size, type;
//           if (event != null) {
//             event.preventDefault();
//           }
//           reader = new FileReader();
//           reader.onload = function(evt) {
//             if (checkSize(size) && isTypeValid(type)) {
//               return scope.$apply(function() {
//                 scope.file = evt.target.result;
//                 if (angular.isString(scope.fileName)) {
//                   return scope.fileName = name;
//                 }
//               });
//             }
//           };
//           file = event.dataTransfer.files[0];
//           name = file.name;
//           type = file.type;
//           size = file.size;
//           reader.readAsDataURL(file);
//           return false;
//         });
//       }
//     };
//   });

// }).call(this);

// // (function() {
// //   'use strict';  
// //     angular.module('familyphotos.dragdrop')

// // }).call(this);


// credit to: https://github.com/danialfarid/angular-file-upload
