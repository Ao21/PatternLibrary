import { Component, Inject, View, Optional, Host, forwardRef } from 'angular2/core';
import {SelectDropdown} from './select_dropdown_modules';
let template = require('./select_item.html');
let styles = require('./select_item.css');

@Component({
	selector: 'select-item',
	inputs: ['value'],
	host: {
		'(click)':'close()',
		'[class.checked]':'checked'
	}
})
@View({
	template: template,
	styles: [styles],
})	    
export class SelectItem {
	private checked_: boolean = false;
	private id_: string;
	private disabled_: boolean = false;
	constructor(
		@Host() @Inject(forwardRef(() => SelectDropdown)) public selectDropdown: SelectDropdown
	) { 
		this.id_ = 'selectItem-' + this.selectDropdown.register();
		this.disabled_ = this.selectDropdown.disabled;
		//electDropdown.updateValue('any');
	}
	
	set checked(value) {
		this.checked_ = value;
	}
	
	get checked() {
		return this.checked_;
	}
	
	get id() {
		return this.id_;
	}

	
	select() {
		if (this.disabled_) {
			return;
		}
		this.selectDropdown.updateValue(this.id_);
	}

	close() {
		this.selectDropdown.toggleMenu(false)
	}
}