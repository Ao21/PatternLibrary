import {Directive, ElementRef} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import * as Rx from '@reactivex/rxjs';


@Directive({
	selector: '[hover-edit]'
})

export class HoverEdit {
	timeout: any;
	constructor(
		private _el: ElementRef
	) {
		(<any>Rx).Observable.fromEvent(this._el.nativeElement, 'mouseover').subscribe(e=> {
			DOM.addClass(this._el.nativeElement.previousElementSibling, 'isVisible');
			if (this.timeout) {
				clearTimeout(this.timeout);
			}
		
		});
		
		(<any>Rx).Observable.fromEvent(this._el.nativeElement.previousElementSibling, 'mouseout').subscribe(e=> {
			setTimeout(() => {
				DOM.removeClass(this._el.nativeElement.previousElementSibling, 'isVisible');
				
			}, 700)
			
		});
		 
	}
}