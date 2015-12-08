import { Inject, Injectable, Component} from 'angular2/angular2';

import { Http, Headers } from 'angular2/http'; 

@Injectable()
export class PatternService {
	
	url: string = 'http://localhost:8080/api/pattern';
	_patterns: any;
	_patternsDict: any = [];

	constructor(public http: Http) {
		this.http.get(this.url).subscribe(
			res => {
				_.forEach(res.json(), (e) => {
					this._patternsDict[e.ref] = e;
				})
				this._patterns = res.json();
			}
		);
	 }
	
	get patterns() {
		
		return this._patterns;
	}
	
	getPatterns() {
		return this.http.get(this.url);
	}
	
	addPatternUrl(url: string) {
		var obj = {
			url: url
		}
		var headers = new Headers();
  		headers.append('Content-Type', 'application/json');
		this.http.post(this.url + '/url',JSON.stringify(obj),{ headers: headers}).subscribe(
			res => {
				if (res.status === 200) {
					console.log(res.json());
				} else {
					console.log(res);
				}
				
				
			},
			err => {
				console.log(err);
			}
		)
	}
	
	checkPattern() {
		this.http.get(this.url).subscribe(
			res=> {
				console.log(res);	
			}
		);
	}
}
