import { Component, View } from 'angular2/core';
let template = require('./placeholder_component.html');

@Component({
	selector: 'place-holder'
})
@View({
	template: template,
	styles: [],
})	    
export class PlaceHolder {
	constructor(){}
}