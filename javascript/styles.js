var json_editor = (function(editor) {
  'use strict';
  var doc = document; // used for shorthand
  // console.log(json_editor);

  editor.fn.setElementStyles = function() {
    // console.log(this.renderer.elements);

    // TEXTAREA
    var text_area = this.renderer.elements.text_area;
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
    // editor_content.style.overflowX = 'scroll';
    // editor_content.style.overflowX = 'hidden';
    // editor_content.style.overflowY = 'scroll';
    // editor_content.style.overflow = 'hidden';
    editor_content.style.display = 'block';
    editor_content.style.position = 'relative';

    // EDITOR CODE LINES CONTAINER
    var editor_code_lines_c = this.renderer.elements.editor_code_lines_c;
    editor_code_lines_c.className = 'editor_code_lines';
    editor_code_lines_c.style.display = 'inline-block';
    editor_code_lines_c.style.position = 'relative';
    editor_code_lines_c.style.minWidth = '100%';
    editor_code_lines_c.style.width = 'auto';
    editor_code_lines_c.style.height = 'auto';
    editor_code_lines_c.style.marginTop = '0';
    editor_code_lines_c.style.minHeight = '2841px'; // for testing scroll *100%
    var a = doc.createElement('div');
    a.style.position = 'absolute';
    a.style.width = '200px';
    a.style.height = '200px';
    a.style.backgroundColor = 'red';
    a.style.bottom = '0px'
    editor_code_lines_c.appendChild(a);
    // editor_code_lines_c.style.overflowY = 'scroll';

    // COLUMN OF CODE LINES
    var editor_column_lines = this.renderer.elements.editor_column_lines;
    editor_column_lines.className = 'editor_column_lines';
    editor_column_lines.style.position = 'relative';
    editor_column_lines.style.display = 'block';
    editor_column_lines.style.overflow = 'hidden';
    editor_column_lines.style.width = '70px';
    editor_column_lines.style.paddingRight = '20px';
    editor_column_lines.style.minHeight = '100%';
    editor_column_lines.style.height = '100%';
    editor_column_lines.style.backgroundColor = '#212121';
    editor_column_lines.style.float = 'left';

    // CURSOR
    var editor_cursor = this.renderer.elements.editor_cursor;
    editor_cursor.innerHTML = '|';
    editor_cursor.className = 'editor_cursor';
    editor_cursor.style.padding = '0px';
    editor_cursor.style.height = 'auto';
    // editor_cursor.style.minHeight = '30px';
    editor_cursor.style.position = 'absolute';
    editor_cursor.style.zIndex = 99;
    editor_cursor.style.top = '-4px';
    editor_cursor.style.left = '70px';
    editor_cursor.style.color = 'white';
    editor_cursor.style.fontSize = '20px';
    editor_cursor.style.fontWeight = 'bold';
    editor_cursor.style.pointerEvents = 'none';

    // EDITOR SCROLL VIEW
    var editor_scroll_view = this.renderer.elements.editor_scroll_view;
    editor_scroll_view.className = 'editor-scroll-view';
    editor_scroll_view.style.position = 'relative';
    editor_scroll_view.style.display = 'block';
    editor_scroll_view.style.overflow = 'hidden';
    // editor_scroll_view.style.overflowY = 'scroll'; // now disbale
    // editor_scroll_view.style.overflowX = 'scroll'; // now disable
    editor_scroll_view.style.width = 'auto';
    editor_scroll_view.style.height = '100%';
    editor_scroll_view.style.minHeight = '100%';

    // EDITOR SCROLLBARS
    var editor_scrollbar_y = this.renderer.elements.editor_scrollbar_y;
    editor_scrollbar_y.style.position = 'absolute';
    editor_scrollbar_y.style.top = 0;
    editor_scrollbar_y.style.right = 0;
    editor_scrollbar_y.style.height = '100%';
    editor_scrollbar_y.style.width = '20px';
    editor_scrollbar_y.style.display = 'block';
    // editor_scrollbar_y.style.backgroundColor = "#282828";
    editor_scrollbar_y.style.borderLeft = '1px solid #454545';
    // console.log('[scroll-y]', this.renderer.elements.editor_scrollbar_y.children );

    var editor_scrollbar_x = this.renderer.elements.editor_scrollbar_x;
    editor_scrollbar_x.style.position = 'absolute';
    editor_scrollbar_x.style.bottom = 0;
    editor_scrollbar_x.style.right = 0;
    editor_scrollbar_x.style.display = 'block';
    editor_scrollbar_x.style.height = '20px';
    editor_scrollbar_x.style.width = '100%';
    // editor_scrollbar_h.style.backgroundColor = "#282828";
    editor_scrollbar_x.style.borderTop = '1px solid #454545';

    // var editor_code_lines_c_height = this.renderer.elements.editor_code_lines_c.offsetHeight;
    // console.log('[editor code lines height]:', editor_code_lines_c_height, 'px');
    // var editor_code_lines_c_margin_top = this.renderer.elements.editor_code_lines_c.style.marginTop;
    // console.log('[Margin top]', editor_code_lines_c_margin_top);

    // EDITOR SCROLLBARS THUMB
    var editor_scrollbar_thumb = [
      this.renderer.elements.editor_scrollbar_y.children[0],
      this.renderer.elements.editor_scrollbar_x.children[0]
    ];

    editor_scrollbar_thumb[0].style.display = 'block';
    editor_scrollbar_thumb[0].style.position = 'relative';
    editor_scrollbar_thumb[0].style.width = '100%';
    editor_scrollbar_thumb[0].style.userSelect = 'none';
    editor_scrollbar_thumb[0].style.backgroundColor = '#313131';
    
    editor_scrollbar_thumb[1].style.userSelect = 'none';
    editor_scrollbar_thumb[1].style.height = '100%';
    editor_scrollbar_thumb[1].style.display = 'block';
    editor_scrollbar_thumb[1].style.width = '120px';
    editor_scrollbar_thumb[1].style.backgroundColor = '#313131';

    // console.log('[style]', this.renderer.elements);

    ////////////////////////////////////////////////////////////
  };

  return editor;
})(json_editor || {});
