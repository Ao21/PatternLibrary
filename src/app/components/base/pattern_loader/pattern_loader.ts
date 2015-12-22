import { Component, View, Renderer, OnInit, Injector, ElementRef, ViewEncapsulation } from 'angular2/core';
import { Http } from 'angular2/http';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import { PlaceHolder } from '../placeholder_component/placeholder_component';
import { PatternService, AssetsService } from './../../../services/services_modules';

let template = require('./pattern_loader.html');
let styles = require('./pattern_loader.css');
@Component({
	selector: 'pattern-loader',
	inputs: ['loader']
})
@View({
	template: template,
	encapsulation: ViewEncapsulation.None,
	styles: [styles]
})
export class PatternLoader implements OnInit {
    loader: any;
    shadow: any;
	constructor(
		public assetsService: AssetsService,
		public patternService: PatternService,
		public el: ElementRef,
		public renderer: Renderer,
		public http: Http
	) {

	}

    ngOnInit() {		
        
        let pattern = this.patternService._patternsDict[this.loader];
        
        
        var element = DOM.createElement('div');
        DOM.addClass(element, 'pattern');
        DOM.addClass(element, pattern.ref);

        DOM.replaceChild(this.el.nativeElement, element, DOM.querySelector(this.el.nativeElement, '.pattern'));

        var shadow = DOM.createShadowRoot(DOM.querySelector(this.el.nativeElement, '.pattern'));
		let template = document.createElement(pattern.dom);

        let styles = DOM.createStyleElement(pattern.file);
        template.innerHTML = pattern.data[0].markup.example;
        shadow.innerHTML = pattern.data[0].markup.example;;
        
		this.assetsService.generateAssets().then(assets=> {
			_.forEach(pattern.data[0].assets, (e) => {
				let style = DOM.createStyleElement(assets[e].data);
				shadow.appendChild(style);
			})
			shadow.appendChild(styles);
            //shadow.innerHTML = pattern.data[0].markup.example;;

        })
        
	}

	createComponent(res) {
		//console.log(PlaceHolder);


	}
}
