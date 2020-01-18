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
    this.setEventListener();
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
      this.container.style.fontSize = settings.fontSize;
      // feature, check if theme is passed
      this.theme = settings.theme || defaultTheme;
      this.container.style.background = this.theme.workbench_color.background;
    
    },

    // UPDATE IN THE FEATURE
    setThemeSettings: function() {
      console.log(this.renderer);
    },

    // SET EVENTS "EDITOR"
    setEventListener: function() {
      // 'FUCUSING EDITOR'
      this.container.addEventListener('click', function() {
        console.log(this.renderer.list_code_lines)
        // console.log('focus',)
      //  console.log( this.renderer.list_code_lines[this.renderer.list_code_lines.length-1]);
       this.renderer.list_code_lines[this.renderer.list_code_lines.length-1].style.backgroundColor = '#212121';
       this.renderer.focusTextArea();
      }.bind(this), false);

      // INPUT IN TEXAREA 
      this.renderer.fields.text_area.addEventListener('input', function(e) {
          // console.log(this.renderer.fields.text_area.value)
          // console.log(window.event.keyCode)
          // console.log(this.value)
        console.log('input')
        this.setTextAreaValue();
          // this.setNewLineOfCode();
        this.displayTextAreaValue();
        this.text_area_value = '';
          this.renderer.fields.text_area.value = '';
        }.bind(this), false);

      // HANDLE ALL KEYDOWN IN EDITOR
      this.container.addEventListener('keydown', function(e) {
        console.log(e.keyCode)
        var keyCode = e.keyCode || e.witch;
        if (keyCode === 13) {
          e.preventDefault(); 
          console.log('[ENTER]');
          this.setNewLineOfCode();
        }

        if (keyCode == 9) { 
          e.preventDefault(); 
          console.log('[Tab]', );
           
        } 

        if(keyCode === 8){
          e.preventDefault();
          console.log('[Backspace]');
          this.removeCharFromLineOfCode();

        }

        if(e.ctrlKey){
          if(keyCode === 65){
            console.log('[SELECT ALL]', );
            
          }
        }
        // console.log(e)
        // e.preventDefault();
        //   console.log('[Value]', this.innerHTML);
      }.bind(this), false);
      
    },

    setTextAreaValue: function(e) {
      console.log(this.renderer.fields.text_area.value);
      this.text_area_value += this.renderer.fields.text_area.value;
    },

    checkTextAreaValue: function() {},

    displayTextAreaValue: function() {
      var regex = '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]\\s*(?=:)';
      // if (this.text_area_value.length > 0) {
        console.log( this.renderer.fields.editor_code_rows)
        this.renderer.fields.editor_code_rows[this.renderer.activeLine].textContent += this.text_area_value;
        // console.log('[editor content]', this.renderer.fields.editor_code_rows[0].textContent);
      // }
    },

    // REMOVE ONE CHAR FROM LINE OF CODE
    removeCharFromLineOfCode: function() {
      var str = this.renderer.fields.editor_code_rows[this.renderer.activeLine].textContent.slice(0, -1);
      // var newstr = str.slice(0, -1);
      // console.log(newstr)
      this.renderer.fields.editor_code_rows[this.renderer.activeLine].textContent = str;
    },

    // 'SET' NEW LINE OF CODE
    // USED 'RENDERER' METHOD TO CREATE NEW LINE
    setNewLineOfCode: function() {
      // this.renderer.createEditorContentLineCode();
      this.renderer.createNewLineCode();
      console.log('[ACTIVE LINE]',this.renderer.activeLine)
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

    setActiveLine: function(){

      this.renderer.activeLine 

    },

    moveTextAreaToLine: function(){
      console.log('[TOP AREA]', parseInt(this.renderer.fields.text_area.style.top, 10));
      
      // this.renderer.fields.text_area.style.top = parseInt(this.renderer.fields.text_area.style.top, 10) + 20 + 'px';
      // console.log('[textarea]', this.renderer.fields.text_area);
      
    },

    length: 0,
    name: 'editor methods'
  };


  editor.new = function(id, settings) {
    window.addEventListener('DOMContentLoaded', function(){
      
      return new CreateEditor(id, settings);
    })
  };

  return editor;

})(this, json_editor || {});
