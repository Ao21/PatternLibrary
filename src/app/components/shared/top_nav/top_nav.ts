import { Component, View } from 'angular2/core';

let template = require('./top_nav.html');
let styles = require('./top_nav.css');

@Component({
	selector: 'top-nav'
})
@View({
	template: template,
	styles: [styles],
})	    
export class TopNav {
	
}