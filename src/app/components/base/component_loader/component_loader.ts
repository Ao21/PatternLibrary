import { Component, View, OnInit, DynamicComponentLoader, Injector, provide, Renderer, ElementRef, ComponentRef } from 'angular2/core';
import {ObservableWrapper, Promise, PromiseWrapper} from 'angular2/src/facade/async';
import { Http } from 'angular2/http';
import {ComponentConfig} from './../../shared/component_config/component_config.ts';

import * as BaseModules from './../base_modules.ts';
import {SHARED_COMPONENTS} from './../../shared/shared_modules.ts';
let template = require('./component_loader.html');
let styles = require('./component_loader.scss');

@Component({
	selector: 'component-loader',
	inputs: ['loader', 'data', 'config']
})
    
@View({
	styles:[styles],    
	template: template,
	directives: [ComponentConfig]    
})
export class ComponentLoader implements OnInit {
	loader: string;
	data: any;
	config: any;

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
				if (this.data) {
					comp.instance.data = this.data;
					comp.instance.init();
				}
				
			});

	}

}