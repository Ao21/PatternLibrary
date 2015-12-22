import { Component, View } from 'angular2/core';
let template = require('./font_displayer.html');
let styles = require('./font_displayer.css');

/*	
 *	Font Displayer
 *	<colour-displayer></colour-displayer>
 */

@Component({
	selector: 'font-displayer',
	inputs: ['data']
})
@View({
	template: template,
	styles: [styles],
})	    
export class FontDisplayer {

}