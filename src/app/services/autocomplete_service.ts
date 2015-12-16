import { Inject, Injectable, Component} from 'angular2/core';
import { Http, Headers } from 'angular2/http';

@Injectable()
export class AutoCompleteService {

	url: string = 'http://localhost:8080/api/search';
	_cached: boolean = false;

	constructor(public http: Http) {
		
	}
	
	search(type: string) {
		return this[type].call(this);
	}
	
	patterns() {
		return this.http.get(this.url + '/Patterns');
	}



}
