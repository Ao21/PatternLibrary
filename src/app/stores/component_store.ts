import {Inject, Injectable} from 'angular2/angular2';
import {Store, Dispatcher} from '../common/common_modules';
let monkey: any = Baobab.monkey;

export class Component {
}

@Injectable()
export class ComponentStore extends Store {
	constructor(
		@Inject(Dispatcher) dispatcher: Dispatcher
	) {
		super(dispatcher, 'ComponentStore', new Component());
	}
}