import { Component, View, OnInit } from 'angular2/core';
import {TextEdit} from './../text_edit/text_edit.ts';
import {SectionStore} from './../../../stores/section_store.ts';
let template = require('./text_block.html');
let styles = require('./text_block.scss');


@Component({
	selector: 'text-block',
	inputs: ['data','sectionComponent']
})
@View({
	template: template,
	styles: [styles],
	directives: [TextEdit]
})	    
export class TextBlock implements OnInit {
	data: any = {};
	sectionComponent: any;
	constructor(
		public sectionStore: SectionStore
	) { }
	init() {
	}
	ngOnInit() {
		console.log(this);
	}
	
	save(data) {
		this.sectionStore.updateComponent(this.sectionComponent._id, data);
	}
}