/// <reference path="../typings/_custom.d.ts" />

require('../styles/app.scss');

/*
 * Providers provided by Angular
 */
import {bootstrap } from 'angular2/bootstrap';
import {ELEMENT_PROBE_PROVIDERS, setRootDomAdapter} from 'angular2/platform/common_dom';
import {BROWSER_PROVIDERS} from 'angular2/platform/browser';
import {PLATFORM_DIRECTIVES, provide} from 'angular2/core';
import {FORM_PROVIDERS, NG_VALIDATORS, Validators } from 'angular2/common';

import {ROUTER_PROVIDERS, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';

import {SVGInline, CodeHighlight, CopyToClipboard} from './directives/directives_modules';
import {APP_STORES} from './stores/stores_modules.ts'
import {APP_SERVICES} from './services/services_modules';
import {COMMON_PROVIDERS} from './common/common_modules.ts'


/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app';


export function main() {
  return bootstrap(App, [
  // These are dependencies of our App
    FORM_PROVIDERS,
    ROUTER_PROVIDERS,
    BROWSER_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    HTTP_PROVIDERS,
    ELEMENT_PROBE_PROVIDERS,
    APP_SERVICES,
    COMMON_PROVIDERS,
    APP_STORES,
    provide(PLATFORM_DIRECTIVES, { useValue: SVGInline, multi: true }),
    provide(PLATFORM_DIRECTIVES, { useValue: CodeHighlight, multi: true }),
    
  ])
    .catch(err => console.error(err));
}

document.addEventListener('DOMContentLoaded', main);

