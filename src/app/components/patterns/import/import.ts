import { Component, View , ControlGroup, FormBuilder, NgForm} from 'angular2/angular2';
import { BASE_COMPONENTS} from './../../base/base_modules.ts';
import { SHARED_COMPONENTS } from './../../shared/shared_modules.ts';
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

		});
		
		this.form.valueChanges.subscribe((res) => {
			console.log(res);
		})
  }
}