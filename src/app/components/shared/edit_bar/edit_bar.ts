import { Component, View } from 'angular2/core';
import { Tab, TabsGroup} from './../../base/tab/tab_modules.ts';
import {AddPattern} from './../add_pattern/add_pattern.ts';
import {AddComponent} from './../add_component/add_component';
let template = require('./edit_bar.html');
let styles = require('./edit_bar.scss');

/*
	<edit-bar></edit-bar>
	<any hover-edit></any>
*/
@Component({
	selector: 'edit-bar',
	inputs: ['index','location'],
	host: {
		'[class.c-extend-bar]':'true',
		'[class.isExtended]': 'isExtended'
	}
})
@View({
	template: template,
	styles: [styles],
	directives: [AddPattern, TabsGroup, Tab, AddComponent]
})	    
export class EditBar {
	location: any;
	isExtended: boolean = false;
	index: any;
	constructor() {
		
	}
	toggleBar(toggle: boolean) {

		this.isExtended = toggle;
	}
}