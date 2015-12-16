import {
isBlank,
isString,
isArray,
StringWrapper,
CONST
} from 'angular2/src/facade/lang';

import {Pipe} from 'angular2/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe {
	transform(value: any, args: any[] = null): any {
		
		let key: any = Object.keys(args[0]);

		if(isBlank(args) || args.length === 0) {
			return console.log('filter pipe requires one argument');
		}
		
		if (args[0][key] === '*') {
			return value;
		}
		
		if (args[0][key].charAt(0) === '!') {
			return _.filter(value, (obj) => {
				let key: any = Object.keys(args[0]);
				return regex.test(obj[key].slice(1));
			})
		}
		
		var regex = new RegExp(args[0][key], 'i');
		
		return _.filter(value, (obj) => {
			let key: any = Object.keys(args[0]);
			return regex.test(obj[key]);
		})
		
	
	}
}
