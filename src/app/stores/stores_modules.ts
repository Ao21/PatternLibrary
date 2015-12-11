export * from './uiStore';
export * from './section_store';
export * from './component_store';

import {UIStore} from './uiStore';
import {SectionStore} from './section_store';
import {ComponentStore} from './component_store';


export var APP_STORES: Array<any> = [
	UIStore,
	SectionStore,
	ComponentStore
]