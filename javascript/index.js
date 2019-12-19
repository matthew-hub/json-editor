var json_editor = (function(root, editor) {
  'use strict';
  console.log('[Window]', root);
  var doc = document; // used for shorthand

  var defaultTheme = {
    workbench_color: {
      background: '#282c35'
    }
  };

  var CreateEditor = function(id, settings) {
    this.id = id;
    this.container = this.getEditorId(id);
    this.settings = settings;
    this.renderer = new Renderer(this.container, this.settings);
    this.text_area_value = '';
    this.setEditorSettings(settings);
    this.setThemeSettings();
    this.setEventListener();
  };

  CreateEditor.prototype = editor.fn = {
    getEditorId: function(id) {
      return doc.getElementById(id);
    },

    setEditorSettings: function(settings) {
      console.log('[Settingss]', settings);
      this.container.style.width = settings.width || '400px';
      this.container.style.height = settings.height || '400px';
      this.container.style.color = '#fff';
      this.container.style.overflow = 'hidden'; /* * */
      this.container.style.fontSize = settings.fontSize;
      // feature, check if theme is passed
      this.theme = settings.theme || defaultTheme;
      this.container.style.background = this.theme.workbench_color.background;
    },

    setThemeSettings: function() {
      console.log(this.renderer);
    },

    setEventListener: function() {
      this.renderer.fields.text_area.addEventListener(
        'input',
        function(e) {
          // console.log(this.renderer.fields.text_area.value)
          // console.log(window.event.keyCode)
          // console.log(this.value)

          this.setTextAreaValue();
          // this.setNewLineOfCode();
          this.displayTextAreaValue();
          // this.renderer.fields.text_area.value = '';
        }.bind(this)
      );
      this.container.addEventListener('keydown', function(e) {
        var keyCode = e.keyCode || e.witch;
        if (keyCode === 13) {
          console.log('[ENTER]');
        }
        // console.log(e)
        // e.preventDefault();
        //   console.log('[Value]', this.innerHTML);
      });
    },

    setTextAreaValue: function(e) {
      console.log(this.renderer.fields.text_area.value);
      this.text_area_value = this.renderer.fields.text_area.value;
    },

    checkTextAreaValue: function() {},

    displayTextAreaValue: function() {
      if (this.text_area_value.length > 0) {
        this.renderer.fields.editor_content_code[0].textContent = this.text_area_value;
        console.log('[editor content]', this.renderer.fields.editor_content_code[0].textContent);
      }
    },

    setNewLineOfCode: function() {
      console.log(this.text_area_value.length);
      if (this.text_area_value.length > 0) {
        this.renderer.createEditorContentLineCode();
      }
    },

    length: 0,
    name: 'editor methods'
  };

  var Renderer = function(container, settings) {
    this.container = container;
    this.settings = settings;
    this.fields = this.createEditorFields();
    this.createEditorContentLineCode();
  };

  Renderer.prototype = {
    createEditorFields: function() {
      var text_area = this.createTaxtArea();
      var editor_content = this.createEditorContent();
      // var editor_content_code = this.createEditorContentLineCode();
      // this.container.appendChild(editor_content);

      return {
        text_area,
        editor_content,
        editor_content_code: editor_content.childNodes
      };
    },

    createTaxtArea: function() {
      var div = doc.createElement('div');
      div.className = 'editor_text_input';

      var text_area = doc.createElement('textarea');
      text_area.className = 'editor_textarea';
      text_area.name = 'editor-input';
      // div.innerHTML = '<textarea class="editor_textarea"> </textarea>'
      div.appendChild(text_area);
      // text_area.style.overflowWrap = 'normal';
      // text_area.style.boxSizing = 'inherit';
      text_area.style.position = 'absolute';
      text_area.style.zIndex = 0;
      text_area.style.background = 'transparent';
      // text_area.style.border = 'none';
      text_area.style.resize = 'none';
      // text_area.style.outline = 'none';
      // text_area.style.overflow = 'hidden';
      text_area.style.font = 'inherit';
      // text_area.style.padding = '0 1px';
      // text_area.style.margin = ' 0 -1px';
      // text_area.style.contain = 'strict';
      // text_area.style.userSelect = 'text';
      // text_area.style.whiteSpace = 'pre!important';
      // text_area.style.opacity = 0;
      text_area.style.color = '#ffffff';
      text_area.style.marginLeft = '50px';

      this.container.appendChild(div);
      return text_area;
    },

    createEditorContent: function() {
      var editor_content = doc.createElement('div');
      editor_content.className = 'editor_content';
      editor_content.style.width = '100%';
      editor_content.style.height = '100%';
      // var editor_content_code = doc.createElement('div');
      // editor_content_code.className = "editor_content_text";
      // editor_content_code.style.padding = '2px';
      // editor_content_code.style.height = this.settings.fontSize;
      // console.log(this.settings)
      // editor_content.appendChild(editor_content_code);
      this.container.appendChild(editor_content);
      return editor_content;
    },

    createEditorContentLineCode: function() {
      var editor_content_code = doc.createElement('div');
      editor_content_code.className = 'editor_content_text';
      editor_content_code.style.padding = '2px';
      editor_content_code.style.height = this.settings.fontSize;
      // editor_content_code.textContent = this.fields.text_area.value;
      this.fields.editor_content.appendChild(editor_content_code);
    },

    length: 0,
    name: 'renderer methods'
  };

  editor.new = function(id, settings) {
    return new CreateEditor(id, settings);
  };

  return editor;
})(this, json_editor || {});
