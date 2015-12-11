import { Component, View } from 'angular2/angular2';
import { ComponentStore } from './../../../stores/stores_modules.ts';
let template = require('./add_component.html');
let styles = require('./add_component.scss');

@Component({
	selector: 'add-component',
	host: {
		"[class.isextended]":"isExtended"
	}
})
@View({
	template: template,
	styles: [styles],
})	    
export class AddComponent {
	components: any;
	constructor(
		public componentStore: ComponentStore
	) {
		this.components = this.componentStore.get('components');
	}

}