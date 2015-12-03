import { Component, View } from 'angular2/angular2';
let template = require('./dashboard.html');
let styles = require('./dashboard.scss');
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