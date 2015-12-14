import {Inject, Injectable} from 'angular2/core';
import {Store, Dispatcher} from '../common/common_modules';
let monkey: any = Baobab.monkey;

export class Component {
	ref: string;
	data: any;
}

export class DefaultComponents {
	components = [
		{ ref: 'ColourDisplayer', type: 'component'},
		{ ref: 'comments', type: 'component' },
		{ ref: 'html-view', type: 'component' },
		{ ref: 'historical-view', type: 'component' },
		{ ref: 'font-displayer', type: 'component' },
		
		
	]
}

@Injectable()
export class ComponentStore extends Store {
	constructor(
		@Inject(Dispatcher) dispatcher: Dispatcher
	) {
		super(dispatcher, 'ComponentStore', new DefaultComponents());
	}
	
	addDefaultComponents() {
		
	}
}