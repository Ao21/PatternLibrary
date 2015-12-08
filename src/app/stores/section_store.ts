import {Inject, Injectable} 	from 'angular2/angular2';
import {Store, Dispatcher} 		from '../common/common_modules';

let monkey: any = Baobab.monkey;

export class Component {
	name: String;
	type: String;
	data: any;
}

export class Section {
	components: [Component] = [{
		name: 'ColourDisplayer',
		type: 'component',
		data: ['#8DE3FC', '#8DE3FC'],
	}]
}

@Injectable()
export class SectionStore extends Store {
	constructor(
		@Inject(Dispatcher) dispatcher: Dispatcher
	) {
		super(dispatcher, 'SectionStore', new Section());
	}

	addPattern(pattern) {
		var obj = {
			name: pattern.ref,
			type: 'pattern',
			dom:'discount-code'
		}
		var comp = {
			name: 'ColourDisplayer',
			type: 'component',
			data: ['#8DE3FC', '#8DE3FC'],
		}
		this.push(['components'], obj, 'section')
	}

}