import { Component, View, ElementRef } from 'angular2/core';
import {UIStore} from './../../../stores/stores_modules.ts'
let template = require('./drop_zone.html');
let styles = require('./drop_zone.scss');

@Component({
	selector: 'drop-zone',
	host: {
		"[class.isVisible]": 'isDragzonesVisible'
	}
})
@View({
	template: template,
	styles: [styles],
})
export class DropZone {
	isDragzonesVisible: boolean = false;
	constructor(
		public _el: ElementRef,
		public _uiStore: UIStore
	) {
		this._uiStore.subscribe('dropzones', (state: UIStore) => {
			this.isDragzonesVisible = state.select('visibility', 'dropzones').get();
		})

		interact(this._el.nativeElement)
			.dropzone({
				ondragenter: function(event) {
					console.log('enter');
					var draggableElement = event.relatedTarget,
						dropzoneElement = event.target;
				
					// feedback the possibility of a drop
					dropzoneElement.classList.add('drop-target');
					draggableElement.classList.add('can-drop');
				},
				ondragleave: function(event) {
					console.log('leave')
					// remove the drop feedback style
					event.target.classList.remove('drop-target');
					event.relatedTarget.classList.remove('can-drop');
					event.relatedTarget.textContent = 'Dragged out';
				},
			})
	}
}