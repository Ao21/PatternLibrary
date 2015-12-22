import {Inject, Injectable} 	from 'angular2/core';
import {Store, Dispatcher} 		from '../common/common_modules';
import * as Baobab from 'boabab';
let monkey: any = Baobab.monkey;

export class UI { 
	visibility = {
		dropzones: false
	}
	actionBar = {}
}

@Injectable()
export class UIStore extends Store { 
	constructor(
		@Inject(Dispatcher) dispatcher: Dispatcher
	) {
		super(dispatcher, 'UIStore', new UI());
	}
	
	getVisibility(item) {
		return this.select('visibility', item).get();
	}
	setVisibility(item, toggle) {
		this.update(['visibility', item], toggle, item);
	}
}