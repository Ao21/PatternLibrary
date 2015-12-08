import { Component, View } from 'angular2/angular2';
import { PatternService } from './../../../services/services_modules';
let template = require('./add.html');
let styles = require('./add.scss');


@Component({
	selector: 'add'
})
@View({
	template: template,
	styles: [styles],
})	    
export class AddPage {
	constructor(
		public patternService: PatternService
	) { }
	addComponent(url: string) {
		this.patternService.addPatternUrl(url);
	}
}