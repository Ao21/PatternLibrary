import { Component, View, Host } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import {BASE_COMPONENTS} from './../../base/base_modules.ts'
import {SHARED_COMPONENTS} from '../../shared/shared_modules';
import {HoverEdit, DRAGGING_DIRECTIVES} from '../../../directives/directives_modules';
import {ROUTER_DIRECTIVES,Router, RouteParams, CanActivate, OnActivate} from 'angular2/router';

import {UIStore, SectionStore} from './../../../stores/stores_modules.ts'
import {PatternService, SectionService} from './../../../services/services_modules.ts';
let template = require('./section.html');
let styles = require('./section.scss');

@Component({
	selector: 'section'
})
@View({
	template: template,
	styles: [styles],
	directives: [CORE_DIRECTIVES, SHARED_COMPONENTS,BASE_COMPONENTS,DRAGGING_DIRECTIVES, HoverEdit]
})	      
export class Section {
	fakeData: any;
	sections: any;
	section: any = {};
	sub: ISubscriptionDefinition<SectionStore>
	constructor(
		@Host() public router: Router,
		public routeParams: RouteParams,
		public SectionService: SectionService,
		public sectionStore: SectionStore,
		public patternService: PatternService
	) {
		
		this.sectionStore.getSection(this.routeParams.params['url']).subscribe(
			res => {
				this.section = res.json();
			},
			err => {
				this.router.parent.navigate(['./Import'])
			}
		)
		this.fakeData = ['#8DE3FC', '#8DE3FC'];
		this.sub = this.sectionStore.subscribe('section', state=> {
			if (state.get('activeSection')) {
				this.section = state.get('activeSection');
			}
			this.sections = state.get('components');
		})
		
	}
	
	
}
