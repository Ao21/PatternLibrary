import {
isBlank,
isString,
isArray,
StringWrapper,
CONST
} from 'angular2/src/facade/lang';

import {Pipe} from 'angular2/core';

@Pipe({
	name: 'orderBy'
})
export class OrderBy {
    
    transform(value: any, args: any[] = null): any {
        
        if(isBlank(args) || args.length === 0) {
			return console.log('filter pipe requires one argument');
        }
        
        if (isBlank(value) || value.length === 0) {
            return console.log('Orderby needs items to filter')
        }
        
        let sortedArray = _.sortBy(value, function(e: any) {
            return e.index;
        })
        
        return value;

	}

}
