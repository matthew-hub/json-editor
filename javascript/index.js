var json_editor = (function(root, editor) {
  'use strict';
  console.log('[Window]', root);
  var doc = document; // used for shorthand

  var defaultTheme = {
    workbench_color: {
      background: '#282c35'
    }
  };

  // EDITOR
  var CreateEditor = function(id, settings) {
    this.id = id;
    this.container = this.getEditorId(id);
    this.settings = settings;
    this.renderer = editor.renderer(this.container, this.settings);

    this.text_area_value = '';
    this.numberOfLines = 0;
  
    this.setEditorSettings(settings);
    this.setThemeSettings();
    this.setElementStyles();
    this.setScrollbarsThumb();
    // this.setEventListener();
    this.setEventsListener();
    console.log(this);
  };

  CreateEditor.prototype = editor.fn = {
    // GET ELEMENT FROM PASSING ID
    getEditorId: function(id) {
      return doc.getElementById(id);
    },

    // SET SETTINGS
    setEditorSettings: function(settings) {
      console.log('[Settingss]', settings);
      this.container.style.width = settings.width || '400px';
      this.container.style.height = settings.height || '400px';
      this.container.style.color = '#fff';
      this.container.style.position = 'relative';
      this.container.style.display = 'block';
      this.container.style.boxSizing = 'border-box';
      // this.container.style.display = 'grid';
      // this.container.style.gridTemplateColumns = '1fr 1fr 1fr';
      // this.container.style.overflow = 'hidden'; /* * */
      this.container.style.fontSize = settings.fontSize || '15px';
      this.container.style.fontFamily = 'Consolas, Courier New, monospace';
      // feature, check if theme is passed
      this.theme = settings.theme || defaultTheme;
      this.container.style.background = this.theme.workbench_color.background;
    },

    // UPDATE IN THE FEATURE
    setThemeSettings: function() {
      console.log(this.renderer);
    },

    // SET EVENTS LISTENER "EDITOR"
    setEventListener: function() {
     

    },

    setTextAreaValue: function(e) {
      console.log(this.renderer.elements.text_area.value);
      this.text_area_value += this.renderer.elements.text_area.value;
    },

    checkTextAreaValue: function() {},

    displayTextAreaValue: function() {
      var regex = '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)';
      // if (this.text_area_value.length > 0) {
      console.log(this.renderer.elements.editor_code_rows);
      this.renderer.elements.editor_code_rows[this.renderer.activeLine].textContent += this.text_area_value;
      // console.log('[editor content]', this.renderer.elements.editor_code_rows[0].textContent);
      // }
    },

    // REMOVE ONE CHAR FROM LINE OF CODE
    removeCharFromLineOfCode: function() {
      var str = this.renderer.elements.editor_code_rows[this.renderer.activeLine].textContent.slice(0, -1);
      // var newstr = str.slice(0, -1);
      // console.log(newstr)
      this.renderer.elements.editor_code_rows[this.renderer.activeLine].textContent = str;
    },

    // 'SET' NEW LINE OF CODE
    // USED 'RENDERER' METHOD TO CREATE NEW LINE
    setNewLineOfCode: function() {
      // this.renderer.createEditorContentLineCode();
      this.renderer.createNewLineCode();
      console.log('[ACTIVE LINE]', this.renderer.activeLine);
      // this.renderer.setLineActiveChangeColor(this.renderer.list_code_lines[this.renderer.activeLine += 1]);
      // this.renderer.activeLine += 1;
      // console.log(this.renderer.activeLine)
      this.setActiveLine();
      this.moveTextAreaToLine();
      // console.log(this.text_area_value.length);
      // if (this.text_area_value.length > 0) {
      //   this.renderer.createEditorContentLineCode();
      // }
    },

    moveContentWithScrollbars: function(){

    },

    setActiveLine: function() {
      this.renderer.activeLine;
    },

    moveTextAreaToLine: function() {
      console.log('[TOP AREA]', parseInt(this.renderer.elements.text_area.style.top, 10));

      // this.renderer.elements.text_area.style.top = parseInt(this.renderer.elements.text_area.style.top, 10) + 20 + 'px';
      // console.log('[textarea]', this.renderer.elements.text_area);
    },

    // SET SCROLLBARS THUMBS CURRENT WIDTH, HEIGHT, EVENTS
    setScrollbarsThumb: function() {
      var editor_scrollbar_thumb = [
        this.renderer.elements.editor_scrollbar_y.children[0],
        this.renderer.elements.editor_scrollbar_x.children[0]
      ];
      console.log('[thumbs]', editor_scrollbar_thumb);
      // for y scrollbar
      // get editor scroll view height
      // get editor code lines height
      // set thumb height
      // move editor code lines with scrollbar thumb

      var editor_scroll_view_height = this.renderer.elements.editor_scroll_view.offsetHeight;
      console.log('[editor scroll view height]:', editor_scroll_view_height, 'px');
      console.log('[editor content width]:', this.renderer.editor_content.offsetWidth, 'px');

      var editor_code_lines_c_height = this.renderer.elements.editor_code_lines_c.offsetHeight;
      console.log('[editor code lines height]:', editor_code_lines_c_height, 'px');
      var editor_code_lines_c_margin_top = this.renderer.elements.editor_code_lines_c.style.marginTop;
      console.log('[Margin top]', editor_code_lines_c_margin_top);

      editor_scrollbar_thumb[0].style.height =
        Math.floor((editor_scroll_view_height / editor_code_lines_c_height) * editor_scroll_view_height) + 'px';
      // var c = 0 / b;
      // console.log('c', c)

      console.log('[scroll result]', editor_scrollbar_thumb[0].style.height);

      window.onresize = function() {
        console.log('[window resize]');
        console.log('[editor code lines height]:', this.renderer.elements.editor_code_lines_c.offsetHeight, 'px');
      }.bind(this);
    },

    length: 0,
    name: 'editor methods'
  };

  editor.new = function(id, settings) {
    window.addEventListener('DOMContentLoaded', function() {
      return new CreateEditor(id, settings);
    });
  };

  return editor;
})(this, json_editor || {});
