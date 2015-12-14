import {Directive, ElementRef, Renderer} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import * as Rx from '@reactivex/rxjs';

/*

	<edit-bar></edit-bar>
	<div class="text" hover-edit>
		<p></p>
	</div>
*/

@Directive({
	selector: '[hover-edit]'
})

export class HoverEdit {
	timeout: any;
	constructor(
		private _el: ElementRef,
		private _renderer: Renderer
	) {
		let element = this._renderer.getNativeElementSync(this._el);

		(<any>Rx).Observable.fromEvent(element, 'mouseover').subscribe(e=> {
			this._renderer.setElementClass(this._el,'hoverIsVisible',true);
				if (this.timeout) {
					clearTimeout(this.timeout);
				}

		});
		
		(<any>Rx).Observable.fromEvent(element, 'mouseout').subscribe(e=> {
			setTimeout(() => {
				this._renderer.setElementClass(this._el,'hoverIsVisible',false);
			}, 700)
			
		});
		 
	}
}