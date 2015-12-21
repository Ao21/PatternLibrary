import { Component, ElementRef, View, OnInit } from 'angular2/core';
import {UIStore, SectionStore} from './../../../stores/stores_modules.ts';
import {AnimationBuilder} from 'angular2/animate';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
let template = require('./action_bar.html');
let styles = require('./action_bar.scss');

@Component({
	selector: 'action-bar',
	inputs: ['sectionComponent:section-component'],
	host: {
		'[class.isVisible]': 'isVisible',
		'[class.isExtended]':'isActionVisible'
	}
})
@View({
	template: template,
	styles: [styles],
})
export class ActionBar implements OnInit {
	sectionComponent: any;
	actions: any = [];
	isVisible: any;
	isActionVisible: any = false;
	class;
	constructor(
		public sectionStore: SectionStore,
		public el: ElementRef,
		public build: AnimationBuilder,
		public uiStore: UIStore
	) {
	}

    ngOnInit() {
        if (this.sectionComponent) {
			this.uiStore.subscribe('actionBar', state=> {
				this.actions = [];
                let vis = false;
                _.forIn(state.get(['actionBar', this.sectionComponent._id]), (value, key) => {
                    vis = value;
					let obj = {};
					obj['type'] = key;
					obj['value'] = value;
					this.actions.push(obj)
                });
				this.isVisible = !vis;
			})
		}
	}

	trigger(action) {
		this.uiStore.update(['actionBar', this.sectionComponent._id, action.type], true, 'actionBar');
		this.isVisible = false;
		this.toggleActionButtons();
	}

	toggleActionButtons() {
		let buttons = DOM.querySelector(this.el.nativeElement, '.buttons');
		if (!this.isActionVisible) {
			this.build.css()
				.removeClass('hiding')    
				.addClass('extending')
				.setDuration(600)
				.start(buttons)

		} else {
			this.build.css()
				.addClass('hiding')
				.setDuration(900)
				.start(buttons)
				.onComplete(e=> {
					//DOM.removeClass(buttons, 'extending');
				})
		}
		this.isActionVisible = !this.isActionVisible;

	}
	
	delete() {
		this.sectionStore.removeComponent(this.sectionComponent._id);
	}
}