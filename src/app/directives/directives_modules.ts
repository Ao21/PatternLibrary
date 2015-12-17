import {PLATFORM_DIRECTIVES, provide} from 'angular2/core';

import {SVGInline} from './generic/svg_inline';
export {SVGInline} from './generic/svg_inline';
export {CodeHighlight} from './generic/code_highlight';
export {HoverEdit} from './editing/hover_edit';
export {CopyToClipboard} from './generic/copy_to_clipboard';
import {DragHandle} from './dragging/drag_handle';
import {FlexOrder} from './dragging/flex_order';

import {AnimateInOut} from './animations/animate_in_out';
import {AnimateIn} from './animations/animate_in';
import {AnimateExtendBar} from './animations/bar_extend';

export var DRAGGING_DIRECTIVES: Array<any> = [
	DragHandle,
	FlexOrder
]

export var SHARED_DIRECTIVES: Array<any> = [
	SVGInline
]

export var ANIMATION_DIRECTIVES: Array<any> = [
	provide(PLATFORM_DIRECTIVES, { useValue: AnimateIn, multi: true }),
	provide(PLATFORM_DIRECTIVES, { useValue: AnimateInOut, multi: true }),
	provide(PLATFORM_DIRECTIVES, { useValue: AnimateExtendBar, multi: true }),
]
