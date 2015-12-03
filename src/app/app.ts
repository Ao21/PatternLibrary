import {Directive, View, ElementRef} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';
import {Component, ViewQuery} from 'angular2/angular2';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {SHARED_COMPONENTS } from './components/shared/shared_modules';
import {SHARED_DIRECTIVES} from './directives/directives_modules';

import {Section, Dashboard} from './components/patterns/patterns_modules';
import {Dispatcher} from './common/dispatcher';

let styles = require('./app.scss');
let template = require('./app.html');

@Component({
  selector: 'app', // <app></app>
  bindings: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, Dispatcher ], 
})
@RouteConfig([
  { path: '/', component: Dashboard, as: 'Section' }    
])
  @View({
   styles: [styles],  
    template:template,
  directives: [SHARED_COMPONENTS, ROUTER_DIRECTIVES]  
})  
  
export class App {
  title: string;
  constructor(public http: Http, public dispatcher: Dispatcher) {
    this.title = 'Angular 2';
  }
}
