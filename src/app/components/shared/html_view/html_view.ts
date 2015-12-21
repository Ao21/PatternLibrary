import { Component, View, ElementRef, OnInit } from 'angular2/core';
import {isPresent} from 'angular2/src/facade/lang';
import { Tab, TabsGroup } from '../../base/base_modules';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {PatternService} from './../../../services/pattern_service.ts';
import {Highlight} from './../../../pipes/highlight.ts';
let template = require('./html_view.html');
let styles = require('./html_view.scss');

/*
	<html-view [data]="patternREf"></html-view>
*/
@Component({
    selector: 'html-view',
    inputs: ['data']
})
@View({
    template: template,
    styles: [styles],
    directives: [Tab, TabsGroup],
    pipes: [Highlight]
})
export class HTMLView implements OnInit {
    data: any;
    tabs: any[] = [];

    constructor(
        private _el: ElementRef,
        private patternService: PatternService
    ) { 
       
    }
    
    ngOnInit() {
        if (this.data) {
            this.init();
        }
        
    }
    clickToCopy() {
        //console.log(DOM.querySelector(this._el.nativeElement,'.content .selected code').innerText);
    }

    init() {

        var dataSrc = isPresent(this.data.HTMLViewData) ? this.data.HTMLViewData : this.data.ref;
        this.patternService.getPattern(dataSrc).then((pattern: any) => {
            let angularData = pattern.data[0].angular.escaped.replace(/^[^&]*|[^gt;]*$/g, '').replace(/\t/g, '&nbsp;&nbsp;')
            let htmlData = pattern.data[0].markup.escaped.replace(/^[^&]*|[^gt;]*$/g, '').replace(/\t/g, '&nbsp;&nbsp;')
            this.tabs.push({ name: 'Angular', type: 'html', data: angularData })
            this.tabs.push({ name: 'HTML', type: 'html', data: htmlData })

        })
        //var pattern = this.patternService.patternsDict[this.data.HTMLViewData] ? this.patternService.patternsDict[this.data.HTMLViewData] : this.data;
        //hljs.highlightBlock('.hljs')
    }
}