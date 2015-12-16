import { Component, View,Host,ElementRef, Attribute } from 'angular2/core';
import {NgFor} from 'angular2/common';


import {Query, QueryList} from 'angular2/core';

import {AutoComplete} from './autocomplete';

let template = require('./autocomplete_option.html');
let styles = require('./autocomplete_option.scss');

@Component({
	selector: 'autocomplete-option',
	inputs: ['value','display'],
	host: {
		"(input)": "onInput"
	}
})

@View({
	template: template,
	styles: [styles],
})

export class AutocompleteOption {
	value: any;
	display: any;
	el: any;
	isSelected: boolean = false;
	
	constructor(
		@Host() autocomplete: AutoComplete,
		el: ElementRef,
		@Attribute('value') value: string) {
			this.value = value;
			this.el = el;
			autocomplete.registerOption(this);
	}
}