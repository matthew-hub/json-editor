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
    this.renderer = new Renderer(this.container, this.settings);
    this.text_area_value = '';
    this.numberOfLines = 0;
  
    this.setEditorSettings(settings);
    this.setThemeSettings();
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
        console.log(this.renderer.listOfCodeLines)
        console.log('focus',)
       console.log( this.renderer.listOfCodeLines[this.renderer.listOfCodeLines.length-1]);
       this.renderer.listOfCodeLines[this.renderer.listOfCodeLines.length-1].style.backgroundColor = '#343232';
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
        this.renderer.fields.editor_content_code[this.renderer.activeLine].textContent += this.text_area_value;
        // console.log('[editor content]', this.renderer.fields.editor_content_code[0].textContent);
      // }
    },

    // REMOVE ONE CHAR FROM LINE OF CODE
    removeCharFromLineOfCode: function() {
      var str = this.renderer.fields.editor_content_code[this.renderer.activeLine].textContent.slice(0, -1);
      // var newstr = str.slice(0, -1);
      // console.log(newstr)
      this.renderer.fields.editor_content_code[this.renderer.activeLine].textContent = str;
    },

    // 'SET' NEW LINE OF CODE
    // USED 'RENDERER' METHOD TO CREATE NEW LINE
    setNewLineOfCode: function() {
      // this.renderer.createEditorContentLineCode();
      this.renderer.createNewLineCode();
      this.moveTextAreaToLine();
      // console.log(this.text_area_value.length);
      // if (this.text_area_value.length > 0) {
      //   this.renderer.createEditorContentLineCode();
      // }
    },

    setActiveLine: function(){

    },

    moveTextAreaToLine: function(){
      console.log('[TOP AREA]', this.renderer.fields.text_area.style.top);
      
      this.renderer.fields.text_area.style.top += '20';
      // console.log('[textarea]', this.renderer.fields.text_area);
      
    },

    length: 0,
    name: 'editor methods'
  };

  // RENDERER CONSTRUCTOR
  var Renderer = function(container, settings) {
    this.container = container;
    this.settings = settings;
    this.listOfCodeLines = [];
    this.activeLine = 0;
    this.fields = this.createEditorFields();
    this.createNewLineCode();
    // this.createEditorContentLineCode();
  };

  // RENDERER PROTO METHODS
  Renderer.prototype = {
    // CREATE ALL EDITOR RENDERER ELEMENT
    createEditorFields: function() {
      var text_area = this.createTaxtArea();
      var editor_cursor = this.createCursor();
      var editor_content = this.createEditorContent();
      // var editor_content_code = this.createEditorContentLineCode();
      // this.container.appendChild(editor_content);

      return {
        text_area,
        editor_content,
        editor_cursor,
        editor_content_code: editor_content.childNodes
      };
    },
    
    // CREATE TEXTAREA
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
      text_area.style.zIndex = '0';
      text_area.style.background = 'transparent';
      // text_area.style.border = 'none';
      text_area.style.resize = 'none';
      // text_area.style.outline = 'none';
      // text_area.style.overflow = 'hidden';
      text_area.style.font = 'inherit';
      text_area.style.height = '19px';
      // text_area.style.height = parseInt(this.settings.fontSize, 10) + 4 + 'px';
      text_area.style.width = '100%';
      text_area.style.padding = '0px 2px';
      text_area.style.margin = ' 0 -1px';
      text_area.style.contain = 'strict';
      text_area.style.userSelect = 'text';
      text_area.style.whiteSpace = 'pre!important';
      // text_area.style.opacity = 0;
      text_area.style.top = '20px';
      text_area.style.color = '#ffffff';
      // text_area.style.marginLeft = '50px';

      this.container.appendChild(div);
      return text_area;
    },

    // CREATE EDITOR CONTENT
    createEditorContent: function() {
      var editor_content = doc.createElement('div');
      editor_content.className = 'editor_content';
      editor_content.style.width = '100%';
      editor_content.style.height = 'auto';
      // var editor_content_code = doc.createElement('div');
      // editor_content_code.className = "editor_content_text";
      // editor_content_code.style.padding = '2px';
      // editor_content_code.style.height = this.settings.fontSize;
      // console.log(this.settings)
      // editor_content.appendChild(editor_content_code);
      this.container.appendChild(editor_content);
      return editor_content;
    },

    // FOR TESTING 
    // createEditorContentLineCode: function() {
    //   var editor_content_line = `<div class="editor_content_line" style="font-size:${this.settings.fontSize}></div>`
    //   var editor_content_code = doc.createElement('div');
    //   editor_content_code.className = 'editor_content_line';
    //   editor_content_code.style.padding = '2px';
    //   editor_content_code.style.height = 'auto';
    //   editor_content_code.style.minHeight = this.settings.fontSize;
    //   // editor_content_code.textContent = this.fields.text_area.value;
    //   // this.fields.editor_content.appendChild(editor_content_code);
    //   var fragment = doc.createDocumentFragment();
    //   console.log(new Date().getMilliseconds());
    //   var promis = async function(){
    //     return new Promise(function(res, rej){
    //       for(let i = 0; i < 20000; i++){
    //         this.createNewLineCode();
    //         // var editor_content_code = doc.createElement('div');
    //         // editor_content_code.className = 'editor_content_line';
    //         // editor_content_code.style.padding = '2px';
    //         // editor_content_code.style.height = 'auto';
    //         // editor_content_code.style.minHeight = this.settings.fontSize;
    //         // // console.log('ww')
    //         // // console.log(this)
    //         // // this.fields.editor_content.innerHTML += `<div class="editor_content_line" style="font-size:15px, minHeight: 15px;"></div>`;
    //         // fragment.appendChild(editor_content_code);
            
    //       };
    //       res('he')
    //     }.bind(this))
    //   }.bind(this)
    
    //   // for(let i = 0; i < 2000; i++){
    //   //   console.log('ww')
    //   //   this.fields.editor_content.innerHTML = editor_content_line;
    //   // }
    //   promis().then(function(res){
    //     console.log(res);
    //     // this.fields.editor_content.appendChild(fragment);
    //     console.log(new Date().getMilliseconds());
    //   }.bind(this))
    // },

    // CREATE NEW LINE OF CODE
    createNewLineCode: function () {
      var editor_content_code = doc.createElement('div');
      editor_content_code.className = 'editor_content_line';
      editor_content_code.style.padding = '2px';
      editor_content_code.style.height = 'auto';
      editor_content_code.style.minHeight = '22px';
      editor_content_code.style.cursor = "text";
      // editor_content_code.id = this.listOfCodeLines.length +1;
      editor_content_code.addEventListener('click', function(e) {
        e.stopPropagation();
        // console.log(this)
        // console.log('click');
        // console.log('src', e.srcElement)
        this.setLineActiveChangeColor(e.srcElement)
        this.focusTextArea();
      
        // console.log('event', e) ;
      }.bind(this), false);
      // editor_content_code.addEventListener('select', function(e) {
      //   // console.log(this)
      //   // console.log('click');
      //   // console.log('src', e.srcElement)
      //   // this.setLineActiveChangeColor(e.srcElement)
      //   // this.focusTextArea();
      //   console.log('[SELECT]', );
        
      //   // console.log('event', e) ;
      // }.bind(this), false);

      // editor_content_code.textContent = this.fields.text_area.value;
      this.listOfCodeLines.push(editor_content_code);
      // console.log('[lines]', this.listOfCodeLines);
      
      this.fields.editor_content.appendChild(editor_content_code);
    },

    // CREATE CURSOR
    createCursor: function () {
      var cursor = '|';
      var editor_cursor = doc.createElement('div');
      editor_cursor.innerHTML = cursor;
      editor_cursor.className = 'editor_cursor';
      editor_cursor.style.padding = '0px';
      editor_cursor.style.height = 'auto';
      // editor_cursor.style.minHeight = '30px';
      editor_cursor.style.position = "absolute";
      editor_cursor.style.zIndex = 99;
      editor_cursor.style.top = '-4px';
      editor_cursor.style.left = '1px';
      editor_cursor.style.color = 'white';
      editor_cursor.style.fontSize = '20px';
      editor_cursor.style.fontWeight = 'bold';
      editor_cursor.style.pointerEvents = "none";
      //  editor_cursor.style.cursor = "text";
      this.container.appendChild(editor_cursor);
      // setInterval(function(){
      //   console.log('cursor')
      // }, 1000);

    },

    // SET CODE LINE TO ACTIVE 'CHANGE COLOR'
    setLineActiveChangeColor: function (element) {
      this.listOfCodeLines[this.activeLine].style.backgroundColor = 'transparent';
      console.log('[line]', this.listOfCodeLines[this.activeLine]);
      
      // console.log('list', this.listOfCodeLines)
      this.activeLine = this.listOfCodeLines.indexOf(element);
      console.log(this.activeLine);
      // element.className += ' active_line';
      element.style.backgroundColor = '#343232';
    },

    // FOCUS TEXT AREA WHEN CLICKED ON LINE OF CODE
    focusTextArea: function () {
      console.log('[FOCUS AREA]', );
      
      this.fields.text_area.focus();
    },

    length: 0,
    name: 'renderer methods'
  };

  editor.new = function(id, settings) {
    window.addEventListener('DOMContentLoaded', function(){
      
      return new CreateEditor(id, settings);
    })
  };

  return editor;
})(this, json_editor || {});
