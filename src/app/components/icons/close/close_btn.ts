import { Component, View, ElementRef, OnInit } from 'angular2/core';
let template = require('./close_btn.html');
let styles = require('./close_btn.scss');

@Component({
	selector: 'close-btn'
})
@View({
	template: template,
	styles: [styles],
})	    
export class CloseBtn implements OnInit {
	triggered: boolean = false;
	
	constructor(
		private _el: ElementRef
	) {

		var pathA = document.getElementById('pathA'),
			pathB = document.getElementById('pathB');

		var segmentA = new Segment(pathA, 0, 40),
		segmentC = new Segment(pathB, 0, 40);
		
		
		
		function inAC(s) { s.draw('80% - 40', '80%', 0.3, {delay: 0.1, callback: function(){ inAC2(s) }}); }
		function inAC2(s) { s.draw('100% - 54.5', '100% - 30.5', 0.3, { easing: ease.elasticOut(1, 0.3) }); }
		
		function outAC(s) { s.draw('90% - 40', '90%', 0.1, {easing: ease.elasticIn(1, 0.3), callback: function(){ outAC2(s) }}); }
		function outAC2(s) { s.draw('20% - 40', '20%', 0.3, {callback: function(){ outAC3(s) }}); }
		function outAC3(s) { s.draw(0, 40, 0.7, {easing: ease.elasticOut(1, 0.3)}); }
		
		
		var trigger = document.getElementById('menu-icon-trigger'),
    	toCloseIcon = true;

		trigger.onclick = function() {
			if (this.triggered === true) {
				inAC(segmentA);
				inAC(segmentC);
			} else {
				outAC(segmentA);
				outAC(segmentC);
			}
			this.triggered = !this.triggered;
	
	
			
		};

	}
	
	ngOnInit() {}

}