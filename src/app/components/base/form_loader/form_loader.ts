import { FORM_DIRECTIVES, NgForm, Component, View, OnInit, DynamicComponentLoader, Injector, provide, Renderer, ElementRef, ComponentRef } from 'angular2/angular2';
import {ObservableWrapper, Promise, PromiseWrapper} from 'angular2/src/facade/async';
import { Http } from 'angular2/http';

import {SHARED_COMPONENTS} from './../../shared/shared_modules.ts';
let template = require('./form_loader.html');

@Component({
	selector: 'form-loader',
	inputs: ['loader', 'data', 'control']
})
@View({
	template: template,
	directives: [SHARED_COMPONENTS, FORM_DIRECTIVES]
})
export class FormLoader implements OnInit {
	form: NgForm;
	loader: string;
	data: any;


	constructor(
		private _dComponentLoader: DynamicComponentLoader,
		private _renderer: Renderer,
		private _el: ElementRef,
		public http: Http

	) { }


	onInit() {
		let comp = _.find(SHARED_COMPONENTS, (e) => {
			return e.name === this.loader;
		})

		if (!comp) {
			return
		}

		return this._dComponentLoader.loadIntoLocation(comp, this._el, 'child')
			.then((comp: any) => {
				comp.instance.data = this.data;
				comp.instance.init();
			});

	}

}