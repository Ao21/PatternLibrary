import {Directive, Attribute, ElementRef, Renderer} from 'angular2/core';
@Directive({
	selector: '[flex-order]',
	inputs: ['order']
	
})
export class FlexOrder {
	constructor(
		@Attribute('order') flexOrder: string,
		private _el: ElementRef,
		private _renderer: Renderer
	) {
		this._renderer.setElementStyle(_el, 'order', flexOrder);
	}
}