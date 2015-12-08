export * from './uiStore';
export * from './section_store';

import {UIStore} from './uiStore';
import {SectionStore} from './section_store';


export var APP_STORES: Array<any> = [
	UIStore,
	SectionStore
]