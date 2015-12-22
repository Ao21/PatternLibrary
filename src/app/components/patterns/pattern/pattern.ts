import { Component, View } from 'angular2/core';
import {RouteParams, Router, OnActivate} from 'angular2/router';
import {PatternService} from './../../../services/services_modules';
import {BASE_COMPONENTS } from '../../../components/base/base_modules';
import {SHARED_COMPONENTS } from '../../../components/shared/shared_modules';

let template = require('./pattern.html');
let styles = require('./pattern.css');

@Component({
	selector: 'pattern-page'
})
@View({
	template: template,
	styles: [styles],
	directives: [BASE_COMPONENTS, SHARED_COMPONENTS]
})	    
export class PatternPage implements OnActivate {
	pattern: any;
	params: any;
	constructor(
		public router: Router,
		public patternService: PatternService,
		routeParams: RouteParams
	) {
		this.params = routeParams.params;
		this.patternService.getPatterns().then(() => {
				let pattern = this.patternService.patternsDict[this.params['pattern']];
			if (pattern) {
                this.pattern = pattern;
			} else {
				this.router.navigateByUrl('/');
			}
		})
		
	}	
	
	routerOnActivate() {
		
	}
}