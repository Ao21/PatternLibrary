import {isPresent, isString, isNumber} from 'angular2/src/facade/lang';

export class CustomValidators{

	static inputEqualsValue(c): { [key: string]: boolean } {
		if(c.value!== c.default) {
			return {"invalidChoice": true}
		} else{
			return null;
		}
	}

	
}