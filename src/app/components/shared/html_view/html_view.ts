import { Component, View, ElementRef } from 'angular2/angular2';
import { Tab, TabsGroup } from '../../base/base_modules';
import { DOM } from 'angular2/src/core/dom/dom_adapter';
let template = require('./html_view.html');
let styles = require('./html_view.scss');

/*
	<html-view></html-view>
*/
@Component({
	selector: 'html-view'
})
@View({
	template: template,
	styles: [styles],
	directives: [Tab, TabsGroup]
})
export class HTMLView {
	constructor(
		private _el: ElementRef
	) {}
	clickToCopy() {
		console.log(DOM.querySelector(this._el.nativeElement,'.content .selected code').innerText);
	}
}