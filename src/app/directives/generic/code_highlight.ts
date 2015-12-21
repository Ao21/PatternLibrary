import {Directive, ElementRef, OnInit, OnChanges} from 'angular2/core';


@Directive({
	selector: '[code-highlight]'
})

export class CodeHighlight implements OnInit {
	constructor(
		private _el: ElementRef
	) {
		
	}
	
	ngOnChanges() {
		//console.log('hi');
	}
	ngOnInit() {
		//console.log(this._el.nativeElement.innerHTML)
		//hljs.highlightBlock(this._el.nativeElement);
	}
}