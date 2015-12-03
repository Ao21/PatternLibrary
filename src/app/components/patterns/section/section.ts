import { Component, View } from 'angular2/angular2';
import {SHARED_COMPONENTS} from '../../shared/shared_modules';
import {HoverEdit, DRAGGING_DIRECTIVES} from '../../../directives/directives_modules';
import {UIStore} from './../../../stores/stores_modules.ts'
let template = require('./section.html');
let styles = require('./section.scss');

@Component({
	selector: 'section'
})
@View({
	template: template,
	styles: [styles],
	directives: [SHARED_COMPONENTS,DRAGGING_DIRECTIVES, HoverEdit]
})	    
export class Section {
	
	
	
}
