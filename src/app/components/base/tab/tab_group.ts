import {
Component,
View,
ViewEncapsulation,
Host,
Inject,
SkipSelf,
Attribute,
Optional,
OnChanges,
OnInit,
EventEmitter,
} from 'angular2/core';

import {FORM_DIRECTIVES,NgFor,NgFormControl} from 'angular2/common'

import {isPresent, isBlank, StringWrapper, NumberWrapper} from 'angular2/src/facade/lang';
import {ObservableWrapper} from 'angular2/src/facade/async';
import {Event, KeyboardEvent} from 'angular2/src/facade/browser';

import {TabsDispatcher} from './tab_dispatcher';
import {Tab} from './tab';

var _uniqueIdCounter: number = 0;
let template = require('./tab_group.html');


@Component({
	selector: 'tab-group',
	outputs: ['change'],
	inputs: ['disabled', 'value'],
	host: {
		'[attr.aria-disabled]': 'disabled',
		'[attr.aria-activedescendant]': 'activedescendant',
	},
	providers: [TabsDispatcher]
})

@View({
	template: template,
	directives: [NgFor]
})

export class TabsGroup {
	value: any;
	_name: string;
	_tabs: Tab[];
	activeDescendent: any;
	_disabled: boolean;
	selectedTabId: string;
	change: EventEmitter<any> = new EventEmitter();
	tabindex: number;
	
	constructor(
		@Attribute('tabindex') tabindex: string,
		@Attribute('disabled') disabled: string,
		public tabsDispatcher: TabsDispatcher
	){
		this._name = `tabs-group-${_uniqueIdCounter++}`;
		this._tabs = [];
		this.selectedTabId = '';
		this._disabled = false;
		
		this.disabled = isPresent(disabled);
		this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
		
	}
	
	getName(): string {
		return this._name;
	}
	
	get disabled() {
		return this._disabled;
	}

	set disabled(value) {
		this._disabled = isPresent(value) && value !== false;
	}
	
	get tabs() {
		return this._tabs;
	}
	
	select(tab: Tab){
		this.disabled = isPresent(this.disabled) && this.disabled !== false;
		if(isPresent(tab.value) && tab.value != ''){
			this.tabsDispatcher.notify(this._name);
			this._tabs.forEach(_tab => {
				if (_tab.value == tab.value) {
					_tab.isSelected = true;
					this.selectedTabId = _tab.id;
					this.activeDescendent = _tab.id;

				}
			})
		}
	}
	
	updateValue(tab: Tab) {
		this.selectedTabId = tab.id;
		this.activeDescendent = tab.id;
		ObservableWrapper.callNext(this.change, null);
	}
	
	register(tab: Tab) {
		this._tabs.push(tab);
	}
	
	
}