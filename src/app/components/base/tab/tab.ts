import {Component, View, Inject, NgClass, NgIf, NgControl, EventEmitter, Attribute, OnInit, Renderer, ElementRef} from 'angular2/angular2';
import {Optional, SkipSelf, Host} from 'angular2/angular2'
import {FORM_DIRECTIVES, CORE_DIRECTIVES, NgFormModel} from 'angular2/angular2';
import {NumberWrapper} from 'angular2/src/facade/lang';
import {isPresent} from 'angular2/src/facade/lang';

import {TabsGroup} from './tab_group';
import {TabsDispatcher} from './tab_dispatcher';

var _uniqueIdCounter: number = 0;
let template = require('./tab.html');

@Component({
	selector: 'tab',
	inputs: ['id', 'name', 'selected', 'disabled', 'value',],
	host: {
		'[id]': 'id',
		'[tabindex]': 'tabindex',
		'[class.selected]': 'isSelected',
		'[attr.aria-disabled]': 'disabled'
	}


})
@View({
	template: template,
	directives: []
})

export class Tab implements OnInit {
	isSelected: boolean;
	id: string;
	selected: any;
	value: any;
	name: string;
	_disabled: boolean;
	tabindex: number;

	constructor(
		@Optional() @SkipSelf() @Host() public tabsGroup: TabsGroup,
		@Attribute('id') id: string,
		@Attribute('selected') selected: string,
		@Attribute('tabindex') tabindex: string,
		public tabsDispatcher: TabsDispatcher
	) {
		this.value = null;
		this.isSelected = false;
		this.id = isPresent(id) ? id : `tab-${_uniqueIdCounter++}`;

		tabsDispatcher.listen((name) => {
			if (name == this.name) {
				this.isSelected = false;
			}
		})

		if (isPresent(tabsGroup)) {
			this.name = tabsGroup.getName();
			this.tabsGroup.register(this);
		}

		if (!isPresent(tabsGroup)) {
			this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
		} else {
			this.tabindex = -1;
		}
		
		if(isPresent(selected)){
			this.isSelected = true;
			this.tabsGroup.updateValue(this);
		}
		
		
	}

	onInit(): void {
		if (isPresent(this.tabsGroup)) {
			this.name = this.tabsGroup.getName();
		}

	}
	
	isDisabled(): boolean {
		return this.disabled || (isPresent(this.tabsGroup) && this.tabsGroup.disabled);
	}

	get disabled(): boolean {
		return this._disabled;
	}

	set disabled(value: boolean) {
		this._disabled = isPresent(value) && value !== false;
	}
	

}