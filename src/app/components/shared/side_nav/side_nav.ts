import { Component, View } from 'angular2/core';
let template = require('./side_nav.html');
let styles = require('./side_nav.scss');

@Component({
	selector: 'side-nav',
	host: {
		"[class.open]": 'isOpen'
	}
})
@View({
	template: template,
	styles: [styles],
})	    
export class SideNav {
	isOpen: boolean = false;
	
	toggleOpen(toggle) {
		this.isOpen = toggle;
	}
	
}