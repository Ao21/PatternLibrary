import { ElementRef,Optional, Component, View,Host, EventEmitter, OnInit, Attribute } from 'angular2/core';
import { Control, NgFormModel, NgFor, NgIf, FORM_DIRECTIVES, ControlGroup } from 'angular2/common';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {Query, QueryList} from 'angular2/core';
import {AutocompleteOption} from '././autocomplete_option';

import {FilterPipe} from './../../../pipes/filter';

import {AutoCompleteService}from './../../../services/services_modules';

let template = require('./autocomplete.html');
let styles = require('./autocomplete.css');


@Component({
	selector: 'auto-complete',
	inputs: ['placeholder', 'controlPath','control', 'disabled','datasource'],
	outputs: ['blur'],
	host: {
		
	}
})

@View({
	template: template,
	styles: [styles],
	directives: [NgIf, NgFor, FORM_DIRECTIVES],
	pipes: [FilterPipe],
})

export class AutoComplete implements OnInit {
	datasource: any;
	options: any[];
	filteredOptions: any[];
	filter: any;
	formDir;
	value: any = '';
	controlPath: string;
	control: any;
	isVisible: boolean = false;
	isSet: boolean = false;
	blur: EventEmitter<any> = new EventEmitter();
    

	constructor(
		public autoCompleteService: AutoCompleteService,
		@Optional() @Host() formDir: NgFormModel,
		@Query(AutocompleteOption) autocompleteOptions: QueryList<AutocompleteOption>,
		public el: ElementRef

	) {
		this.formDir = formDir; 
		this.options = [];
		this.filter = { 'display': '*' };
		
	}
	
	ngOnInit() {
		
		
		if (this.formDir) {
			this.control = this.formDir.form.controls[this.controlPath];
		}
		this.control.default = '';
		
		if (this.datasource) {
			this.autoCompleteService.search(this.datasource).subscribe(
				res => {
					this.options = _.map(res.json(), (e:any) => {
						return {
								display: e.name,
								value: e.ref
							}
						
					})
					
				}
			)
		}

		if(this.control.value!=''){
			this.setByControl()
		}
	}

	onInput(e) {
		if (e.value === "") {
			this.filter = { 'display': '*' }
		}
		this.filter = { 'display': e.target.value }
		this.isVisible = true;
		
		this.isResultsVisible(true);
		this.checkInput(e.target.value);
		this.isResultMatch(e);
		
		

	}


	select(event: any, option: any) {
		this.updatevalue(option)

	}
	
	setByControl() {
		var option = _.findWhere(this.options, {value:this.control.value});
		if(option){
			this.updatevalue(option)
		}
	}
	isResultMatch(e) {
		var option = _.findWhere(this.options, { display: e.target.value });
		if (option) {
			this.updatevalue(option)
		}
	}
	
	checkInput(input) {
		this.control.updateValue(input);
	}
	
	updatevalue(option) {
		this.isVisible = false;
		this.control.default = option.value;
		this.control.updateValue(option.value);
		//this.control.updateValueAndValidity()
		//this.control.updateValue(option.value);
		this.value = option.display;
		this.isSet = true;
		DOM.setValue(DOM.querySelector(this.el.nativeElement, 'input'), option.display);
	}
	
	isResultsVisible(toggle){
		this.isVisible = toggle ? toggle : !this.isVisible;
	}

	onResultKeyPress(event: any, option: any) {
		event.preventDefault();
		if (event.which == 38 && this.isVisible) {
			var lastSibling: any = document.activeElement.previousElementSibling;
			if (lastSibling) {
				lastSibling.focus();
				lastSibling.scrollIntoView();

			}

		}
		else if (event.which == 40 && this.isVisible) {
			var nextSibling: any = document.activeElement.nextElementSibling;
			if (nextSibling) {
				nextSibling.focus();
				nextSibling.scrollIntoView();
			}

		} else if (event.which == 13 && this.isVisible) {
			this.el.nativeElement.querySelector('input').focus();
		}
	}

	onKeyPress(event: any) {
		if (event.target.value === "") {
			this.isVisible = false;
			return;
		}
		if (event.which == 38 && this.isVisible) {
			event.preventDefault();
			var lastChild = this.el.nativeElement.querySelector('.results').lastElementChild;
			lastChild.focus();
			return;
		}

		if (event.which == 40  && this.isVisible) {
			event.preventDefault();
			var firstChild = this.el.nativeElement.querySelector('.results button');
			firstChild.focus();
			return;
		}
	}

	registerOption(option: any) {
		this.options.push(option);
	}
	
	onBlur(event: Event) {
		this.blur.next(event);
	}
}