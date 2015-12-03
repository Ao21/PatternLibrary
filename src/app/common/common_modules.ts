export * from './dispatcher';
export * from './store';

import {Dispatcher} from './dispatcher';
import {Store} from './store';

export var COMMON_PROVIDERS: Array<any> = [
	Dispatcher
]