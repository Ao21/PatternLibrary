import { Component, View } from 'angular2/angular2';
import {BASE_COMPONENTS} from './../../base/base_modules.ts'
import {SHARED_COMPONENTS} from '../../shared/shared_modules';
import {HoverEdit, DRAGGING_DIRECTIVES} from '../../../directives/directives_modules';
import {UIStore, SectionStore} from './../../../stores/stores_modules.ts'
import {PatternService} from './../../../services/services_modules.ts';
let template = require('./section.html');
let styles = require('./section.scss');

@Component({
	selector: 'section'
})
@View({
	template: template,
	styles: [styles],
	directives: [SHARED_COMPONENTS,BASE_COMPONENTS,DRAGGING_DIRECTIVES, HoverEdit]
})	    
export class Section {
	fakeData: any;
	sections: any;
	sub: ISubscriptionDefinition<SectionStore>
	constructor(
		public sectionStore: SectionStore,
		public patternService: PatternService
	) {
		this.fakeData = ['#8DE3FC', '#8DE3FC'];
		this.sub = this.sectionStore.subscribe('section', state=> {
			this.sections = state.get('components');
		})
		
	}
	
	
}
