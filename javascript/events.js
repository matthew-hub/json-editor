var json_editor = (function(editor){
  'use strict';
  editor.fn.setEventsListener = function(){
     // 'FUCUSING EDITOR'
     this.renderer.elements.editor_code_lines_c.addEventListener('click', function() {
      console.log(this.renderer.list_code_lines);
      // console.log('focus',)
      //  console.log( this.renderer.list_code_lines[this.renderer.list_code_lines.length-1]);
      this.renderer.list_code_lines[this.renderer.list_code_lines.length - 1].style.backgroundColor = '#212121';
      this.renderer.focusTextArea();
    }.bind(this), false);

    // INPUT IN TEXAREA
    this.renderer.elements.text_area.addEventListener('input', function(e) {
      // console.log(this.renderer.elements.text_area.value)
      // console.log(window.event.keyCode)
      // console.log(this.value)
      console.log('input');
      this.setTextAreaValue();
      // this.setNewLineOfCode();
      this.displayTextAreaValue();
      this.text_area_value = '';
      this.renderer.elements.text_area.value = '';
    }.bind(this), false);

    // HANDLE ALL KEYDOWN IN EDITOR
    this.container.addEventListener(
      'keydown',
      function(e) {
        console.log(e.keyCode);
        var keyCode = e.keyCode || e.witch;
        if (keyCode === 13) {
          e.preventDefault();
          console.log('[ENTER]');
          this.setNewLineOfCode();
        }

        if (keyCode == 9) {
          e.preventDefault();
          console.log('[Tab]');
        }

        if (keyCode === 8) {
          e.preventDefault();
          console.log('[Backspace]');
          this.removeCharFromLineOfCode();
        }

        if (e.ctrlKey) {
          if (keyCode === 65) {
            console.log('[SELECT ALL]');
          }
        }
        // console.log(e)
        // e.preventDefault();
        //   console.log('[Value]', this.innerHTML);
      }.bind(this),
      false
    );

    this.renderer.elements.editor_scrollbar_y.addEventListener('mousedown', function(e) {
      // e.stopImmediatePropagation();
      // check if event target is a scrollbar thumb
      if (e.target === this.renderer.elements.editor_scrollbar_y) {
        console.log('event', e);
        console.log('event y', e.clientY);
      
        var scrollTop = e.clientY - this.renderer.elements.editor_scrollbar_y.children[0].offsetHeight / 2;
        console.log('[scrolltop]', scrollTop);
        if(scrollTop < 0) {
          scrollTop = 0;
        } else if (scrollTop + this.renderer.elements.editor_scrollbar_y.children[0].offsetHeight >  this.renderer.elements.editor_scroll_view.offsetHeight) {
          scrollTop = this.renderer.elements.editor_scroll_view.offsetHeight - this.renderer.elements.editor_scrollbar_y.children[0].offsetHeight;
        }
        // this.renderer.elements.editor_code_lines_c.style.top = '-' + this.renderer.elements.editor_scroll_view.offsetHeight - this.renderer.elements.editor_scrollbar_y.children[0].offsetHeight + 'px';
        var a = this.renderer.elements.editor_code_lines_c.offsetHeight / this.renderer.elements.editor_scroll_view.offsetHeight;
        this.renderer.elements.editor_code_lines_c.style.top = '-' + scrollTop * (this.renderer.elements.editor_code_lines_c.offsetHeight / this.renderer.elements.editor_scroll_view.offsetHeight) + 'px';
        this.renderer.elements.editor_scrollbar_y.children[0].style.top =  scrollTop + 'px';
        // get thumb position and set right position of editor code lines c
        console.log(a)
        // Math.floor((editor_scroll_view_height / editor_code_lines_c_height) * editor_scroll_view_height) + 'px';
        // this.renderer.elements.editor_code_lines_c.clientTop = 300;
        // console.log(this.renderer.elements);
        this.renderer.scrollbars.is_mouse_down = true;
        this.renderer.scrollbars.previous_mouse_position = e.clientY;
        this.renderer.scrollbars.previous_thumb_position = this.renderer.elements.editor_scrollbar_y.children[0].offsetTop;
      } else if (e.target === this.renderer.elements.editor_scrollbar_y.children[0]){

        this.renderer.scrollbars.is_mouse_down = true;
        this.renderer.scrollbars.previous_mouse_position = e.clientY;
        this.renderer.scrollbars.previous_thumb_position = this.renderer.elements.editor_scrollbar_y.children[0].offsetTop;
        

        console.log('thumb', e)
      }

    }.bind(this), false);

    // this.renderer.elements.editor_scrollbar_y.addEventListener('mouseup', function(e){
    //   console.log('[mouseup]', );
      
    //   this.renderer.scrollbars.is_mouse_down = false;
    //   this.renderer.scrollbars.previous_mouse_position = e.clientY;
    //   this.renderer.scrollbars.previous_thumb_position = this.renderer.elements.editor_scrollbar_y.children[0].offsetTop;
    // }.bind(this), false);


    this.renderer.elements.editor_scroll_view.addEventListener('mousemove', function(e){
      // console.log(e.clientX)
     
      if(!this.renderer.scrollbars.is_mouse_down){
        return;
      }
      var editor_content_width = this.renderer.editor_content.offsetWidth;
      var event_mouse_x = e.clientX;
      var range = editor_content_width - event_mouse_x;

      if(range <= 150 ) {
        var mouse_position = e.clientY - this.renderer.scrollbars.previous_mouse_position;
        var scrollTop = this.renderer.scrollbars.previous_thumb_position + mouse_position;

        if(scrollTop < 0){
          scrollTop = 0;
        } else if (scrollTop + this.renderer.elements.editor_scrollbar_y.children[0].offsetHeight > this.renderer.elements.editor_scroll_view.offsetHeight) {
          scrollTop = this.renderer.elements.editor_scroll_view.offsetHeight - this.renderer.elements.editor_scrollbar_y.children[0].offsetHeight;
        }
        this.renderer.elements.editor_scrollbar_y.children[0].style.top = scrollTop + 'px';
        var a = this.renderer.elements.editor_code_lines_c.offsetHeight / this.renderer.elements.editor_scroll_view.offsetHeight;
        // console.log('[a]', a);
        this.renderer.elements.editor_code_lines_c.style.top = '-' + scrollTop * (this.renderer.elements.editor_code_lines_c.offsetHeight / this.renderer.elements.editor_scroll_view.offsetHeight) + 'px';
      } else {
        return;
      }
    }.bind(this), false);

    this.renderer.elements.editor_scroll_view.addEventListener('mouseup', function(e){
      console.log('[mouse up scroll view]', );
      // console.log('[mouseup]', );
      
      this.renderer.scrollbars.is_mouse_down = false;
      this.renderer.scrollbars.previous_mouse_position = e.clientY;
      this.renderer.scrollbars.previous_thumb_position = this.renderer.elements.editor_scrollbar_y.children[0].offsetTop;
     
    }.bind(this), false);

  }

  return editor

})(json_editor || {})