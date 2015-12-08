import { Inject, Injectable, Component} from 'angular2/angular2';

import { Http, Headers } from 'angular2/http'; 

@Injectable()
export class AssetsService {
	
	url: string = 'http://localhost:8080/api/assets';
	_assetsDict: any = [];

	constructor(public http: Http) {
		this.generateAssets();	
	}
	
	generateAssets() {
		console.log(this._assetsDict);
		if (!this._assetsDict || this._assetsDict.length === 0) {
			this.http.get(this.url).subscribe(
				res => {
					console.log(res);
				_.forEach(res.json(), (e) => {				
					this._assetsDict[e.name] = e;
				})
				
			}
		);
		}
		
	}
	 	
	get assets() {		
		return this._assetsDict;
	}
	
	getAsset(asset) {
		this.generateAssets();
		return this._assetsDict[asset];
	}

	
	
}
