import { Component, View } from 'angular2/core';
import { FormBuilder,ControlGroup, Validators, NgForm} from 'angular2/common';
import { BASE_COMPONENTS} from './../../base/base_modules.ts';
import { SHARED_COMPONENTS } from './../../shared/shared_modules.ts';
import { SectionService} from './../../../services/services_modules.ts';

let template = require('./create_section.html');
let styles = require('./create_section.scss');

@Component({
	selector: 'create-section-page'
})
@View({
	template: template,
	styles: [styles],
	directives: [BASE_COMPONENTS, SHARED_COMPONENTS]
	
})	    
export class CreateSectionPage {
	form: ControlGroup;
	constructor(
		fb: FormBuilder,
		public sectionservice: SectionService
	) {
		this.form = fb.group({
			"name": ["",Validators.required],
			"url": ["", Validators.required]
		})
		
	}
	onSubmit(): void {
		this.sectionservice.create(this.form.value);
	}
}