import {PatternService} from './pattern_service.ts';
import {AssetsService} from './assets_service';
export * from './pattern_service.ts';
export * from './assets_service';

export var APP_SERVICES: Array<any> = [
	PatternService,
	AssetsService
]