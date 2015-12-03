import {SVGInline} from './generic/svg_inline';
export {SVGInline} from './generic/svg_inline';
export {CodeHighlight} from './generic/code_highlight';
export {ScribeEdit} from './generic/scribe';
export {HoverEdit} from './editing/hover_edit';
export {CopyToClipboard} from './generic/copy_to_clipboard';
import {DragHandle} from './dragging/drag_handle';

export var DRAGGING_DIRECTIVES: Array<any> = [
	DragHandle
]

export var SHARED_DIRECTIVES: Array<any> = [
	SVGInline,
	
]