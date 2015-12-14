import { Component, View, OnInit, DynamicComponentLoader, Injector, provide, Renderer, ElementRef, ComponentRef } from 'angular2/core';
import {ObservableWrapper, Promise, PromiseWrapper} from 'angular2/src/facade/async';
import { Http } from 'angular2/http';

import * as BaseModules from './../base_modules.ts';
import {SHARED_COMPONENTS} from './../../shared/shared_modules.ts';
let template = require('./component_loader.html');

@Component({
	selector: 'component-loader',
	inputs: ['loader', 'data']
})
    
@View({
	template: template,
})
export class ComponentLoader implements OnInit {
	loader: string;
	data: any;


	constructor(
		private _dComponentLoader: DynamicComponentLoader,
		private _renderer: Renderer,
		private _el: ElementRef,
		public http: Http

	) { }


	ngOnInit() {
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