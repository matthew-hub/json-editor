var json_editor = (function(editor) {
  'use strict';
  var doc = document; // used for shorthand
  // RENDERER CONSTRUCTOR
  var Renderer = function(container, settings) {
    this.container = container;
    this.settings = settings;
    this.listOfCodeLines = [];
    this.activeLine = 0;
    this.fields = this.createEditorFields();
    // this.fields.editor_scroll_view = this.createEditorScrollView()
    this.createNewLineCode();
    // this.createEditorContentLineCode();
  };

  // RENDERER PROTO METHODS
  Renderer.prototype = {
    // CREATE ALL EDITOR RENDERER ELEMENT
    createEditorFields: function() {
      var text_area = this.createTaxtArea();
      var editor_cursor = this.createCursor();
      var editor_column_lines = this.createColumnOfLines();
      var editor_content = this.createEditorContent();
      var editor_scroll_view = this.createEditorScrollView();
      // var editor_content_code = this.createEditorContentLineCode();
      // this.container.appendChild(editor_content);

      return {
        text_area,
        editor_content,
        editor_cursor,
        editor_column_lines,
        // editor_scroll_view ,
        editor_content_code: editor_content.childNodes
      };
    },

    // CREATE TEXTAREA
    createTaxtArea: function() {
      var div = doc.createElement('div');
      div.className = 'editor_text_input';
      // div.style.float = 'left';
      // div.style.position = 'absolute';
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
      text_area.style.top = '0px';
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
      editor_content.style.marginLeft = '100px';
 
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

    // CREATE COLUMN OF CODE LINES
    createColumnOfLines: function() {
      var editor_column_lines = doc.createElement('div');
      editor_column_lines.className = 'editor_column_lines';
      editor_column_lines.style.height = '100%';
      editor_column_lines.style.width = '100px';
      // editor_column_lines.style.clear = 'both';
      // editor_column_lines.style.float = 'left';
      editor_column_lines.style.backgroundColor = '#212121';
      editor_column_lines.style.padding = '2px';
      this.container.appendChild(editor_column_lines);
      return editor_column_lines;
    },

    // CREATE NEW LINE OF CODE
    createNewLineCode: function() {
      // console.log('[CONTENT]', this.fields.editor_content);

      var editor_content_code = doc.createElement('div');
      editor_content_code.className = 'editor_code_line';
      editor_content_code.style.padding = '2px';
      editor_content_code.style.height = 'auto';
      editor_content_code.style.minHeight = '22px';
      editor_content_code.style.cursor = 'text';
      // editor_content_code.id = this.listOfCodeLines.length +1;
      editor_content_code.addEventListener(
        'click',
        function(e) {
          e.stopPropagation();
          // console.log(this)
          // console.log('click');
          // console.log('src', e.srcElement)
          this.setLineActiveChangeColor(e.srcElement);
          this.focusTextArea();

          // console.log('event', e) ;
        }.bind(this),
        false
      );
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
      // this.listOfCodeLines.push(editor_content_code);
      this.listOfCodeLines.splice(this.activeLine + 1, 0, editor_content_code);

      // APPENDCHILD WHEN FIRST TIME CREATE NEW LINE CODE
      if (this.listOfCodeLines.length <= 1) {
        this.fields.editor_content.appendChild(editor_content_code);
      } else {
        // INSERT NEW LINE IN RIGHT PLACE
        this.listOfCodeLines[this.activeLine].parentNode.insertBefore(editor_content_code, this.listOfCodeLines[this.activeLine].nextSibling);
      }
      this.setLineActiveChangeColor(editor_content_code);
    },


    // CREATE CURSOR
    createCursor: function() {
      var div = doc.createElement('div');
      div.className = 'editor_cursor_box';
      // div.style.position = 'absolute';
      // div.style.float = 'left';
      var cursor = '|';
      var editor_cursor = doc.createElement('div');
      editor_cursor.innerHTML = cursor;
      editor_cursor.className = 'editor_cursor';
      editor_cursor.style.padding = '0px';
      editor_cursor.style.height = 'auto';
      // editor_cursor.style.minHeight = '30px';
      editor_cursor.style.position = 'absolute';
      editor_cursor.style.zIndex = 99;
      editor_cursor.style.top = '-4px';
      editor_cursor.style.left = '1px';
      editor_cursor.style.color = 'white';
      editor_cursor.style.fontSize = '20px';
      editor_cursor.style.fontWeight = 'bold';
      editor_cursor.style.pointerEvents = 'none';
      div.appendChild(editor_cursor);
      //  editor_cursor.style.cursor = "text";
      this.container.appendChild(div);
      // setInterval(function(){
      //   console.log('cursor')
      // }, 1000);
      return div;
    },

    // CREATE SCROLL VIEW

    createEditorScrollView: function() {
      var editor_scroll_view = doc.createElement('div');
      editor_scroll_view.className = 'editor-scroll-view';
      editor_scroll_view.style.display = 'block';
      editor_scroll_view.style.width = '100%';
      editor_scroll_view.style.height = '100%';
      editor_scroll_view.style.position = 'relative';
      // this.fields.editor_content.appendChild(editor_scroll_view);
      this.container.appendChild(editor_scroll_view);
    },

    // SET CODE LINE TO ACTIVE 'CHANGE COLOR'
    setLineActiveChangeColor: function(element) {
      this.listOfCodeLines[this.activeLine].style.backgroundColor = 'transparent';
      // console.log('[line]', this.listOfCodeLines[this.activeLine]);

      // console.log('list', this.listOfCodeLines)
      this.activeLine = this.listOfCodeLines.indexOf(element);
      console.log(this.activeLine);
      // element.className += ' active_line';
      element.style.backgroundColor = '#343232';
    },

    // FOCUS TEXT AREA WHEN CLICKED ON LINE OF CODE
    focusTextArea: function() {
      console.log('[FOCUS AREA]');

      this.fields.text_area.focus();
    },

    length: 0,
    name: 'renderer methods'
  };

  editor.renderer = function(element, settings) {
    return new Renderer(element, settings);
  };

  return editor;

})(json_editor || {});
