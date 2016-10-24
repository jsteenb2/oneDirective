app.factory('tinyMCEService',
['_', '$timeout',
function( _, $timeout) {

  var stub = {};

  var _previousNode;
  var _previousId;

  stub.getPreviousNode = function() {
    return _previousNode;
  };

  stub.setPreviousNode = function(node) {
    _previousNode = node;
  };

  stub.clearEditors = function () {
    tinymce.remove('#wow');
  };

  stub.callMCE = function(event) {
    stub.clearEditors();

    angular.element(event.target).attr('id', 'wow');
    var nested_targ;
    // var id;
    // handle edge cases to select textable
    // if(_previousId) {
    //   nested_targ = event.target;
    //   while (!nested_targ.class && (nested_targ.class !== "textable" )) {
    //     if (nested_targ.id) {
    //       id = nested_targ.id;
    //       break;
    //     }
    //     nested_targ = angular.element(nested_targ).parent()[0];
    //   }
    // } else {
    //   id = event.target.id;
    //   _previousId = id;
    // }
    // change the element targetted on the dom
    // var change = nested_targ || event.target;

    change = angular.element(event.target).clone();
    stub.setPreviousNode(change);

    // utilizes different set of tinyMCEs depending on type of node/Domelement
    stub.whichMCE(change.get(0).tagName, event);
    // t
  };

  stub.whichMCE = function(tagType) {
    switch(tagType) {
      // case 'A':
      //   stub.miniMCE(id);
      //   break;
      // case 'IMG':
      //   stub.imageMCE(id);
      //   break;
    default:
        stub.miniMCE(tagType, event);
        break;
    }
  };

  stub.miniMCE = function(tagType, event) {

    tinymce.init({
      selector: ('#wow'),
      
      theme: "inlite",
      inline: true,
      paste_data_images: true,
      plugins: 'image link paste contextmenu textpattern autolink',
      insert_toolbar: 'quickimage',
      selection_toolbar: 'bold italic | quicklink',
    });
  };

  stub.imageMCE = function(id) {
    tinymce.init({
      selector: ('#' + id),
      forced_root_block: false,
      plugins: "image",
      menubar: false,
      toolbar: "image",
      image_list: [
        {title: 'My image 1', value: 'http://www.tinymce.com/my1.gif'},
        {title: 'My image 2', value: 'http://www.moxiecode.com/my2.gif'}
      ],
  image_advtab: true
    });
  };


  stub.defaultMCE = function(id) {
    tinymce.init({
      selector: ('#' + id),
      forced_root_block: false,
      themes: "modern",
      plugins: 'link image code wordcount textcolor',
      toolbar: 'myimage | close | bold italic | alignleft aligncenter alignright | forecolor backcolor | code',
      textcolor_cols: "5",
      menubar: false,
      autoresize_on_init: true,
      setup: function (editor) {
        editor.addButton('close', {
          text: 'Exit',
          icon: false,
          onclick: function() {
            editor.destroy();
          }
        });
        editor.addButton('myimage', {
          text: 'Image',
          icon: false,
          onclick: function() {
            editor.insertContent('<img style="height: 50px" src="https://cdn0.iconfinder.com/data/icons/iconshock_guys/512/andrew.png"></img>');
          }
        });
      }
    });
  };

  return stub;
}]);
