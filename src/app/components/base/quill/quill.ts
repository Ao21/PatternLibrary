import { Component, View, ElementRef } from 'angular2/angular2';
import { DOM } from 'angular2/src/core/dom/dom_adapter';
let template = require('./quill.html');
let styles = require('./quill.scss');

@Component({
	selector: 'quill',
	host: {
		"(click)":"createEditor()"
	}
})
@View({
	template: template,
	styles: [styles],
})	    
export class QuillEditor {
	isActive: boolean = false;
	constructor(
		public el: ElementRef
	) {
		
	}
	createEditor() {
		if (!this.isActive) {
			this.isActive = true;
			var editor = DOM.querySelector(this.el.nativeElement, '#editor');
			var quill = new Quill(editor);
			quill.addModule('toolbar', {
				container:  DOM.querySelector(this.el.nativeElement, '#toolbar') 
			});
						
			
		}
		
	}
}