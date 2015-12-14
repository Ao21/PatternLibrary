import { Inject, Injectable, Component} from 'angular2/core';
import {PromiseWrapper, Promise, PromiseCompleter} from 'angular2/src/facade/async';
import { Http, Headers } from 'angular2/http';

export class Section{
	name: string;
	url: string;
}

@Injectable()
export class SectionService {

	url: string = 'http://localhost:8080/api/section';
	

	constructor(public http: Http) {
		
	}
	
	getAll() {
		return this.http.get(`${this.url}`);
	}
	
	get(sectionUrl: string) {
		return this.http.get(`${this.url}/${sectionUrl}`);
	}
	
	create(section: Section) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.post(this.url, JSON.stringify(section), { headers: headers }).subscribe(
			res => {
				
			}
		)
	}

}
