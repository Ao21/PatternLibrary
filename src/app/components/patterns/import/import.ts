import { Component, View } from 'angular2/angular2';
let template = require('./import.html');
let styles = require('./import.scss');

@Component({
	selector: 'import'
})
@View({
	template: template,
	styles: [styles],
})	    
export class ImportPage {
	
}