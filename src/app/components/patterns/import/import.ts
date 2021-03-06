import { Component, View} from 'angular2/core';
import { ControlGroup, FormBuilder, NgForm, FORM_DIRECTIVES, NgFormModel, Validators} from 'angular2/common';
import { BASE_COMPONENTS} from './../../base/base_modules.ts';
import { SHARED_COMPONENTS } from './../../shared/shared_modules.ts';
import {inputEqualsValue} from './../../../directives/validators/input_equals.ts';
let template = require('./import.html');
let styles = require('./import.scss');


class CheckoutModel {
	amount: string = '5'
}

@Component({
	selector: 'import'
})
@View({
	template: template,
	styles: [styles],
	directives: [BASE_COMPONENTS, SHARED_COMPONENTS]
})	    
export class ImportPage {
	userForm: NgForm;
	form: ControlGroup;
	model = new CheckoutModel();
	
	constructor(fb: FormBuilder) {
		this.form = fb.group({
			"firstName": [""],
			"autoComplete": ["", inputEqualsValue]
		});
		
		this.form.valueChanges.subscribe((res) => {
			//console.log(res);
			//console.log(this.form.valid);
		})
  }
}