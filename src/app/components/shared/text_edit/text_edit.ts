import { Component, View, ElementRef } from 'angular2/angular2';
import { DOM } from 'angular2/src/core/dom/dom_adapter';
import { isPresent} from 'angular2/src/facade/lang';
import {SelectDropdown, SelectItem} from './../../base/base_modules.ts';
let template = require('./text_edit.html');
let styles = require('./text_edit.scss');

@Component({
	selector: 'text-edit',
	host: {
		'[class.c-extend-bar]': 'true',
		'[class.isExtended]': 'isExtended'
	},
})
@View({
	template: template,
	styles: [styles],
	directives: [SelectDropdown, SelectItem]
})
export class TextEdit {
	isExtended: boolean = false;
	quill: any;
	range: any;
	constructor(
		public el: ElementRef
	) { }
	openEditor() {
		this.isExtended = true;
		var editor = DOM.querySelector(this.el.nativeElement, '#editor');
		this.quill = new Quill(editor);
		this.quill.addModule('toolbar', {
			container: DOM.querySelector(this.el.nativeElement, '#toolbar')
		});
		console.log(this.quill);

	}
	closeEditor() { }


	getSelection = (cb) => {
		this.quill.focus();
		this.range = this.quill.getSelection();
		if (this.range) {
			if (this.range.start == this.range.end) {
				console.log('User cursor is at index', this.range.start);
				cb(this.range.start)
			} else {
				var text = this.quill.getText(this.range.start, this.range.end);
				console.log('User has highlighted: ', text);
				cb(this.range.start, this.range.end)
			}
		} else {
			console.log('User cursor is not in editor');
			cb()
		}
	}

	updateSize(event) {
		this.getSelection((start, end) => {
			
			if (isPresent(start) && !isPresent(end)) {
				console.log('prepare format');
				this.quill.prepareFormat('size', event);
			}
			else if (isPresent(start) && isPresent(end)) {
				this.quill.formatText(start, end, 'size', event);
			}
		})
		
	}
}