/// <reference path="../typings/_custom.d.ts" />

require('../styles/app.scss');

/*
 * Providers provided by Angular
 */
import {bootstrap, FORM_PROVIDERS, ELEMENT_PROBE_PROVIDERS, provide, PLATFORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_PROVIDERS,HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {SVGInline, CodeHighlight,CopyToClipboard} from './directives/directives_modules';
import {APP_STORES} from './stores/stores_modules.ts'
import {APP_SERVICES} from './services/services_modules';
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
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  HTTP_PROVIDERS,
  ELEMENT_PROBE_PROVIDERS,
  APP_SERVICES,
  COMMON_PROVIDERS,
  APP_STORES,
  provide(PLATFORM_DIRECTIVES, { useValue: SVGInline, multi: true }),
  provide(PLATFORM_DIRECTIVES, { useValue: CodeHighlight, multi: true }),
  provide(PLATFORM_DIRECTIVES, { useValue: CopyToClipboard, multi: true })
]);
