var json_editor = (function(root, editor) {
  'use strict';
  console.log('[Window]', root);

  var CreateEditor = function(id) {
    this.id = id;
  };

  CreateEditor.prototype = editor.fn = {
    
  }

  editor.new = function(id) {
    return new CreateEditor(id);
  };



  return editor;
})(this, json_editor || {});
