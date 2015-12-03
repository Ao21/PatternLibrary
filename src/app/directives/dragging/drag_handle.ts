import {Directive, ElementRef} from 'angular2/angular2';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import * as Rx from '@reactivex/rxjs';
import {UIStore} from './../../stores/stores_modules.ts'


@Directive({
	selector: '[drag-handle]',
	host: {
		"(mousedown)": "toggleDropzones($event,true)"
	}
})

export class DragHandle {
	private _dragInteraction: any;
	constructor(
		private _uiStore: UIStore,
		private _el: ElementRef
	) {
		var element = DOM.createElement('div');
		DOM.addClass(element, 'drag-handle');
		DOM.appendChild(this._el.nativeElement, element);



		function finishDrag(event) {
			//DOM.removeClass(this._el.nativeElement,'hideChildContent')
		}

		this._dragInteraction = interact(element)
			.draggable({
				inertia: false,
				onmove: this.dragMoveListener,
				onend: (event) => {
					DOM.removeClass(this._el.nativeElement, 'hideChildContent');
					DOM.removeStyle(this._el.nativeElement, 'transform');
					this._el.nativeElement.setAttribute('data-x', 0);
					this._el.nativeElement.setAttribute('data-y', 0);
				}
			});

	}

	dragMoveListener = (event) => {
		var interaction = event.interaction;
		var target = this._el.nativeElement,
			// keep the dragged position in the data-x/data-y attributes
			x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
			y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
		// translate the element
		target.style.webkitTransform =
		target.style.transform =
		'translate3d(' + x + 'px, ' + y + 'px, 0px)';
		
		// update the posiion attributes
		target.setAttribute('data-x', x);
		target.setAttribute('data-y', y);


	}
	
	endMovement() {
		DOM.removeClass(this._el.nativeElement, 'hideChildContent')
		//DOM.removeStyle(this._el.nativeElement, 'transform');
	}

	toggleDropzones($event, toggle) {
		if ($event.target.classList[0]==='drag-handle' && toggle) {
			DOM.addClass(this._el.nativeElement,'hideChildContent')
		}
		
		//this._uiStore.setVisibility('dropzones', toggle);
	}
}