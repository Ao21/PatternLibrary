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
	
	setActiveSection(section) {
		this.update(['activeSection'], section);
	}
	
	addComponent(component, location) {
		component.sectionId = location.location._id;
		this.sectionService.addComponent(component).subscribe(
			(res) => {
				this.update('activeSection', res.json(), 'section');
				console.log(res.json());
			}
		)
	}
	
	updateComponent(sectionId, data) {
		let obj = {
			sectionId: sectionId,
			data: data
		}
		this.sectionService.updateComponent(obj).subscribe(
			res => {
				this.update('activeSection', res.json(), 'section');
				console.log(res.json());
			}
		);
	}
	
	removeComponent(sectionId) {
		let obj = {
			sectionId: sectionId
		}
		this.sectionService.removeComponent(obj).subscribe(
			res => {
				this.update('activeSection', res.json(), 'section');
				console.log(res.json());
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