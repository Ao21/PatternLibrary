import { Component, View, NgStyle } from 'angular2/angular2';
let template = require('./colour_displayer.html');
let styles = require('./colour_displayer.scss');

@Component({
	selector: 'colour-displayer',
	inputs: ['colours']
})
@View({
	template: template,
	styles: [styles],
	directives: [NgStyle]
})	    
export class ColourDisplayer  {
	colours: any;
	colourName: string;
	colourHex: string;
	colourRGB: any;
	constructor() {
		this.colours = ['#FC8D8D', '#8DE3FC'];
		this.colours = _.map(this.colours,(col:any)=>{
			col = new Colors({ color: col });
			console.log(col);
			let nCol = {
				name: '$ColourName',
				hex: '#' + col.colors.HEX,
				rgb: col.colors.RND.rgb,
				rgba: col.colors.rgbaMixWhite,
				hsv: col.colors.RND.hsv,
				web: col.colors.webSave
			}
			return nCol
		});
	}
	selectColour(colour) {
		this.colourName= colour.name;
		this.colourHex= colour.hex;
		this.colourRGB= colour.rgb;
	}
	displayCopied() {
		//	TODO: Create a notification system
	}
}