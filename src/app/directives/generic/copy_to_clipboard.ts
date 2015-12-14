import {Directive} from 'angular2/core';


@Directive({
	selector: '[copy-to-clipboard]',
	inputs: ['datatocopy'],
	host: {
		"(click)": 'copy()'
	}
})

export class CopyToClipboard {
	datatocopy: string;
	constructor(

	) {

	}
	copy() {
		var textArea: any = document.createElement("textarea");
		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;
		textArea.style.width = '2em';
		textArea.style.height = '2em';
		textArea.style.padding = 0;
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';
		textArea.style.visiblity = 'hidden';
		textArea.style.background = 'transparent';
		textArea.value = this.datatocopy;
		document.body.appendChild(textArea);
		textArea.select();
		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Copying text command was ' + msg);
		} catch (err) {
			console.log('Oops, unable to copy');
		}

		document.body.removeChild(textArea);
	}

}