/*
 * Our custom types
 */
/// <reference path="browser.d.ts" />
/// <reference path="webpack.d.ts" />

declare module hljs {
	function highlightBlock(block: any): void;
	function highlightAuto(block: any, lanuages:any): void;
	function fixMarkup(block: any): void;
	function configure(options: any): void;
}

declare var Scribe: any;

declare var Segment: any;
declare var ease: any;
declare var Colors: any;


interface IBaobab {
	(object:any): void;
	(object:any, options:any): void;
	get():any;
	select(string) :any;
	set():any;
	unset():any;
	on():any;
	monkey:any;
	
}

interface IQuill {
	(object: any): void;
}

declare var Quill: IQuill; 

declare var Baobab: IBaobab;

declare module "Baobab" {
	export = Baobab;
}