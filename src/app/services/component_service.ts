import { Inject, Injectable, Component} from 'angular2/core';
import {PromiseWrapper, PromiseCompleter} from 'angular2/src/facade/async';
import { Http, Headers } from 'angular2/http';

export interface Component {
	name: string;
	url?: string;
}

@Injectable()
export class ComponentService {

	url: string = 'http://localhost:3000/api/sectionComponent';
	_components: any;
	_componentsDict: any = [];

	constructor(public http: Http) {
		
	}

	create(component: Component) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		this.http.post(this.url, JSON.stringify(component), { headers: headers }).subscribe(
			res => {
				//console.log(res);
			}
		)
	}

	update(id: string, component: Component) {
		var headers = new Headers();
		headers.append('Content-Type', 'application/json');
		let obj = {
			query: {
				'_id': id
			},
			update: component
		}
		return this.http.post(`${this.url}/${id}`, JSON.stringify(obj), { headers: headers });

	}

	get componentsDict() {
		return this._componentsDict;
	}

	getComponent(component) {
		if (this._componentsDict) { }
	}


	get components() {
		return this._components;
	}

	getComponents() {
		let promise = new Promise((res, rej) => {
			this.http.get(this.url).subscribe(
				data => {
					_.forEach(data.json(), (e) => {
						this._componentsDict[e.ref] = e;
					})
					this._components = data.json();
					res(data.json())
				}
			);
		})
		return promise;

	}

}
