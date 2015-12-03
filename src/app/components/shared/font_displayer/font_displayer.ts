import { Component, View } from 'angular2/angular2';
let template = require('./font_displayer.html');
let styles = require('./font_displayer.scss');

@Component({
	selector: 'font-displayer',
	inputs: ['fonts']
})
@View({
	template: template,
	styles: [styles],
})	    
export class FontDisplayer {

}