import {Inject, Injectable} 	from 'angular2/core';
import {Store, Dispatcher} 		from '../common/common_modules';
import {SectionService} from './../services/services_modules';

let monkey: any = Baobab.monkey;

export class Component {
	ref: String;
	type: String;
	data: any;
}

export class Section {
	components: [Component] = [{
		ref: 'ColourDisplayer',
		type: 'component',
		data: ['#8DE3FC', '#8DE3FC'],
	}]
}

@Injectable()
export class SectionStore extends Store {
	constructor(
		@Inject(SectionService) public sectionService: SectionService,
		@Inject(Dispatcher) dispatcher: Dispatcher
	) {
		super(dispatcher, 'SectionStore', new Section());
		this.sectionService.getAll().subscribe(
			res => {
				console.log(res);
			}
		)
	}
	
	getSections() {
		
	}

	addPattern(pattern) {
		var obj = {
			ref: pattern.ref,
			type: 'pattern',
			dom:'discount-code'
		}
		var comp = {
			ref: 'ColourDisplayer',
			type: 'component',
			data: ['#8DE3FC', '#8DE3FC'],
		}
		this.push(['components'], obj, 'section')
	}

}