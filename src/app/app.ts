import {Directive, View, ElementRef} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {Component, ViewQuery} from 'angular2/angular2';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {BASE_COMPONENTS } from './components/base/base_modules';
import {SHARED_COMPONENTS } from './components/shared/shared_modules';
import {SHARED_DIRECTIVES} from './directives/directives_modules';

import {Section, Dashboard, ImportPage, AddPage, PatternPage} from './components/patterns/patterns_modules';
import {Dispatcher} from './common/dispatcher';

import {AssetsService} from './services/services_modules.ts';

let styles = require('./app.scss');
let template = require('./app.html');

@Component({
  selector: 'app', // <app></app>
  bindings: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, Dispatcher ], 
})
@RouteConfig([
    { path: '/', component: Section, as: 'Section' },
    { path: '/import', component: ImportPage, as: 'Import' },
    { path: '/add', component: AddPage, as: 'Add' },
    { path: '/pattern/:pattern', component: PatternPage, as: 'Pattern' }      
])  
  @View({
   styles: [styles],  
    template:template,
  directives: [BASE_COMPONENTS, SHARED_COMPONENTS, ROUTER_DIRECTIVES]  
})  
  
export class App {
  title: string;
  constructor(
    public http: Http,
    public assetsService:AssetsService,
    public dispatcher: Dispatcher) {
    this.title = 'Angular 2';
  }
}
