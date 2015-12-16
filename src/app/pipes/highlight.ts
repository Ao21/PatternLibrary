import {
isBlank,
isString,
isArray,
StringWrapper,
CONST
} from 'angular2/src/facade/lang';

import {Pipe} from 'angular2/core';

@Pipe({
	name: 'highlight'
})
export class Highlight {
	transform(value: any, args: any[] = null): any {
		console.log(args);
		hljs.configure({
			tabReplace: '    ',
			useBR: true
		})
		value = this.decodeEntities(value);
		var a: any = hljs.highlightAuto(value, args);
		a = hljs.fixMarkup(a.value);
		return a;

	}

	decodeEntities(s) {
		var str, temp = document.createElement('pre');
		temp.innerHTML = s;
		str = temp.textContent || temp.innerText;
		temp = null;
		return str;
	}
}
