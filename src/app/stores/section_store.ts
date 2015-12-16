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
	activeSection: Section;
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
				//console.log(res.json());
			}
		)
	}
	
	getSection(url) {
		let observable = this.sectionService.get(url);
		observable.subscribe(res=> {
			this.update('activeSection', res.json(),'section');
		})
		return observable;
	}
	
	getSections() {
		
	}
	
	addComponent(component, location) {
		component.sectionId = location.location._id;
		this.sectionService.addComponent(component).subscribe(
			(res) => {
				//console.log(res.json());
			}
		)
	}
	
	updateComponent(componentId, data, sectionId) {
		console.log(componentId, data, sectionId);
		let obj = {
			sectionId: sectionId,
			componentId: componentId,
			data: data
		}
		this.sectionService.updateQuery(obj).subscribe(
			res => {
				console.log(res);
			}
		);
	}

	addPattern(pattern, location) {
		
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
		
		let activeSection = this.get('activeSection');
		if (!this.exists(['activeSection','data'])) {
			this.update(['activeSection', 'data'], [obj]);
		} else {
			this.push(['activeSection', 'data'], obj);
		}
		
		pattern.sectionId = activeSection._id;

		this.sectionService.addPattern(pattern).subscribe(
			res => {
				this.update('activeSection', res.json(), 'section');
			}
		);
		
		//this.push(['components'], obj, 'section')
	}

}