import { Component, View, OnInit, ElementRef } from 'angular2/core';
import {NgStyle} from 'angular2/common';
import { UIStore } from './../../../stores/stores_modules.ts'
let template = require('./colour_displayer.html');
let styles = require('./colour_displayer.scss');

/*	
 *	Colour Displayer
 *	<colour-displayer></colour-displayer>
 */

@Component({
	selector: 'colour-displayer',
	inputs: ['data']
})
@View({
	template: template,
	styles: [styles],
	directives: [NgStyle]
})	    
export class ColourDisplayer implements OnInit {
	data: any = null;
	colours: any;
	colourName: string;
	colourHex: string;
	colourRGB: any;
	contentRef: ElementRef;
	
	constructor(
		public uiStore: UIStore
	) {
		//this.data = null;
		
	}
	
	ngOnInit() {
		this.init();
	}
	
	init() {
		this.colours = this.data ? this.data : ['#333'];
		this.colours = _.map(this.colours,(col:any)=>{
			col = new Colors({ color: col });
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