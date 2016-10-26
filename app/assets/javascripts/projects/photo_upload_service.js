app.factory('PhotoUploadService',
['FileUploader', 'Restangular', 'base64',
function (FileUploader, Restangular, base64) {
  var srv = {};
  var _uploader = {};
  var _csrf_token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
  var _config = {
    url: undefined,
    method: 'PATCH',
    alias: 'project_photo',
    autoUpload: false,
    withCredentials: true,
    headers: {
      'X-CSRF-TOKEN': _csrf_token
    }
  };

  function _processed (item) {
    item.file = base64(item.file);
    return item;
  }

  function _logResponse(response) {
    console.log(response);
  }

  srv.setConfigUrl = function (url) {
    _config.url = url;
  };

  srv.getUploader = function () {
    return _uploader;
  };

  srv.init = function (url) {
    _config.url = url;
    _uploader = new FileUploader(_config);
    _uploader.onBeforeUploadItem(_processed);
    _uploader.onSuccessItem(_logResponse);
  };

  return srv;
}]);
