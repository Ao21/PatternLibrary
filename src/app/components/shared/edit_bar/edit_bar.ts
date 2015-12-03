import { Component, View } from 'angular2/angular2';
let template = require('./edit_bar.html');
let styles = require('./edit_bar.scss');

@Component({
	selector: 'edit-bar',
	host: {
		'[class.isExtended]': 'isExtended'
	}
})
@View({
	template: template,
	styles: [styles],
})	    
export class EditBar {
	isExtended: boolean = false;
	constructor() {
		
	}
	toggleBar(toggle: boolean) {
		this.isExtended = toggle;
	}
}