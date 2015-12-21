import {PLATFORM_PIPES, provide} from 'angular2/core';

import {Highlight} from './highlight.ts';
import {OrderBy} from './orderBy.ts';
import {FilterPipe} from './filter.ts'


export var SHARED_PIPES: Array<any> = [
	provide(PLATFORM_PIPES, { useValue: Highlight, multi: true }),
	provide(PLATFORM_PIPES, { useValue: OrderBy, multi: true }),
	provide(PLATFORM_PIPES, { useValue: FilterPipe, multi: true }),
]
