import {Inject, Injectable} 	from 'angular2/core';
import {Store, Dispatcher} 		from '../common/common_modules';
import {SectionService} from './../services/services_modules';
import * as Baobab from 'boabab';
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
        component.index = location.index;
        component.position = location.position;
		this.sectionService.addComponent(component).subscribe(
			(res) => {
				this.update('activeSection', res.json(), 'section');
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
			}
		);
	}

	addPattern(pattern, location) {
        pattern.sectionId = location.location._id;
        pattern.index = location.index;
        pattern.position = location.position;
		this.sectionService.addPattern(pattern).subscribe(
			res => {
				this.update('activeSection', res.json(), 'section');
			}
		);
		
	}

}