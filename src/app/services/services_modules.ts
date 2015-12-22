import {PatternService} from './pattern_service';
import {AssetsService} from './assets_service';
import {SectionService} from './section_service';
import {ComponentService} from './component_service';
import {AutoCompleteService} from './autocomplete_service';

export * from './pattern_service';
export * from './assets_service';
export * from './section_service';
export * from './component_service';
export * from './autocomplete_service';

export var APP_SERVICES: Array<any> = [
	PatternService,
	AssetsService,
	SectionService,
	AutoCompleteService,
	ComponentService
]