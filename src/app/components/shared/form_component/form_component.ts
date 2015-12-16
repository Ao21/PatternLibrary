import { Component, View, Host, OnInit } from 'angular2/core';
import {
NgFormModel,
Control,
ControlGroup,
NgIf,
NgFor,
NgSwitch,
NgSwitchWhen,
NgSwitchDefault,
NgControlName,
NG_VALIDATORS,
FORM_DIRECTIVES,
NgControl,
Validators,
NgForm
} from 'angular2/common';
import {AutoComplete, AutocompleteOption} from './../autocomplete/autocomplete_modules';
let template = require('./form_component.html');
let styles = require('./form_component.scss');

@Component({
  selector: 'form-component',
  inputs: ['controlPath: control','placeholder','type','datasource'],
  providers: []
})
@View({
  template: template,
  styles: [styles],
  directives: [FORM_DIRECTIVES, NgSwitch, NgSwitchDefault, NgSwitchWhen, AutocompleteOption, AutoComplete ]
})
export class FormComponent implements OnInit{
  datasource: any;
  model: any;
  type: any;
  formDir: NgFormModel;
  control: any;
  controlPath: string;
  placeholder: string = "";
  constructor (
    @Host() formDir: NgFormModel) {
    this.formDir = formDir;
  }
  ngOnInit() {
    this.control = this.formDir.form.controls[this.controlPath];
  }
}