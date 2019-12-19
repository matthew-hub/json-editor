var json_renderer = (function(root, renderer) {
  'use strict';
  console.log('[Window]', root);
  var doc = document; // used for shorthand

  var defaultTheme = {
    'workbench.color': {
      background: '#282c35'
    }
  };

  var CreateEditor = function(id, settings) {
    this.id = id;
    this.container = this.getEditorId(id);
    this.renderer = {
      textArea: this.createTaxtArea()
    }
 
    this.setEditorDefault();
    this.setEditorSettings(settings);
  };

  CreateEditor.prototype = renderer.fn = {
   
  };

  renderer.new = function(id, settings) {
    return new CreateEditor(id, settings);
  };

  return renderer;
})(this, json_renderer || {});
