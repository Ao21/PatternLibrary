import { Inject,Optional, Injectable, Component} from 'angular2/core';
import {PromiseWrapper, Promise, PromiseCompleter} from 'angular2/src/facade/async';
import { Http, Headers } from 'angular2/http';
import {SectionStore} from './../stores/stores_modules';

export interface Section{
	name: string;
	url?: string;
}

@Injectable()
export class SectionService {

	url: string = 'http://localhost:8080/api/section';
	

	constructor(
		public http: Http
	) {
		
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
	
	update(id: string, section: Section) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let obj = {
			query: {
				'_id':id
			},
			update: section
		}
		return this.http.post(`${this.url}/${id}`, JSON.stringify(obj), { headers: headers });
		
	}
	
	addPattern(pattern) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post(`${this.url}/addPattern`, JSON.stringify(pattern), { headers: headers })
	}
	
	addComponent(section) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post(`${this.url}/addComponent`, JSON.stringify(section), { headers: headers })
	}

}
