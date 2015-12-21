import { Component, View, EventEmitter, OnInit, OnDestroy } from 'angular2/core';
import { Tab, TabsGroup} from './../../base/tab/tab_modules.ts';
import {AddPattern} from './../add_pattern/add_pattern.ts';
import {AddComponent} from './../add_component/add_component';
import {UIStore} from './../../../stores/stores_modules.ts';

let template = require('./edit_bar.html');
let styles = require('./edit_bar.scss');

/*
	<edit-bar></edit-bar>
	<any hover-edit></any>
*/
@Component({
	selector: 'edit-bar',
	inputs: ['index', 'location', 'isExtended', 'sectionComponent:section-component'],
	outputs: ['onIsExtended'],
	host: {
		'[class.c-extend-bar]': 'true',
		'[class.isExtended]': 'isExtended'
	}
})
@View({
	template: template,
	styles: [styles],
	directives: [AddPattern, TabsGroup, Tab, AddComponent]
})
export class EditBar implements OnInit {
	onIsExtended: EventEmitter<any> = new EventEmitter();
	location: any;
	sectionComponent: any;
	isExtended: boolean = false;
	index: any;
	constructor(
		public uiStore: UIStore
	) {


	}
	toggleBar(toggle: boolean) {
		this.isExtended = toggle;
		this.onIsExtended.emit(toggle);
		if (!toggle) {
			this.uiStore.update(['actionBar', this.sectionComponent._id, 'editBar'], false, 'actionBar');
		}
	}

	ngOnInit() {
		if (this.sectionComponent) {
			this.uiStore.update(['actionBar', this.sectionComponent._id, 'editBar'], false, 'actionBar');
			this.uiStore.subscribe('actionBar', state=> {
				var a = state.get(['actionBar', this.sectionComponent._id, 'editBar']);
				if (a) {
					this.toggleBar(a);
				}
			})
		}

    }
}



