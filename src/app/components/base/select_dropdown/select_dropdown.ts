import {Component, View, Query, QueryList, OnInit, ElementRef, EventEmitter } from 'angular2/angular2';
import {SelectItem} from './select_item';
let template = require('./select_dropdown.html');
let styles = require('./select_dropdown.scss');

@Component({
	selector: 'select-dropdown',
	providers: [],
	inputs: ['placeholder'],
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
	placeholder: string;
	change  = new EventEmitter();

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
	
	onInit() {
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
}