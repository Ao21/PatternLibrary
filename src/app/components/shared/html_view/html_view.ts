import { Component, View, ElementRef, OnInit } from 'angular2/core';
import {isPresent} from 'angular2/src/facade/lang';
import { Tab, TabsGroup } from './../../base/tab/tab_modules';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';
import {PatternService} from './../../../services/pattern_service';
import {Highlight} from './../../../pipes/highlight';
let template = require('./html_view.html');
let styles = require('./html_view.css');

/*
	<html-view [data]="patternREf"></html-view>
*/
@Component({
    selector: 'html-view',
    inputs: ['data'],
    providers: []
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
        this.tabs = [];
        var dataSrc = isPresent(this.data.HTMLViewData) ? this.data.HTMLViewData : this.data.ref;
        this.patternService.getPattern(dataSrc).then((pattern: any) => {
            if (pattern.data[0].angular) {
                let angularData = pattern.data[0].angular.escaped.replace(/^[^&]*|[^gt;]*$/g, '').replace(/\t/g, '&nbsp;&nbsp;')
                 this.tabs.push({ name: 'Angular', type: 'html', data: angularData })
            }
            
            if (pattern.data[0].markup) {
                let htmlData = pattern.data[0].markup.escaped.replace(/^[^&]*|[^gt;]*$/g, '').replace(/\t/g, '&nbsp;&nbsp;')           
                this.tabs.push({ name: 'HTML', type: 'html', data: htmlData })
            }
          
           

        })
        //var pattern = this.patternService.patternsDict[this.data.HTMLViewData] ? this.patternService.patternsDict[this.data.HTMLViewData] : this.data;
        //hljs.highlightBlock('.hljs')
    }
}