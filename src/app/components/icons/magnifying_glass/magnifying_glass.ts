import { Component, View, ElementRef, OnInit } from 'angular2/core';
let template = require('./magnifying_glass.html');
let styles = require('./magnifying_glass.scss');

@Component({
	selector: 'mag-glass'
})
@View({
	template: template,
	styles: [styles],
})	    
export class MagGlass implements OnInit {
	triggered: boolean = false;
	
	constructor(
		private _el: ElementRef
	) {

		var pathA = document.getElementById('pathC')


		var segmentA = new Segment(pathA,0, "100%")

		
		
		
		function inAC(s) {
				s.draw("100%", "30%", 0.7, { 
				delay: 0,
				callback: function() {
					inAC2(s)
					console.log('1 done')
				}
					
			})
		}
		
		function inAC2(s) {
				s.draw("100%", "20%", 0.7, { 
				delay: 0,
				callback: function() {
					inAC3(s)
					console.log('2 done')
				}
			})
		}
		function inAC3(s) {
				s.draw("60%", "30%", 0.3, { 
				delay: 0,
				callback: function() {
					console.log('3 done')
					//inAC3(s)
				}
			})
		}
		
		
		function outAC(s) { s.draw('100% - 500', '20%', 0.7, { easing: ease.elasticIn(1, 0.3) }) }

		
		var trigger = document.getElementById('menu-icon-trigger2'),
    	toCloseIcon = true;

		trigger.onclick = function() {
			if (this.triggered === true) {
				inAC(segmentA);
			} else {
				inAC(segmentA);
			}
			this.triggered = !this.triggered;
	
	
			
		};

	}
	
	ngOnInit() {}

}