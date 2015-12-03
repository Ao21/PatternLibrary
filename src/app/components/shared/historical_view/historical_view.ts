import { Component, View } from 'angular2/angular2';
let template = require('./historical_view.html');
let styles = require('./historical_view.scss');


let fakeDate = [
	{ name: '1', size: '0' },
	{ name: '1.2', size: '0' },
	{ name: '1.3', size: '1' },
	{ name: '1.4', size: '0' },
	{ name: '2', size: '2' },
	{ name: '2.1', size: '0' },
]

@Component({
	selector: 'historical-view'
})
@View({
	template: template,
	styles: [styles],
})	    
export class HistoricalView {
	data: any;
	
	constructor() {
		this.data = fakeDate;
	}
}