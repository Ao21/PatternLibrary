/// <reference path="../typings/_custom.d.ts" />

require('../styles/app.scss');

/*
 * Providers provided by Angular
 */
import {bootstrap, FORM_PROVIDERS, ELEMENT_PROBE_PROVIDERS, provide, PLATFORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {SVGInline, CodeHighlight, ScribeEdit,CopyToClipboard} from './directives/directives_modules';
import {APP_STORES} from './stores/stores_modules.ts'
import {COMMON_PROVIDERS} from './common/common_modules.ts'

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app';

/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
bootstrap(App, [
// These are dependencies of our App
  FORM_PROVIDERS,
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS,
  COMMON_PROVIDERS,
  APP_STORES,
  provide(PLATFORM_DIRECTIVES, { useValue: SVGInline, multi: true }),
  provide(PLATFORM_DIRECTIVES, { useValue: CodeHighlight, multi: true }),
  provide(PLATFORM_DIRECTIVES, { useValue: ScribeEdit, multi: true }),
  provide(PLATFORM_DIRECTIVES, { useValue: CopyToClipboard, multi: true })
]);
