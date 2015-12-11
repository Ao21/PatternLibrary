import { Component, View, Host } from 'angular2/angular2';
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
export class FormComponent {
  model: any;
  formDir: NgFormModel;
  control: any;
  controlPath: string;
  constructor(
    @Host() formDir: NgFormModel) {
    this.formDir = formDir
  }
  onInit() {
    this.control = this.formDir.form.controls[this.controlPath];
    console.log(this.control);
  }
}