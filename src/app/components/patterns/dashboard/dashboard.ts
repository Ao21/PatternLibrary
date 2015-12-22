import { Component, View } from 'angular2/core';
let template = require('./dashboard.html');
let styles = require('./dashboard.css');
import {CloseBtn, MagGlass } from '../../icons/icons_modules';

@Component({
	selector: 'dashboard'
})
@View({
	template: template,
	styles: [styles],
	directives: [CloseBtn, MagGlass]
})	    
export class Dashboard  {

}