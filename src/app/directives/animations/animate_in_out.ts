import {Directive, ElementRef} from 'angular2/core';
import {AnimationBuilder, Animation, BrowserDetails} from 'angular2/animate';

@Directive({
	selector: '[animate-inout]',
	providers: [AnimationBuilder],
	host: {
		"(mouseover)": "hoverOver()",
		"(mouseout)":"hoverOut()"
	}
})
export class AnimateInOut{
	constructor(
		public el: ElementRef,
		browserDetails: BrowserDetails,
		public build: AnimationBuilder
	) {
		let animation = build.css();
	}
	
	hoverOver() {
		let animation = this.build.css();
		animation.removeClass('ng-exit');
		animation.addClass('ng-enter');
		animation.addAnimationClass('ng-animate');
		animation.setDuration(300);
		animation.setToStyles({opacity:1})
		animation.start(this.el.nativeElement).onComplete(() => {
		})
	}
	
	hoverOut() {
		let animation= this.build.css();
		animation.removeClass('ng-enter');
		animation.addAnimationClass('ng-exit');
		animation.setDuration(300);
		animation.setToStyles({opacity:0})
		animation.start(this.el.nativeElement).onComplete(() => {
			
		})
	}
}
