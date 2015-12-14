import { Component, View, Host, OnInit } from 'angular2/core';
import {
NgFormModel,
Control,
ControlGroup,
NgIf,
NgFor,
NgControlName,
NG_VALIDATORS,
FORM_DIRECTIVES,
NgControl,
Validators,
NgForm
} from 'angular2/common';
let template = require('./form_component.html');
let styles = require('./form_component.scss');

@Component({
  selector: 'form-component',
  inputs: ['controlPath: control' ],
  providers: []
})
@View({
  template: template,
  styles: [styles],
  directives: [FORM_DIRECTIVES]
})
export class FormComponent implements OnInit{
  model: any;
  formDir: NgFormModel;
  control: any;
  controlPath: string;
  constructor (
    @Host() formDir: NgFormModel) {
    this.formDir = formDir
  }
  ngOnInit() {
    this.control = this.formDir.form.controls[this.controlPath];
  }
}