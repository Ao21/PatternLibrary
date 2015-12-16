import { Component, View, OnInit, DynamicComponentLoader, Injector, provide, Renderer, ElementRef, ComponentRef } from 'angular2/core';
import {ObservableWrapper, Promise, PromiseWrapper} from 'angular2/src/facade/async';
import { Http } from 'angular2/http';
import {ComponentConfig} from './../../shared/component_config/component_config.ts';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

import * as BaseModules from './../base_modules.ts';
import {SHARED_COMPONENTS} from './../../shared/shared_modules.ts';
let template = require('./component_loader.html');
let styles = require('./component_loader.scss');

@Component({
	selector: 'component-loader',
	inputs: ['loader', 'data', 'config','section']
})
    
@View({
	styles:[styles],    
	template: template,
	directives: [ComponentConfig]    
})
export class ComponentLoader implements OnInit {
	loader: string;
	data: any;
	section: any;
	isConfigRequired: boolean = false;
	component: any;
	config: any;
	height: string;

	constructor(
		private _dComponentLoader: DynamicComponentLoader,
		private _renderer: Renderer,
		private _el: ElementRef,
		public http: Http

	) { }


	ngOnInit() {
		let comp = _.find(SHARED_COMPONENTS, (e) => {
			return e.name === this.section.component.ref;
		})
		

		if (!comp) {
			return
		}

		return this._dComponentLoader.loadIntoLocation(comp, this._el, 'child')
			.then((comp: any) => {
				this.height = DOM.getProperty(comp.location.nativeElement, 'offsetHeight') + 30;
				if (this.section.data) {
					comp.instance.data = this.section.data;
					comp.instance.init();
				} else {
					this.isConfigRequired = true;
				}
				
			});

	}

}