import {isPresent, isString, isNumber, CONST_EXPR} from 'angular2/src/facade/lang';
import {Attribute, Directive, Provider, provide, Input} from 'angular2/core';
import {Validator, Control, Validators, NG_VALIDATORS} from 'angular2/common';


export function inputEqualsValue(c): { [key: string]: boolean } {
    if (c.value !== c.default) {
		return { "invalidChoice": true }
	} else {
		return null;
	}
}

const inputEqualsValidatorBinding =
    CONST_EXPR(new Provider(NG_VALIDATORS, { useValue: inputEqualsValue, multi: true }));


// @Directive({ selector: '[input-equals]', providers: [inputEqualsValidatorBinding] })
// export class InputEqualsValidator {
// }
