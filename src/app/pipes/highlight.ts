import {
isBlank,
isString,
isArray,
StringWrapper,
CONST
} from 'angular2/src/facade/lang';

import * as hljs from 'hljs';
import {Pipe} from 'angular2/core';

@Pipe({
	name: 'highlight'
})
export class Highlight {
    transform(value: any, args: any[] = null): any {
        hljs.registerLanguage('css', require('lib/highlight.js/lib/languages/css.js'));
        hljs.registerLanguage('xml', require('lib/highlight.js/lib/languages/xml.js'));
        hljs.registerLanguage('typescript', require('lib/highlight.js/lib/languages/typescript.js'));
        hljs.registerLanguage('javascript', require('lib/highlight.js/lib/languages/javascript.js'));
        console.log(hljs.listLanguages());
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
