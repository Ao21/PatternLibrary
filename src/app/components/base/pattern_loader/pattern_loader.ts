import { Component, View, Renderer, OnInit, Injector, ElementRef, ViewEncapsulation } from 'angular2/angular2';
import { Http } from 'angular2/http';
import { DOM } from 'angular2/src/core/dom/dom_adapter';
import { PlaceHolder } from '../placeholder_component/placeholder_component';
import { PatternService, AssetsService } from './../../../services/services_modules';


let template = require('./pattern_loader.html');
@Component({
	selector: 'pattern-loader',
	inputs: ['loader']
})
@View({
	template: template,
	encapsulation: ViewEncapsulation.None,
	styles: [':host,pattern-loader{float:left;width:100%}']
})
export class PatternLoader implements OnInit {
	loader: any;
	constructor(
		public assetsService: AssetsService,
		public patternService: PatternService,
		public el: ElementRef,
		public renderer: Renderer,
		public http: Http
	) {
		
		
		
		this.http.get('http://localhost:8080/api/' + 'pattern').subscribe(
			res=> {
				console.log(res.json());
				//var results: any = res.json()[0];
				//console.log(results);

				// var shadow = this.el.nativeElement.createShadowRoot();
				// var template = document.createElement('discount-code');
				// var styles = DOM.createStyleElement(results.baseStyles);
				// var styles3 = DOM.createStyleElement(results.bootstrap);
				// template.innerHTML = results.data.markup.example;
				// shadow.appendChild(styles3);
				// shadow.appendChild(styles);
				// shadow.appendChild(template);


			
			}
		);

	}
	
	onInit() {
		var pattern = this.patternService._patternsDict[this.loader.name];
		var shadow = this.el.nativeElement.createShadowRoot();
		console.log(pattern)
		var template = document.createElement(pattern.dom);
		var styles = DOM.createStyleElement(pattern.file);
		template.innerHTML = pattern.data[0].markup.example;
		_.forEach(pattern.data[0].assets, (e) => {
			var style = DOM.createStyleElement(this.assetsService.getAsset(e).data);
			shadow.appendChild(style);
		})    
		shadow.appendChild(styles);
		shadow.appendChild(template);
	}

	createComponent(res) {
		console.log(PlaceHolder);
	

	}
}
