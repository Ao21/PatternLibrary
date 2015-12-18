import { Component, View, OnInit, ElementRef, Renderer } from 'angular2/core';
import { ControlGroup, FormBuilder, NgForm, FORM_DIRECTIVES, NgFormModel, Validators} from 'angular2/common';
import {FormComponent} from './../form_component/form_component.ts';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {SectionStore} from './../../../stores/section_store.ts';
let template = require('./component_config.html');
let styles = require('./component_config.scss');

@Component({
	selector: 'component-config',
	inputs: ['data', 'sectionComponent']
})
@View({
	template: template,
	styles: [styles],
	directives: [FormComponent]
})
export class ComponentConfig implements OnInit {
	componentConfigForm: NgForm;
	sectionComponent: any;
	form: ControlGroup;
	data: any;
	fields: any;
	ctrl: any;

	constructor(
		public sectionStore: SectionStore,
		public fb: FormBuilder,
		public renderer: Renderer,
		public el: ElementRef
	) {
		this.ctrl = [];

	}

	ngOnInit() {

		this.fields = this.data;

		_.forEach(this.fields, (e: any) => {
			this.ctrl[e.control] = [''];
		})
		this.form = this.fb.group(this.ctrl)
		this.form.valueChanges.subscribe(
			(res) =>
			{ console.log(res); }
		)
	}

	onSubmit() {
		var data = this.form.value;
		this.sectionStore.updateComponent(this.sectionComponent._id, data);
	}
	close() {
		console.log(this.sectionComponent._id);
		this.sectionStore.removeComponent(this.sectionComponent._id);
	}
}