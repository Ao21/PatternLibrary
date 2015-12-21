import { Component, View, ElementRef, OnInit, OnChanges, EventEmitter } from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { isPresent} from 'angular2/src/facade/lang';
import {SelectDropdown, SelectItem} from './../../base/base_modules.ts';
import {UIStore} from './../../../stores/stores_modules.ts';
let template = require('./text_edit.html');
let styles = require('./text_edit.scss');

@Component({
	selector: 'text-edit',
	inputs: ['data','sectionComponent'],
	outputs: ['onSave','onIsExtended'],
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
export class TextEdit implements OnChanges {
	isRegistered: boolean = false;
	isExtended: boolean = false;
	sectionComponent: any;
    quill: any;
	data: any;
	range: any;
	onSave: EventEmitter<any> = new EventEmitter;
	onIsExtended: EventEmitter<any> = new EventEmitter();
	
	constructor(
		public el: ElementRef,
		public uiStore: UIStore
	) { }
	openEditor() {
		this.isExtended = true;
		this.onIsExtended.emit(true);
		var editor = DOM.querySelector(this.el.nativeElement, '#editor');
		this.quill = new Quill(editor);
		this.quill.addModule('toolbar', {
			container: DOM.querySelector(this.el.nativeElement, '#toolbar')
		});
		if (this.data.quillData) {
			this.quill.setContents(this.data.quillData)
		} else if(this.data.html) {
			this.quill.setHTML(this.data.html)
		}
		    

	}
	closeEditor() { 
		this.quill.destroy();
		this.isExtended = false;
		this.onIsExtended.emit(false);
		this.uiStore.update(['actionBar', this.sectionComponent._id, 'textEdit'], false, 'actionBar');
	}
	
	save() {
		let object = {
			html: this.quill.getHTML(),
            quillData: this.quill.getContents(),
            firstInit: false
		}

		this.onSave.emit(object);
	}


	getSelection = (cb) => {
		this.quill.focus();
		this.range = this.quill.getSelection();
		if (this.range) {
			if (this.range.start == this.range.end) {
				cb(this.range.start)
			} else {
				var text = this.quill.getText(this.range.start, this.range.end);
				cb(this.range.start, this.range.end)
			}
		} else {
			cb()
		}
	}

	updateSize(event) {

		this.getSelection((start, end) => {
			
			if (isPresent(start) && !isPresent(end)) {
				this.quill.prepareFormat('size', event);
			}
			else if (isPresent(start) && isPresent(end)) {
				this.quill.formatText(start, end, 'size', event);
			}
		})
		
	}
	
	ngOnChanges() {
		if (this.sectionComponent) { 
			this.register()
        }
        if (this.data.firstInit) {
            this.openEditor();
        }
	}
	
	register() {
		if (!this.isRegistered) {
			this.uiStore.update(['actionBar', this.sectionComponent._id, 'textEdit'], false, 'actionBar');
			this.uiStore.subscribe('actionBar', state=> {
				var a = state.get(['actionBar', this.sectionComponent._id, 'textEdit']);
				if (a) {
					this.openEditor();
				}
			})
			this.isRegistered = true;
		}
	}
	
}