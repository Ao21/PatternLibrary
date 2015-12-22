import { Inject, Injectable, Component} from 'angular2/core';
import { Http, Headers } from 'angular2/http';

@Injectable()
export class AssetsService {

	url: string = 'http://localhost:3000/api/assets';
	_assetsDict: any = [];
	_cached: boolean = false;

	constructor(public http: Http) {
		
	}

	generateAssets() {
		return new Promise((resolve, rej) => {
			if (this._cached===true) {
				resolve(this._assetsDict)
			} else {
				this.http.get(this.url).subscribe(
					res => {
						_.forEach(res.json(), (e) => {
							this._assetsDict[e.name] = e;
						})
						this._cached = true;
						resolve(this._assetsDict);
					})
			}
		})

	}

	get assets() {
		return this._assetsDict;
	}

	getAsset(asset) {
		return new Promise((resolve, rej) => {
			if (this._cached===true) {
				resolve(this._assetsDict[asset])
			} else {
				this.http.get(this.url).subscribe(
					res => {
						_.forEach(res.json(), (e) => {
							this._assetsDict[e.name] = e;
						})
						resolve(this._assetsDict[asset]);
					})
			}
		})

	}



}
