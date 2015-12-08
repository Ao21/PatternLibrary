import { Component, View } from 'angular2/angular2';
import {AddPattern} from './../add_pattern/add_pattern.ts';
let template = require('./edit_bar.html');
let styles = require('./edit_bar.scss');

/*
	<edit-bar></edit-bar>
	<any hover-edit></any>
*/
@Component({
	selector: 'edit-bar',
	host: {
		'[class.isExtended]': 'isExtended'
	}
})
@View({
	template: template,
	styles: [styles],
	directives: [AddPattern]
})	    
export class EditBar {
	isExtended: boolean = false;
	constructor() {
		
	}
	toggleBar(toggle: boolean) {
		this.isExtended = toggle;
	}
}