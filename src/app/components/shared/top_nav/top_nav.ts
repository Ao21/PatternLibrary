import { Component, View } from 'angular2/angular2';

let template = require('./top_nav.html');
let styles = require('./top_nav.scss');

@Component({
	selector: 'top-nav'
})
@View({
	template: template,
	styles: [styles],
})	    
export class TopNav {
	
}