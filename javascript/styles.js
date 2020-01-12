var json_editor = (function(editor) {
  'use strict';
  var doc = document; // used for shorthand
  console.log(json_editor);

  editor.fn.setElementStyles = function() {
    console.log(this.renderer.fields);

    // TEXTAREA
    var text_area = this.renderer.fields.text_area;
    text_area.className = 'editor_textarea';
    text_area.name = 'editor-input';
    text_area.style.position = 'absolute';
    text_area.style.zIndex = '0';
    text_area.style.background = 'transparent';
    text_area.style.resize = 'none';
    text_area.style.font = 'inherit';
    text_area.style.height = '19px';
    text_area.style.width = '100%';
    text_area.style.padding = '0px 2px';
    text_area.style.margin = ' 0 -1px';
    text_area.style.contain = 'strict';
    text_area.style.userSelect = 'text';
    text_area.style.whiteSpace = 'pre!important';
    text_area.style.opacity = 0;
    text_area.style.top = '0px';
    text_area.style.color = '#ffffff';

    // EDITOR CONTENT
    var editor_content = this.renderer.editor_content;
    editor_content.className = 'editor_content';
    editor_content.style.width = '100%';
    editor_content.style.height = '100%';
    editor_content.style.overflow = 'hidden';
    editor_content.style.display = 'block';
    editor_content.style.position = 'relative';

    // EDITOR CODE LINES CONTAINER
    var editor_code_lines_c = this.renderer.fields.editor_code_lines_c;
    editor_code_lines_c.className = 'editor_code_lines';
    editor_code_lines_c.style.display = 'block';
    editor_code_lines_c.style.position = 'relative';
    editor_code_lines_c.style.width = 'auto';
    editor_code_lines_c.style.height = '100%';

    // COLUMN OF CODE LINES
    var editor_column_lines = this.renderer.fields.editor_column_lines;
    editor_column_lines.className = 'editor_column_lines';
    editor_column_lines.style.position = 'relative';
    editor_column_lines.style.display = 'block';
    editor_column_lines.style.overflow = 'hidden';
    editor_column_lines.style.width = '70px';
    editor_column_lines.style.height = '100%';
    editor_column_lines.style.backgroundColor = '#212121';
    editor_column_lines.style.float = 'left';
  
    // CURSOR 
    var editor_cursor = this.renderer.fields.editor_cursor;
    editor_cursor.innerHTML = '|';
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
  };

  return editor;
})(json_editor || {});
