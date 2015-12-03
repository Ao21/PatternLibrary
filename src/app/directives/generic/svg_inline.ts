import {Directive, OnInit, ElementRef, Attribute} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {Http} from 'angular2/http';


@Directive({
	selector: '[svg]',
	inputs: ['src']
})

export class SVGInline {
	constructor(
		private _http: Http,
		private _el: ElementRef,
		@Attribute('src') public src: string
	) {
		this._http.get(this.src).subscribe((res) => {

			var parser = new DOMParser();
			var doc = parser.parseFromString(res.text(), "image/svg+xml");
			DOM.replaceChild(DOM.parentElement(this._el.nativeElement), doc.documentElement, this._el.nativeElement);
		})
	}
}