import { Component, View, Host } from 'angular2/core';
import { CORE_DIRECTIVES } from 'angular2/common';
import {BASE_COMPONENTS} from './../../base/base_modules'
import {SHARED_COMPONENTS} from '../../shared/shared_modules';
import {HoverEdit, DRAGGING_DIRECTIVES} from '../../../directives/directives_modules';
import {ROUTER_DIRECTIVES,Router, RouteParams, CanActivate, OnActivate} from 'angular2/router';

import {UIStore, SectionStore} from './../../../stores/stores_modules'
import {PatternService, SectionService} from './../../../services/services_modules';
import {OrderBy} from './../../../pipes/orderBy';

let template = require('./section.html');
let styles = require('./section.css');

@Component({
	selector: 'section'
})
@View({
	template: template,
	styles: [styles],
    directives: [CORE_DIRECTIVES, SHARED_COMPONENTS, BASE_COMPONENTS, DRAGGING_DIRECTIVES, HoverEdit],
    pipes: [OrderBy]
})	      
export class Section {
	fakeData: any;
	sections: any;
	section: any = {};
	sectionData: any = [];
	
	sub: ISubscriptionDefinition<SectionStore>
	constructor(
		@Host() public router: Router,
        public routeParams: RouteParams,
        public uiStore: UIStore,
		public SectionService: SectionService,
		public sectionStore: SectionStore,
		public patternService: PatternService
	) {
		
		this.sectionStore.getSection(this.routeParams.params['url']).subscribe(
			res => {
				this.section = res.json();
                this.sectionData = this.section.data;
				this.sectionStore.setActiveSection(this.section);
				this.subscribe();
			},
			err => {
				this.router.parent.navigate(['./Import'])
			}
		)
		this.fakeData = ['#8DE3FC', '#8DE3FC'];
		
		
	}
	
	subscribe() {
		this.sub = this.sectionStore.subscribe('section', state=> {
			//console.log(state.get());
			// if (state.get('activeSection')) {
			// 	//this.section = state.get('activeSection');

            this.sectionData = state.get(['activeSection', 'data']);
            // this.uiStore.emitUpdate('actionBar');
				
			// }
		})
	}
	
	
}
