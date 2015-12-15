import { Component, View } from 'angular2/core';
import { ComponentStore, SectionStore } from './../../../stores/stores_modules.ts';
import {ComponentService} from './../../../services/services_modules';
let template = require('./add_component.html');
let styles = require('./add_component.scss');

@Component({
	selector: 'add-component',
	inputs: ['location'],
	host: {
		"[class.isextended]": "isExtended"
	}
})
@View({
	template: template,
	styles: [styles],
})	    
export class AddComponent {
	components: any;
	isExtended: boolean;
	location: any;
	index: any;
	constructor(
		public sectionStore: SectionStore,
		public componentService: ComponentService,
		public componentStore: ComponentStore
	) {
		this.componentService.getComponents().then(
			res => {
				this.components = res;
			}
		);
	}
	
	addComponent(component) {

		if (this.location && this.location.locationType === 'section') {
			this.sectionStore.addComponent(component, this.location);
		}
	}
	
	ngOnInit() {
		setTimeout(() => {
			this.isExtended = true;
		},300)
	}

}