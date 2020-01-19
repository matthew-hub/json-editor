var json_editor = (function(editor) {
  'use strict';
  var doc = document; // used for shorthand
  // RENDERER CONSTRUCTOR
  var Renderer = function(container, settings) {
    this.container = container;
    this.editor_content = this.createEditorContent();
    this.settings = settings;
    this.activeLine = 0;
    this.scrollbars = {
      is_mouse_down: false,
      previous_mouse_position: 0,
      previous_thumb_position: 0,
    };
    this.list_code_lines = [];
    this.elements = this.createEditorFields();
    this.createScrollBars();
    // this.elements.editor_scroll_view = this.createEditorScrollView()
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
      // var editor_content = this.createEditorContent();
      var editor_scroll_view = this.createEditorScrollView();
      var editor_code_lines_c = this.createEditorCodeLinesContainer(editor_scroll_view);

      // var editor_content_code = this.createEditorContentLineCode();
      // this.container.appendChild(editor_content);

      return {
        text_area,
        editor_column_lines,
        editor_cursor,
        // editor_content,
        editor_code_lines_c,
        editor_scroll_view,
        editor_code_rows: editor_code_lines_c.childNodes
      };
    },

    // CREATE TEXTAREA
    createTaxtArea: function() {
      var editor_text_input = doc.createElement('div');
      editor_text_input.className = 'editor_text_input';

      var text_area = doc.createElement('textarea');
      editor_text_input.appendChild(text_area);
      this.container.insertBefore(editor_text_input, this.editor_content);
      return text_area;
    },

    // CREATE EDITOR CONTENT
    createEditorContent: function() {
      var editor_content = doc.createElement('div');
      this.container.appendChild(editor_content);
      return editor_content;
    },

    // CREATE EDITOR CODE LINES CONTAINER
    createEditorCodeLinesContainer: function(el) {
      var editor_code_lines_c = doc.createElement('div');
      // editor_code_lines_c.style.float = 'left';
      // editor_code_lines_c.style.overflow = 'hidden';
      el.appendChild(editor_code_lines_c);
      return editor_code_lines_c;
    },

    // CREATE COLUMN OF CODE LINES
    createColumnOfLines: function() {
      var editor_column_lines = doc.createElement('div');
      this.editor_content.appendChild(editor_column_lines);
      return editor_column_lines;
    },

    // CREATE NEW LINE OF CODE
    createNewLineCode: function() {
      // console.log('[CONTENT]', this.elements.editor_content);

      var editor_code_line = doc.createElement('div');
      editor_code_line.className = 'code_line';
      editor_code_line.style.padding = '2px';
      editor_code_line.style.height = 'auto';
      // editor_code_line.style.overflow = 'hidden';
      // editor_code_line.style.textOverflow = 'ellipsis';
      editor_code_line.style.whiteSpace = 'nowrap';
      editor_code_line.style.display = 'block';
      editor_code_line.style.margin = 0;
      editor_code_line.style.minHeight = '22px';
      editor_code_line.style.cursor = 'text';
      editor_code_line.style.width = '100%';
      // editor_code_line.style.backgroundColor = '#121212'
      // editor_code_line.style.minWidth = '100%'
      // editor_content_code.id = this.listOfCodeLines.length +1;
      editor_code_line.addEventListener(
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

      // editor_content_code.textContent = this.elements.text_area.value;
      // this.listOfCodeLines.push(editor_content_code);
      this.list_code_lines.splice(this.activeLine + 1, 0, editor_code_line);

      // APPENDCHILD WHEN FIRST TIME CREATE NEW LINE CODE
      if (this.list_code_lines.length <= 1) {
        this.elements.editor_code_lines_c.appendChild(editor_code_line);
      } else {
        // INSERT NEW LINE IN RIGHT PLACE
        this.list_code_lines[this.activeLine].parentNode.insertBefore(
          editor_code_line,
          this.list_code_lines[this.activeLine].nextSibling
        );
      }
      this.setLineActiveChangeColor(editor_code_line);

      var editor_column_line = doc.createElement('div');
      editor_column_line.className = 'code_column_line';
      editor_column_line.style.padding = '2px';
      editor_column_line.style.height = '22px';
      editor_column_line.style.float = 'left';
      editor_column_line.style.textAlign = 'right';
      // editor_column_line.style.overflow = 'hidden';
      // editor_column_line.style.textOverflow = 'ellipsis';
      // editor_column_line.style.whiteSpace = 'nowrap';
      editor_column_line.style.display = 'block';
      editor_column_line.style.margin = 0;
      // editor_column_line.style.minHeight = '22px'
      editor_column_line.style.cursor = 'context-menu';
      editor_column_line.style.width = '100%';
      editor_column_line.innerHTML = this.list_code_lines.length;
      this.elements.editor_column_lines.appendChild(editor_column_line);
    },

    // CREATE CURSOR
    createCursor: function() {
      var div = doc.createElement('div');
      div.className = 'editor_cursor_box';
      // div.style.position = 'absolute';
      // div.style.float = 'left';

      var editor_cursor = doc.createElement('div');
      div.appendChild(editor_cursor);
      //  editor_cursor.style.cursor = "text";
      this.container.appendChild(div);
      // setInterval(function(){
      //   console.log('cursor')
      // }, 1000);
      return div;
    },

    // CREATE SCROLL VIEW

    createEditorScrollView: function(element) {
      var editor_scroll_view = doc.createElement('div');
      // editor_scroll_view.style.top = '0'
      // this.elements.editor_content.appendChild(editor_scroll_view);
      // this.elements.editor_code_lines_c.appendChild(editor_scroll_view);
      // console.log('[this elements]', element);
      // element.appendChild(editor_scroll_view)
      this.editor_content.appendChild(editor_scroll_view);
      return editor_scroll_view;
    },

    // CREATE SCROLLBARS
    createScrollBars: function() {
      var editor_scrollbar_y = doc.createElement('div');
      editor_scrollbar_y.className = 'scrollbar-y';

      var editor_scrollbar_x = doc.createElement('div');
      editor_scrollbar_x.className = 'scrollbar-x';

      var scrollbar_thumb_y = doc.createElement('div');
      scrollbar_thumb_y.className = 'scrollbar-thumb';
      var scrollbar_thumb_x = doc.createElement('div');
      scrollbar_thumb_x.className = 'scrollbar-thumb';

      editor_scrollbar_y.appendChild(scrollbar_thumb_y);
      editor_scrollbar_x.appendChild(scrollbar_thumb_x);
      // var scrollbar_thumb = doc.createElement('div');
      // scrollbar_thumb.className = 'scrollbar_thumb'
      // editor_scrollbar_h.appendChild(scrollbar_thumb)

      this.elements.editor_scrollbar_y = editor_scrollbar_y;
      this.elements.editor_scrollbar_x = editor_scrollbar_x;
      this.elements.editor_scroll_view.appendChild(editor_scrollbar_y);
      this.elements.editor_scroll_view.appendChild(editor_scrollbar_x);
    },

    // SET CODE LINE TO ACTIVE 'CHANGE COLOR'
    setLineActiveChangeColor: function(element) {
      this.list_code_lines[this.activeLine].style.backgroundColor = 'transparent';
      // console.log('[line]', this.listOfCodeLines[this.activeLine]);
      // console.log('list', this.listOfCodeLines);
      this.activeLine = this.list_code_lines.indexOf(element);
      console.log('[active line]', this.activeLine);
      // element.className += ' active_line';
      element.style.backgroundColor = '#212121';
    },

    // FOCUS TEXT AREA WHEN CLICKED ON LINE OF CODE
    focusTextArea: function() {
      console.log('[FOCUS AREA]');

      this.elements.text_area.focus();
    },

    length: 0,
    name: 'renderer methods'
  };

  editor.renderer = function(element, settings) {
    return new Renderer(element, settings);
  };

  return editor;
})(json_editor || {});
