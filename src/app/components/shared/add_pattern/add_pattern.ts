import { Component, View, OnInit } from 'angular2/core';
import {PatternService} from './../../../services/pattern_service.ts';
import {SectionStore} from './../../../stores/stores_modules';
let template = require('./add_pattern.html');
let styles = require('./add_pattern.scss');

@Component({
	selector: 'add-pattern',
	inputs: ['index','location'],
	host: {
		"[class.isextended]":"isExtended"
	}
})
@View({
	template: template,
	styles: [styles],
	
})	    
export class AddPattern implements OnInit {
	patterns: any;
	isExtended: boolean;
	index: any;
	constructor(
		public patternService: PatternService,
		public sectionStore: SectionStore
	) {
		this.patternService.getPatterns().then((patterns) => {
			this.patterns = patterns;
		});
	}
	
	addPattern(pattern, location) {
		this.sectionStore.addPattern(pattern, this.index);
	}
	
	ngOnInit() {
		setTimeout(() => {
			this.isExtended = true;
		},300)
	}
    
}