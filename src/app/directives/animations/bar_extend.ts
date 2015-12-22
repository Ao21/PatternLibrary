import {Directive, ElementRef, OnChanges, OnInit} from 'angular2/core';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

@Directive({
	selector: '[animation-extend-bar]',
	providers: [AnimationBuilder],
	inputs: ['isExtended:animation-extend-bar'],
	host: {
		"(onIsExtended)": "toggleBar($event)"
	}
})
export class AnimateExtendBar implements OnChanges, OnInit {
	isExtended: boolean;
	triggered: boolean = false;
	closeBtn: any;
	tabGroup: any;
	constructor(
		private _el: ElementRef,
		public build: AnimationBuilder
	) {
		this.closeBtn = DOM.querySelector(this._el.nativeElement, '.c-extend-bar__close-btn');
		this.tabGroup = DOM.querySelector(this._el.nativeElement, 'tab-group');
	}

	ngOnInit() {
		//this.triggered = this.isExtended;
	}

	ngOnChanges() {
		//this.toggleBar(this.isExtended);
	}

	// openElement() {
	// 	let animation = this.build.css();
	// 	animation.addClass('open')
	// 		.setDuration(300)
	// 		.start(this._el.nativeElement).onComplete((e) => {
	// 			this.showCloseBtn();
	// 		});
	// }

	// showCloseBtn = () => {
	// 	let animation = this.build.css()
	// 		.addClass('animate-normal')
	// 		.setDuration(300)
	// 	animation.start(this.closeBtn)
	// 	if (this.tabGroup) {
	// 		animation.start(this.tabGroup);
	// 	}

	// 	this.openBar();
	// }

	// openBar = () => {
	// 	let animation = this.build.css();
	// 	animation.removeClass('zero-width');
	// 	animation.setFromStyles({ display: 'block', width: 0, visibility: 'visible' })
	// 	animation.addAnimationClass('full-width');
	// 	animation.setDuration(300);
	// 	animation.setToStyles({ display: 'block', width: '100%' })
	// 	animation.start(DOM.querySelector(this._el.nativeElement, '.c-extend-bar__bar'));

	// }

	// hideCloseBtn = () => {
	// 	let animation = this.build.css()
	// 		.removeClass('animate-normal')
	// 		.addClass('animate-hidden')
	// 		.setDuration(300)
	// 		.setToStyles({ visiblility: 0 })
	// 	if (this.tabGroup) {
	// 		animation.start(this.tabGroup)
	// 	}
	// 	animation.start(this.closeBtn).onComplete(() => {
	// 		this.closeBar();
	// 	})
	// }



	// closeElement = () => {
	// 	let animation = this.build.css();
	// 	animation.removeClass('open')
	// 	animation.addAnimationClass('zero-height')
	// 		.setDuration(300)
	// 		.start(this._el.nativeElement)
	// }


	// closeBar = () => {
	// 	let animation = this.build.css();
	// 	animation.addAnimationClass('zero-width');
	// 	animation.setDuration(550);
	// 	animation.setToStyles({ width: 0, visibility: 'hidden', marginLeft: 0 })
	// 	animation.start(DOM.querySelector(this._el.nativeElement, '.c-extend-bar__bar'))
	// 		.onComplete((e) => {
	// 			this.closeElement();
	// 		});

	// }

	toggleBar(toggle) {
		
		
	}


}
