import {Directive, ElementRef} from 'angular2/angular2';


@Directive({
	selector: '[code-highlight]'
})

export class CodeHighlight {
	constructor(
		private _el: ElementRef
	) {
		hljs.highlightBlock(this._el.nativeElement);
	}
}