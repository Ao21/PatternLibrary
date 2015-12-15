import { Component, View, Host, OnChanges, OnInit } from 'angular2/core';
import {
Control,
ControlGroup,
FORM_DIRECTIVES,
NgFormModel,
NgForm
} from 'angular2/common';
let template = require('./url_creator.html');

@Component({
	selector: 'url-creator',
	inputs: ['controlPath: control','placeholder', 'value'],
})
@View({
	template: template,
	directives: [FORM_DIRECTIVES],
	styles: [],
})	    
export class UrlCreatorInput implements OnInit, OnChanges {
	formDir: NgFormModel;
	placeholder: string = "";
	controlPath: string;
	control: any;
	value: string;
	
	constructor(
		 @Host() formDir: NgFormModel
	) {
		this.formDir = formDir;
	}
	
	ngOnInit() {
		this.control = this.formDir.form.controls[this.controlPath];
	}
	
	ngOnChanges() {
		if (this.value) {
			this.value = this.value.trim().replace(/\s+/g, '-').toLowerCase();
			this.control.updateValue(this.value);
		}
		
	}
}