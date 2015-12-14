import {Component, View, Query, QueryList, OnInit, ElementRef, EventEmitter } from 'angular2/core';
import {SelectItem} from './select_item';
let template = require('./select_dropdown.html');
let styles = require('./select_dropdown.scss');

@Component({
	selector: 'select-dropdown',
	providers: [],
	inputs: ['placeholder', 'isMenuVisible'],
	outputs: ['change']
})
@View({
	template: template,
	styles: [styles],
	directives: []
})
export class SelectDropdown implements OnInit {
	selectItems: any = [];
	value: string;
	isMenuVisible: boolean;
	placeholder: string;
	toggle: boolean;
	change = new EventEmitter();

	private _selectItemIdCount: number = 0;
	private _disabled: boolean;


	constructor(
		@Query(SelectItem) public selectItemsQuery: QueryList<SelectItem>,
		public el: ElementRef
	) {
		this.selectItemsQuery.changes.subscribe(
			res=> {
				this.selectItems = res.toArray();
			}
		)

	}

	get disabled() {
		return this._disabled;
	}

	ngOnInit() {
		this.value = this.placeholder ? this.placeholder : 'Select';
	}

	register() {
		return this._selectItemIdCount++;
	}

	updateValue(value) {
		_.forEach(this.selectItems, (item) => {
			item.checked = false;
			if (item.id === value) {
				this.change.next(item.value);
				this.value = item.value;
				item.checked = true;
			}
		})
	}
	toggleMenu(toggle?: boolean) {

		this.isMenuVisible = toggle ? toggle : !this.isMenuVisible;
	}
}