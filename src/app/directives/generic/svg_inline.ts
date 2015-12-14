import {Directive, OnInit, ElementRef, Attribute, Renderer} from 'angular2/core';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {Http} from 'angular2/http';


@Directive({
	selector: '[svg]',
	inputs: ['src']
})

export class SVGInline {
	constructor(
		private _http: Http,
		private _el: ElementRef,
		private _renderer: Renderer,
		@Attribute('src') public src: string
	) {
		this._http.get(this.src).subscribe((res) => {

			var parser = new DOMParser();
			var doc = parser.parseFromString(res.text(), "image/svg+xml");		
			this._el.nativeElement.parentElement.replaceChild(doc.documentElement, this._el.nativeElement)
		})
	}
}