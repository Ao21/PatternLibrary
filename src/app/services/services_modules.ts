import {PatternService} from './pattern_service.ts';
import {AssetsService} from './assets_service';
import {SectionService} from './section_service';
import {ComponentService} from './component_service';

export * from './pattern_service.ts';
export * from './assets_service';
export * from './section_service';
export * from './component_service';

export var APP_SERVICES: Array<any> = [
	PatternService,
	AssetsService,
	SectionService,
	ComponentService
]