import {Directive, ElementRef, OnChanges} from 'angular2/core';
import {AnimationBuilder} from 'angular2/src/animate/animation_builder';

@Directive({
	selector: '[animate-in]',
	providers: [AnimationBuilder],
	inputs: ['isVisible:animate-in']
})
export class AnimateIn implements OnChanges{
	isVisible: boolean;
	constructor(
		public el: ElementRef,
		public build: AnimationBuilder
	) {
		let animation = build.css();
	}
	
	ngOnChanges() {
		if (this.isVisible) {
			this.makeVisible()
		} else {
			this.makeInvisible();
		}
	}
	
	makeVisible() {
		let animation = this.build.css();
		animation.setFromStyles({ height: 0, visibility: 'hidden', display: 'block' });
		animation.setDelay(300);
		animation.setDuration(300);
		animation.setToStyles({ height: 'auto', visibility: 'visible', display: 'block' })
		animation.start(this.el.nativeElement)
	}
	
	makeInvisible() {
		let animation = this.build.css();
		animation.setDelay(0);
		animation.setDuration(0);
		animation.setFromStyles({ height: 0, visibility: 'hidden', display: 'none' });
		animation.start(this.el.nativeElement)
	}
	

}
