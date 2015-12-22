import {
Component,
View,
ViewEncapsulation,
Host,
SkipSelf,
Attribute,
Optional,
OnChanges,
OnInit
} from 'angular2/core';
import {isPresent, StringWrapper, NumberWrapper} from 'angular2/src/facade/lang';
import {ObservableWrapper, EventEmitter} from 'angular2/src/facade/async';
import {Event, KeyboardEvent} from 'angular2/src/facade/browser';
import {RadioDispatcher} from './radio_dispatcher';
import {RadioButton} from './radio_button';

import {KeyCodes} from './../../../common/keycodes';

var _uniqueRadioGroupCounter: number = 0;

let template = require('./radio_group.html');
let styles = require('./radio_group.css');


/*
  <radio-group>
			<radio-button id="radio" name="gender" value="option1" checked></radio-button>
			<radio-button id="radio" name="gender" value="option2"></radio-button>
		</radio-group>
*/

@Component({
  selector: 'radio-group',
  outputs: ['change'],
  inputs: ['disabled', 'value'],
  host: {
    'role': 'radiogroup',
    '[attr.aria-disabled]': 'disabled',
    '[attr.aria-activedescendant]': 'activedescendant',
    // TODO(jelbourn): Remove ^ when event retargeting is fixed.
    '(keydown)': 'onKeydown($event)',
    '[tabindex]': 'tabindex',
  },
  providers: [RadioDispatcher]
})
@View({
  template: template,
  styles: [styles],
  encapsulation: ViewEncapsulation.None
})
export class RadioGroup implements OnChanges {
  value: any;
  name_: string;
  radioDispatcher: RadioDispatcher;
  radios_: RadioButton[];
  activedescendant: any;
  disabled_: boolean;
  selectedRadioId: string;
  change: EventEmitter<any>;
  tabindex: number;

  constructor(
    @Attribute('tabindex') tabindex: string,
    @Attribute('disabled') disabled: string,
    radioDispatcher: RadioDispatcher
  ) {
    this.name_ = `md-radio-group-${_uniqueRadioGroupCounter++}`;
    this.radios_ = [];
    this.change = new EventEmitter();
    this.radioDispatcher = radioDispatcher;
    this.selectedRadioId = '';
    this.disabled_ = false;

    this.disabled = isPresent(disabled);
    this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
  }

  getName(): string {
    return this.name_;
  }

  get disabled() {
    return this.disabled_;
  }

  set disabled(value) {
    this.disabled_ = isPresent(value) && value !== false;
  }

  ngOnChanges(_) {
    // If the component has a disabled attribute with no value, it will set disabled = ''.
    this.disabled = isPresent(this.disabled) && this.disabled !== false;

    // If the value of this radio-group has been set or changed, we have to look through the
    // child radio buttons and select the one that has a corresponding value (if any).
    if (isPresent(this.value) && this.value != '') {
      this.radioDispatcher.notify(this.name_);
      this.radios_.forEach(radio => {
        if (radio.value == this.value) {
          radio.checked = true;
          this.selectedRadioId = radio.id;
          this.activedescendant = radio.id;
        }
      });
    }
  }

  updateValue(value: any, id: string) {
    this.value = value;
    this.selectedRadioId = id;
    this.activedescendant = id;
    ObservableWrapper.callNext(this.change, null);
    this.ngOnChanges(this);
  }
  /** Registers a child radio button with this group. */
  register(radio: RadioButton) {
    this.radios_.push(radio);
  }

  onKeydown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    switch (event.keyCode) {
      case KeyCodes.UP:
        this.stepSelectedRadio(-1);
        event.preventDefault();
        break;
      case KeyCodes.DOWN:
        this.stepSelectedRadio(1);
        event.preventDefault();
        break;
    }
  }

  getSelectedRadioIndex(): number {
    for (let i = 0; i < this.radios_.length; i++) {
      if (this.radios_[i].id == this.selectedRadioId) {
        return i;
      }
    }

    return -1;
  }

  stepSelectedRadio(step) {
    let index = this.getSelectedRadioIndex() + step;
    if (index < 0 || index >= this.radios_.length) {
      return;
    }

    let radio = this.radios_[index];

    // If the next radio is line is disabled, skip it (maintaining direction).
    if (radio.disabled) {
      this.stepSelectedRadio(step + (step < 0 ? -1 : 1));
      return;
    }

    this.radioDispatcher.notify(this.name_);
    radio.checked = true;
    ObservableWrapper.callNext(this.change, null);

    this.value = radio.value;
    this.selectedRadioId = radio.id;
    this.activedescendant = radio.id;
  }



}


