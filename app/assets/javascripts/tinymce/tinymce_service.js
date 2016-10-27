app.factory('tinyMCEService',
['_', '$timeout',
function( _, $timeout) {

  var stub = {};

  var _previousNode;
  var _previousId;

  stub.info = {
    showing: false
  };

  stub.getPreviousNode = function() {
    return _previousNode;
  };

  stub.setPreviousNode = function(node) {
    _previousNode = node;
  };

  stub.clearEditors = function () {
    console.log('cleared editors');
    stub.info.showing = false;
    tinymce.remove('#tinymce');
    angular.element('#tinymce').removeAttr('id');
  };

  stub.callMCE = function(event) {
    var i = 0;
    angular.element(event).attr('id', 'tinymce');

    var nested_targ = event;
    while (!nested_targ.hasClass("textable")) {
      if (i >= 10){ console.log(i); break;} //debuggerline

      nested_targ = angular.element(nested_targ).parent();
      i++;
    }

    var change = nested_targ || event;

    change = angular.element(change).clone();
    stub.setPreviousNode(change);

    // utilizes different set of tinyMCEs depending on type of node/Domelement
    stub.whichMCE(change.get(0).tagName, event);
  };

  stub.whichMCE = function(tagType) {
    stub.info.showing = true;
    switch(tagType) {
    default:
        stub.defaultMCE(tagType);
        break;
    }
  };

  stub.miniMCE = function(tagType) {
    tinymce.init({
      selector: ('#tinymce'),
      theme: "inlite",
      inline: true,
      paste_data_images: true,
      plugins: 'image link paste contextmenu textpattern autolink',
      insert_toolbar: 'quickimage',
      selection_toolbar: 'bold italic | quicklink',
    });
  };

  tinyMCE.PluginManager.add('stylebuttons', function(editor, url) {
    ['pre', 'p', 'code', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(function(name){
     editor.addButton("style-" + name, {
         tooltip: "Toggle " + name,
           text: name.toUpperCase(),
           onClick: function() { editor.execCommand('mceToggleFormat', false, name); },
           onPostRender: function() {
               var self = this, setup = function() {
                   editor.formatter.formatChanged(name, function(state) {
                       self.active(state);
                   });
               };
               editor.formatter ? setup() : editor.on('init', setup);
           }
       });
    });
  });

  stub.defaultMCE = function(tagType) {
    tinymce.init({
      selector: ('#tinymce'),
      forced_root_block: false,
      themes: "modern",

      //TODO: Ask adrian about this comment below vvvvvvvvvvv
      //please ignore this for now i will put in configuration rather than defaultMCE()
      style_formats: [
            {title: 'Headers', items: [
                {title: 'h1', block: 'h1'},
                {title: 'h2', block: 'h2'},
                {title: 'h3', block: 'h3'},
                {title: 'h4', block: 'h4'},
                {title: 'h5', block: 'h5'},
                {title: 'h6', block: 'h6'}
            ]},

            {title: 'Inline', items: [
                {title: 'Bold', inline: 'b', icon: 'bold'},
                {title: 'Italic', inline: 'i', icon: 'italic'},
                {title: 'Underline', inline: 'span', styles : {textDecoration : 'underline'}, icon: 'underline'},
                {title: 'Strikethrough', inline: 'span', styles : {textDecoration : 'line-through'}, icon: 'strikethrough'},
                {title: 'Superscript', inline: 'sup', icon: 'superscript'},
                {title: 'Subscript', inline: 'sub', icon: 'subscript'},
                {title: 'Code', inline: 'code', icon: 'code'},
            ]},

            {title: 'Blocks', items: [
                {title: 'Paragraph', block: 'p'},
                {title: 'Blockquote', block: 'blockquote'},
                {title: 'Div', block: 'div'},
                {title: 'Pre', block: 'pre'}
            ]},

            {title: 'Alignment', items: [
                {title: 'Left', block: 'div', styles : {textAlign : 'left'}, icon: 'alignleft'},
                {title: 'Center', block: 'div', styles : {textAlign : 'center'}, icon: 'aligncenter'},
                {title: 'Right', block: 'div', styles : {textAlign : 'right'}, icon: 'alignright'},
                {title: 'Justify', block: 'div', styles : {textAlign : 'justify'}, icon: 'alignjustify'}
            ]}
        ],
      theme_advanced_blockformats : "p,div,h1,h2,h3,h4,h5,h6,blockquote,dt,dd,code,samp",
      plugins: 'link image code wordcount textcolor stylebuttons',
      toolbar: 'myimage | close | bold italic | forecolor backcolor | code | undo redo | style-code | fontselect fontsizeselect',
      textcolor_cols: "5",
      inline: true,
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
          text: 'Silly',
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
